import { components, ComponentType, Route } from "@/types/RouterType";

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
      createRoute("/create-user", components.CreateUser),
      createRoute("/view-profile/:id", components.ViewProfile),
      createRoute("/edit-profile/:id", components.EditUser),
    ],
  },
];