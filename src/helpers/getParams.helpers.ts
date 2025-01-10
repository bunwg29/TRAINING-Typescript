/**
 * 
 * @returns {params} - Return a pages params on url to define current page
 */
export const getPageParam = (): string => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params.get('pages') || '1'; 
};

export const  getIdFromUrl = (url: string): string => {
  const regex = /\/(\d+)(\/|$)/; 
  const match = url.match(regex);
  return match ? match[1] : '1'; 
}