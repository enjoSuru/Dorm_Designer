import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page.jsx'
import { Auth } from './Auth.jsx';
import NavBar from './navbar.jsx';
import Rooms from './Rooms.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: <ErrorPage/>,
    children:[
      {
        path:"/",
        element:<App/>
      },
      {
        path:"/login",
        element:<Auth/>
      },
      {
        path:"/rooms",
        element:<Rooms />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)


//ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//)
