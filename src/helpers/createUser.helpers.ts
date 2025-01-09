import { Router } from "@/routers/Router"

export const createUserEvent = (button: HTMLElement) => {
  button.addEventListener("click", () => {
    Router.pushState("/create-user")
  })
}