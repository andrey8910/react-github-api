import {Router as RemixRouter} from "@remix-run/router/dist/router";
import {createBrowserRouter, Navigate} from "react-router-dom";
import ErrorPage from "./pages/error-page.tsx";
import FavouritesPage from "./pages/favourites-page/FavouritesPage.tsx";
import HomePage from "./pages/home-page/HomePage.tsx";
import {SearchPage} from "./pages/search-page/SearchPage.tsx";
import RootPage from "./pages/root-page/RootPage.tsx";

export const router: RemixRouter = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="home" replace />,
    },
    {
        path: "/",
        element: <RootPage/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
            {
                path: "favourites",
                element: <FavouritesPage />,
            },
        ],
    },
]);