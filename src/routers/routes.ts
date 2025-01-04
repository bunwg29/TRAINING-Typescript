import { Paid } from "@/views/pages/Paid";
import { Default } from "../views/layouts/Default";
import { Home } from "../views/pages/Home";
import { Unpaid } from "@/views/pages/Unpaid";
import { Overdue } from "@/views/pages/Overdue";
/**
 * Define the type of the component
 */
const components = {
  Default,
  Home,
  Paid,
  Unpaid,
  Overdue
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
      createRoute("/paid", components.Paid),
      createRoute("/unpaid", components.Unpaid),
      createRoute("/overdue", components.Overdue),
    ],
  },
];