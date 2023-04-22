import 'bootstrap';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './styles/site.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import Root from "./routes/Root";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "login/",
                element: <Login />,
            },
            {
                path: "register/",
                element: <Register />,
            }
        ]
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
