/**
 * 
 * @returns {params} - Return a pages params on url to define current page
 */
export const getPageParam = (): string => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params.get('pages') || '1'; 
};
