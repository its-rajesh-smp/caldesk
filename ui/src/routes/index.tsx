import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth-routes";
import { publicRoutes } from "./public-routes";

export const router = createBrowserRouter([...publicRoutes, ...authRoutes]);
