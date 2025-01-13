import { getPageParam } from '@/helpers/getParams';
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
        const params = this.extractParams(urlPath, path);
        const paramValue = params.id || getPageParam();
        const componentInstance = new component(paramValue);
        const childComponent = await componentInstance.render();

        if (parentComponent) {
          const parentInstance = new parentComponent(paramValue);
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
    const urlSegments = url.split('/');
    const pathSegments = path.split('/');

    if (urlSegments.length !== pathSegments.length) return false;

    return pathSegments.every((segment, i) => {
      if (segment.startsWith(':')) return true;
      return segment === urlSegments[i];
    });
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

  private extractParams(url: string, path: string): Record<string, string> {
    const urlSegments = url.split('/');
    const pathSegments = path.split('/');
    const params: Record<string, string> = {};

    pathSegments.forEach((segment, i) => {
      if (segment.startsWith(':')) {
        const paramName = segment.slice(1);
        params[paramName] = urlSegments[i];
      }
    });

    return params;
  }
}
