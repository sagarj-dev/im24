import { FC, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, NotFoundPage } from "../pages";
import { ClipLoader } from "react-spinners";
import { Layout } from "../components";

const Homepage = lazy(() =>
  import("../pages").then((module) => module.Homepage)
);

const ProductDetailPage = lazy(() =>
  import("../pages").then((module) => module.ProductDetailPage)
);

const routes = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />,
  },
];

const finalRouts = routes.map((route) => {
  return {
    ...route,
    element: (
      <Suspense fallback={<ClipLoader color="blue" />}>
        <Layout>{route.element}</Layout>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  };
});

const router = createBrowserRouter([
  ...finalRouts,
  {
    path: "*",
    element: (
      <Suspense fallback={<ClipLoader color="blue" />}>
        <NotFoundPage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
]);

export const AppRouter: FC = () => <RouterProvider router={router} />;
