import { Default } from "../views/layouts/Default";
import { Home } from "../views/pages/Home";
/**
 * Define the type of the component
 */
const components = {
  Default,
  Home
} as const;
 
type ComponentType = (typeof components)[keyof typeof components];

/**
 * Define the type of the route
 */
export type Route = {
  path: string;
  component: ComponentType 
  children?: Route[];
  parentComponent?: ComponentType;
};

/**
 * Create function to create particular route base on Route type
 */
const createRoute = (path: string, component: ComponentType): Route => ({ path, component });

export const routes: Route[] = [
  {
    path: "",
    component: components.Default,
    children: [
      createRoute("/", components.Home),
      // createRoute("/paid", components.Test2),
    ],
  },
];