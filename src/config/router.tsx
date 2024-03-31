import {
    createBrowserRouter,
} from "react-router-dom";

import Home from "../pages/home";
import Airdrop from "../pages/airdrop";
import PageLayout from "../components/PageLayout";

const isDev = import.meta.env.DEV;

const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        Component: PageLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'airdrop',
                Component: Airdrop,
            }
        ]

    }
], {
    basename: isDev ? '/' : '/deplan-airdrop-client/',
});

export default router