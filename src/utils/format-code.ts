export function generateReactCode(name: string, svgUrl: string): string {
  const componentName = toPascalCase(name);
  return `import ${componentName} from '${svgUrl}';

export function ${componentName}Logo() {
  return <img src={${componentName}} alt="${name} logo" />;
}`;
}

export function generateVueCode(name: string, svgUrl: string): string {
  return `<template>
  <img :src="${toCamelCase(name)}" alt="${name} logo" />
</template>

<script setup>
import ${toCamelCase(name)} from '${svgUrl}';
</script>`;
}

export function generateHtmlCode(name: string, svgUrl: string): string {
  return `<img src="${svgUrl}" alt="${name} logo" width="48" height="48" />`;
}

export function generateSvelteCode(name: string, svgUrl: string): string {
  return `<script>
  import ${toCamelCase(name)} from '${svgUrl}';
</script>

<img src={${toCamelCase(name)}} alt="${name} logo" />`;
}

export function generateSvgImport(svgUrl: string): string {
  return svgUrl;
}

function toPascalCase(str: string): string {
  return str
    .split(/[\s\-_&]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
