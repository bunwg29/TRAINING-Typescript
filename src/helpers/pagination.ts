import { paths } from '@/constant/mainPath';
import { Router } from '@/routers/Router';
/**
 * This file will check path of basic route and get pages params to handle click at @/view/components/Pagination/Pagination.ts
 */

const isCorrectPath = (path: string): boolean => paths.includes(path);

const getParams = (): number => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return parseInt(params.get('pages') || '1', 10);
};

export const BtnPagination = (button: HTMLElement, totalPages: number) => {
  button.addEventListener('click', () => {
    const url = new URL(window.location.href);
    const pathUrl = url.pathname;
    if (!isCorrectPath(pathUrl)) {
      return;
    }
    let currentPage = getParams();
    if (button.classList.contains('prev-page')) {
      if (currentPage > 1) {
        currentPage -= 1;
      }
    } else if (button.classList.contains('next-page')) {
      if (currentPage < totalPages) {
        currentPage += 1;
      }
    }

    const newUrl = `${pathUrl}?pages=${currentPage}`;
    Router.pushState(newUrl);
  });
};
