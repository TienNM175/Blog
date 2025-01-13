import { createBrowserRouter } from 'react-router-dom';
import { UserList } from '@/apps/users/components/UserList';
import { UserDetails } from '@/apps/users/components/UserDetails';
import { PostDetails } from '@/apps/posts/components/PostDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserList />,
  },
  {
    path: '/users',
    element: <UserList />,
  },
  {
    path: '/users/:id',
    element: <UserDetails />,
  },  
  {
    path: '/posts/:id',
    element: <PostDetails />,
  },
]);


