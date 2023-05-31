import 'bootstrap';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'semantic-ui-css/semantic.min.css';

import './styles/site.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

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
import {MyLessons} from "./routes/authorized/MyLessons";
import {MyAvailability} from "./routes/authorized/MyAvailability";
import Lesson from "./routes/authorized/Lesson";
import ReserveLesson from "./routes/authorized/ReserveLesson";
import Payment from "./routes/authorized/Payment";
import {Navigations} from "./types/strings/Navigations";
import {EditProfile} from "./routes/authorized/EditProfile";


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
                path: Navigations.LOGIN,
                element: <Login />,
            },
            {
                path: Navigations.REGISTER,
                element: <Register />,
            },
            {
                path: Navigations.TUTOR_SEARCH,
                element: <TutorsSearch />,
            },
            {
                path: Navigations.SUBJECTS,
                element: <SubjectsList />,
            },
            {
                path: `${Navigations.SUBJECTS}/:id`,
                element: <SubjectDetails />,
            },
            {
                path: `${Navigations.LESSON}/:lessonId`,
                element: <Lesson />,
            },
            {
                path: Navigations.PROFILE,
                element: <Profile />
            },
            {
                path: Navigations.EDIT_PROFILE,
                element: <EditProfile />
            },
            {
                path: Navigations.MY_LESSONS,
                element: <MyLessons />,
            },
            {
                path: Navigations.RESERVE_LESSON,
                element: <ReserveLesson />,
            },
            {
                path: Navigations.MY_AVAILABILITY,
                element: <MyAvailability />,
            },
            {
                path: Navigations.PAYMENT_METHODS,
                element: <PaymentMethods />,
            },
            {
                path: `${Navigations.PAYMENT}/:paymentId`,
                element: <Payment />,
            },
            {
                path: Navigations.BANKING_DETAILS,
                element: <BankingDetails />,
            },
            {
                path: Navigations.INBOX,
                element: <Inbox />,
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
