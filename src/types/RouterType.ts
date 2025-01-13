import { Paid } from "@/views/pages/Paid";
import { Default } from "../views/layouts/Default";
import { Home } from "../views/pages/Home";
import { Unpaid } from "@/views/pages/Unpaid";
import { Overdue } from "@/views/pages/Overdue";
import { CreateUser } from "@/views/components/Form/CreateUser";
import { ViewProfile } from "@/views/components/Form/ViewProfile";
import { EditUser } from "@/views/components/Form/EditUser";
/**
 * Define the type of the component
 */
export const components = {
  Default,
  Home,
  Paid,
  Unpaid,
  Overdue,
  CreateUser,
  ViewProfile,
  EditUser
} as const;
 
export type ComponentType = (typeof components)[keyof typeof components];

/**
 * Define the type of the route
 */
export type Route = {
  path: string;
  component: ComponentType 
  children?: Route[];
  parentComponent?: ComponentType;
};