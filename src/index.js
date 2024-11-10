import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css'
import Category from './Components/Pages/Category';
import Blog from './Components/Pages/Blog';
import Profile from './Components/Pages/Profile';
import Login from './Components/Login';
import AddCategory from './Components/Pages/AddCategory';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {Path:"/",element:<Category/>},
      { path: "Category", element: <AddCategory/>  },
      { path: "Profile", element: <Profile /> },
      { path: "Blog", element: <Category /> },
      { path: "blo", element:  <Blog /> }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
