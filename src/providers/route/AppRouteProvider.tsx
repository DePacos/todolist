import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DefaultLayout } from '@/app/layout';
import { ROUTES } from '@/constants';

export const AppRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <DefaultLayout />,
      children: [{ path: ROUTES.BOARD + ':id', element: <p>Tasks</p> }],
    },
  ]);

  return <RouterProvider router={router} />;
};
