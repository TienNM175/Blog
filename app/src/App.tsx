import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { Layout } from './shared/components/Layout';
import { UserList } from './apps/users/components/UserList';
import { UserDetails } from './apps/users/components/UserDetails';
import { PostDetails } from './apps/posts/components/PostDetails';
import { CreatePost } from './apps/posts/components/CreatePost';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/posts/create" element={<CreatePost />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
