import GeneralLayout from "./GeneralLayout";
import GeneralNotFoundPage from "./GeneralNotFoundPage";
import HomePage from "./HomePage";
import BillHelpPage from "./BillHelpPage";
import DonationPage from "./DonationPage";
import EducationSupportPage from "./EducationSupportPage";
import PetFoodSupportPage from "./PetFoodSupportPage";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
// Private Route
import AuthPrivateRoute from "../components/AuthPrivate";

const routes = [
    {
        path: '/',
        element: <GeneralLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'bills', element: <BillHelpPage />, auth: true },
            { path: 'donation', element: <DonationPage />, auth: true },
            { path: 'educationSupport', element: <EducationSupportPage />, auth: true },
            { path: 'petFoodSupport', element: <PetFoodSupportPage />, auth: true },
            { path: 'sign-in', element: <SignIn /> },
            { path: 'sign-up', element: <SignUp /> },
            { path: '*', element: <GeneralNotFoundPage /> }
        ]
    }
]

const privateRouteMap = (routes) =>
    routes.map((route) => {

        if (route?.auth) {
            route.element = <AuthPrivateRoute>{route.element}</AuthPrivateRoute>
        }

        if (route?.children) {
            route.children = privateRouteMap(route.children)
        }

        return route
    })

export default privateRouteMap(routes)