import { useState, useEffect, useCallback } from 'react';

interface RouterState {
  route: string;
  params: Record<string, string>;
  navigate: (path: string) => void;
}

function parsePath(): { route: string; params: Record<string, string> } {
  const pathname = window.location.pathname;
  const parts = pathname.split('/').filter(Boolean);

  if (parts[0] === 'apps' && parts[1]) {
    return { route: 'app-detail', params: { bankId: parts[1] } };
  }
  if (parts[0] === 'apps') {
    return { route: 'apps', params: {} };
  }
  return { route: 'logos', params: {} };
}

export function useRouter(): RouterState {
  const [state, setState] = useState(parsePath);

  useEffect(() => {
    const onPopState = () => setState(parsePath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState(null, '', path);
    setState(parsePath());
  }, []);

  return { ...state, navigate };
}
