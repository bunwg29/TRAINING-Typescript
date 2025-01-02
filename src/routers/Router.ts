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
    this.pushState(window.location.pathname);
    this.clickPushState();
  }

  /**
   *
   * @param pathUrl - URL path to push to pushState to handle not reload page
   */
  public pushState(pathUrl: string) {
    window.history.pushState(null, '', pathUrl);
    window.dispatchEvent(new CustomEvent('urlChanged'));
  }

  /**
   * Define the route match content
   */
  private routeMatchContent() {
    const app = document.getElementById('app');

    const { childComponent } = this.getRoutes();
    app?.replaceChildren(childComponent as HTMLElement);
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

  /**
   *
   * @returns particular components class - Return the component that match the URL path
   */
  private getRoutes() {
    const urlPath = window.location.pathname;
    for (const route of this.flatRoutes()) {
      const { component, parentComponent } = route;
      if (route.path === urlPath) {
        const childComponent = new component().render();
        if (parentComponent) {
          return {
            childComponent: new parentComponent().render(childComponent as HTMLElement),
          };
        }
        return { childComponent };
      }
    }
    return { childComponent: null };
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
        if (href) this.pushState(href);
      }
    });
  }
}
