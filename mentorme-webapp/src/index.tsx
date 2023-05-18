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
import TutorsSearch from "./routes/TutorsSearch";
import SubjectsList from "./routes/SubjectsList";
import SubjectDetails from "./routes/SubjectDetails";
import Profile from "./routes/authorized/Profile";
import {PaymentMethods} from "./routes/authorized/PaymentMethods";
import {BankingDetails} from "./routes/authorized/BankingDetails";
import {Inbox} from "./routes/authorized/Inbox";

function MyLessons() {
    return null;
}

function MyAvailability() {
    return null;
}

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
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/tutors-search",
                element: <TutorsSearch />,
            },
            {
                path: "/subjects",
                element: <SubjectsList />,
            },
            {
                path: "/subjects/:id",
                element: <SubjectDetails />,
            },
            {
                path: "/profile",
                element: <Profile />,
                children: [
                    {
                        path: "my-lessons",
                        element: <MyLessons />,
                    },
                    {
                        path: "my-availability",
                        element: <MyAvailability />,
                    },
                    {
                        path: "payment-methods",
                        element: <PaymentMethods />,
                    },
                    {
                        path: "banking-details",
                        element: <BankingDetails />,
                    },
                    {
                        path: "inbox",
                        element: <Inbox />,
                    }
                ]
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
