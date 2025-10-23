import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DefaultLayout } from '@/app/layout';
import { Error } from '@/components';
import { ROUTES } from '@/constants';
import { Tasks } from '@/feature/task';

export const AppRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <DefaultLayout />,
      children: [{ path: ROUTES.BOARD + ':id', element: <Tasks /> }],
      errorElement: <Error description="Something went wrong" />,
    },
  ]);

  return <RouterProvider router={router} />;
};
