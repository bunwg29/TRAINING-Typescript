import { Default } from "../views/layouts/Default";

/**
 * Define the type of the component
 */
const components = {
  Default,
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
      // createRoute("/", components.Test),
      // createRoute("/paid", components.Test2),
    ],
  },
];