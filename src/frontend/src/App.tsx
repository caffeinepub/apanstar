import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Challenges = lazy(() => import("./pages/Challenges"));
const Profile = lazy(() => import("./pages/Profile"));
const AiStyle = lazy(() => import("./pages/AiStyle"));
const Onboarding = lazy(() => import("./pages/Onboarding"));

function PageLoader() {
  return (
    <div className="p-4 space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-24 w-full rounded-2xl" />
      ))}
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-center" richColors />
    </>
  ),
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Onboarding />
    </Suspense>
  ),
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: Home,
});

const exploreRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/explore",
  component: Explore,
});

const challengesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/challenges",
  component: Challenges,
});

const profileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/profile",
  component: Profile,
});

const aiStyleRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/ai-style",
  component: AiStyle,
});

const routeTree = rootRoute.addChildren([
  onboardingRoute,
  layoutRoute.addChildren([
    homeRoute,
    exploreRoute,
    challengesRoute,
    profileRoute,
    aiStyleRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
