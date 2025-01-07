import { getPageParam } from '@/helpers/getPageParam.helpers';
import { routes, Route } from './routes';
// This class will handle SPA router logic
export class Router {
  /**
   * Constructor
   */
  constructor() {
    window.addEventListener('popstate', () =>
      window.dispatchEvent(new CustomEvent('urlChanged')),
    );
    window.addEventListener('urlChanged', () => this.routeMatchContent());
    Router.pushState(window.location.pathname);
    this.clickPushState();
  }

  /**
   *
   * @param pathUrl - URL path to push to pushState to handle not reload page
   */
  public static pushState(pathUrl: string) {
    window.history.pushState(null, '', pathUrl);
    window.dispatchEvent(new CustomEvent('urlChanged'));
  }
  

  /**
   * Define the route match content
   */
  private async routeMatchContent() {
    const app = document.getElementById('app');

    const { childComponent } = await this.getRoutes();
    if (childComponent) {
      app?.replaceChildren(childComponent);
    }
  }

  /**
   *
   * @returns particular components class - Return the component that match the URL path
   */
  private async getRoutes() {
    const urlPath = window.location.pathname;
  
    for (const route of this.flatRoutes()) {
      const { path, component, parentComponent } = route;
  
      if (this.correctPath(urlPath, path)) {
        const pageParam = getPageParam();
        const componentInstance = new component(pageParam);
        const childComponent = await componentInstance.render();
  
        if (parentComponent) {
          const parentInstance = new parentComponent();
          return {
            childComponent: await parentInstance.render(childComponent),
            path,
          };
        }
        return { childComponent, path };
      }
    }
    return { childComponent: null, path: null };
  }
  
  /**
   *
   * @returns Route[] - Return the flat routes that defined in the routes.ts
   */
  private flatRoutes(): Route[] {
    return routes.flatMap(route =>
      route.children
        ? route.children.map(child => ({
            ...child,
            parentComponent: route.component,
          }))
        : [route],
    );
  }

  private correctPath(url: string, path: string): boolean {
    const urlPath = url.split('?')[0];
    return urlPath === path;
  }

  /**
   * Handle the click event on the anchor tag
   */
  private clickPushState() {
    document.body.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')) {
        event.preventDefault();
        const href = target.getAttribute('href');
        if (href) Router.pushState(href);
      }
    });
  }
}
