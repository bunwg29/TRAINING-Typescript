// icons.ts
const icons = Object.entries(
  import.meta.glob('/src/assets/icons/*.svg', { eager: true }),
).reduce((acc: { [key: string]: string }, [path, module]) => {
  const name = path
    .split('/')
    .pop()
    ?.replace('.svg', '')
    .replace(/[-_\s]/g, '_');
  if (
    name &&
    typeof module === 'object' &&
    module !== null &&
    'default' in module
  ) {
    acc[name] = (module as { default: string }).default;
  }
  return acc;
}, {});

export default icons;
