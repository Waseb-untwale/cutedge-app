import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Blog from './Components/Pages/Blog';
import Login from './Components/Login';
import AddCategory from './Components/Pages/AddCategory';
import Profile from './Components/Pages/Profile';
import Category from './Components/Pages/Category';

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Dummy login function
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: isAuthenticated ? <Navigate to="/Blog" /> : <Navigate to="/login" />,
        children: [
          { path: "Category", element: <AddCategory /> },
          { path: "Profile", element: <Profile /> },
          { path: "Blog", element: <Blog /> },
          { path: "blo", element: <Blog /> }
        ]
      },
      {
        path: "/login",
        element: <Login onLogin={handleLogin} />,
      }
    ]
  );

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
