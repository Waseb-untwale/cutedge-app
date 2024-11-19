import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import Category from './Components/Pages/Category';
import Blog from './Components/Pages/Blog';
import Profile from './Components/Pages/Profile';
import Login from './Components/Login';
import AddCategory from './Components/Pages/AddCategory';
import Home from './Components/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Directly set Login as the root element
  },
  {
    path: "/",
    element: <App />, // Main app element after login
    children: [
      { path: "home", element: <Home /> },
      { path: "category",element: <AddCategory /> },
      {path:"category/:id",element: <AddCategory/>},
      { path: "profile", element: <Profile /> },
      { path: "blog", element: <Category /> },
      { path: "blo", element: <Blog /> },
      { path: "blo/:id", element: <Blog /> }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
