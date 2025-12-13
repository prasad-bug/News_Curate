import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import TheHinduNavbar from './components/hindu/TheHinduNavbar';
import CategoryBar from './components/hindu/CategoryBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Saved from './pages/Saved';
import PopularTopics from './pages/PopularTopics';
import Summarizer from './pages/Summarizer';
import Sport from './pages/Sport';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import SearchPage from './pages/SearchPage';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageNews from './pages/admin/ManageNews';
import ManageUsers from './pages/admin/ManageUsers';


// Protected Route Component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};



// Helper function to get active category from path
const getActiveCategory = (pathname) => {
  const categoryMap = {
    '/india': 'India',
    '/world': 'World',
    '/movies': 'Movies',
    '/sport': 'Sport',
    '/data': 'Data',
    '/health': 'Health',
    '/opinion': 'Opinion',
    '/science': 'Science',
    '/business': 'Business',
    '/premium': 'Premium',
  };
  return categoryMap[pathname] || 'India';
};

function App() {
  const location = useLocation();

  // Don't show navbar and category bar on login/register pages
  const hideNavigation = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {!hideNavigation && (
        <>
          <TheHinduNavbar />
          <CategoryBar activeCategory={getActiveCategory(location.pathname)} />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Category Pages */}
        <Route path="/india" element={<CategoryPage category="india" title="India" description="Latest news from across India" />} />
        <Route path="/world" element={<CategoryPage category="world" title="World" description="International news and global affairs" />} />
        <Route path="/movies" element={<CategoryPage category="entertainment" title="Movies" description="Entertainment and cinema news" />} />
        <Route path="/sport" element={<Sport />} />
        <Route path="/data" element={<CategoryPage category="technology" title="Data" description="Data journalism and analysis" />} />
        <Route path="/health" element={<CategoryPage category="health" title="Health" description="Health and wellness news" />} />
        <Route path="/opinion" element={<CategoryPage category="opinion" title="Opinion" description="Editorials and opinion pieces" />} />
        <Route path="/science" element={<CategoryPage category="science" title="Science" description="Science and technology news" />} />
        <Route path="/business" element={<CategoryPage category="business" title="Business" description="Business and economy news" />} />
        <Route path="/premium" element={<CategoryPage category="premium" title="Premium" description="Premium content and features" />} />

        {/* Article Details Route */}
        <Route path="/article/:id" element={<ArticlePage />} />

        {/* Search Route */}
        <Route path="/search" element={<SearchPage />} />


        <Route
          path="/saved"
          element={
            <PrivateRoute>
              <Saved />
            </PrivateRoute>
          }
        />

        <Route
          path="/summarizer"
          element={
            <PrivateRoute>
              <Summarizer />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/news"
          element={
            <AdminRoute>
              <ManageNews />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/topics"
          element={
            <AdminRoute>
              <PopularTopics />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
