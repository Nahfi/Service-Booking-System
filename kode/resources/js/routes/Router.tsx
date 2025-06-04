import { createBrowserRouter, type RouteObject } from "react-router-dom";

import type { JSX } from "react";
import ForgotPassword from "../features/auth/ForGotPassword";
import Login from "../features/auth/Login";
import VerifyEmail from "../features/auth/VerifyEmail";
import Calendar from "../features/calendar/Calendar";
import Campaign from "../features/campaign/Campaign";
import ChooseCampaign from "../features/campaign/ChooseCampaign";
import CreateSmsCampaign from "../features/campaign/CreateSmsCampaign";
import CreateWhatsappCampaign from "../features/campaign/CreateWhatsappCampaign";
import Conversation from "../features/conversation/Conversation";
import ChatWrapper from "../features/conversation/pages/chat/ChatWrapper";
import Contact from "../features/conversation/pages/contact/Contact";
import Report from "../features/conversation/pages/report/Report";
import Subscription from "../features/conversation/pages/subscription/Subscription";
import CreateTemplate from "../features/conversation/pages/template/pages/CreateTemplate";
import Templates from "../features/conversation/pages/template/Templates";
import WhatsappChat from "../features/conversation/pages/whatsapp-chat/WhatsappChat";
import Dashboard from "../features/dashboard/Dashboard";
import Error from "../features/error/Error";
import Users from "../features/manage-user/Users";
import PricingPlan from "../features/plans/PricingPlan";
import Profile from "../features/profile/Profile";
import Reports from "../features/reports/Reports";
import CreateRole from "../features/role-permission/CreateRole";
import ManageRole from "../features/role-permission/ManageRole";
import Gateways from "../features/settings/pages/gateways/Gateways";
import General from "../features/settings/pages/general/General";
import NotificationTemplates from "../features/settings/pages/notifications/NotificationTemplates";
import SaveNotificationTemplates from "../features/settings/pages/notifications/SaveNotificationTemplates";
import WhatsappSetting from "../features/settings/pages/whatsapp/WhatsappSetting";
import Settings from "../features/settings/Settings";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import Root from "./Root";

declare global {
    interface Window {
        APP_BASE_URL?: string;
    }
}

const basename: string = window.APP_BASE_URL
    ? new URL(window.APP_BASE_URL).pathname
    : "/";

const protectedRoute = (element: JSX.Element) => (
    <ProtectedRoute>{element}</ProtectedRoute>
);
const authRoute = (element: JSX.Element) => <AuthRoute>{element}</AuthRoute>;

const router: RouteObject[] = createBrowserRouter(
    [
        {
            path: "/",
            element: protectedRoute(<Root />),
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                },
                {
                    path: "conversation",
                    element: <Conversation />,
                    children: [
                        {
                            index: true,
                            path: "inbox",
                            element: <ChatWrapper />,
                        },

                        {
                            path: "sms",
                            element: <ChatWrapper />,
                        },
                        {
                            path: "whatsapp",
                            element: <WhatsappChat />,
                        },
                        {
                            path: "subscriptions",
                            element: <Subscription />,
                        },
                        {
                            path: "contact",
                            element: <Contact />,
                        },
                        {
                            path: "report",
                            element: <Report />,
                        },

                        {
                            path: "templates",
                            element: <Templates />,
                        },
                        {
                            path: "templates/create",
                            element: <CreateTemplate />,
                        },
                    ],
                },

                {
                    path: "/calendar",
                    element: <Calendar />,
                },
                {
                    path: "/report",
                    element: <Reports />,
                },
                {
                    path: "/pricing",
                    element: <PricingPlan />,
                },
                {
                    path: "/profile",
                    element: <Profile />,
                },
                {
                    path: "/campaign",
                    element: <Campaign />,
                },
                {
                    path: "/campaign/create-sms",
                    element: <CreateSmsCampaign />,
                },
                {
                    path: "/campaign/create-whatsapp",
                    element: <CreateWhatsappCampaign />,
                },
                {
                    path: "/campaign/choose-campaign",
                    element: <ChooseCampaign />,
                },
                {
                    path: "/roles",
                    element: <ManageRole />,
                },
                {
                    path: "/roles/create",
                    element: <CreateRole />,
                },
                {
                    path: "/users",
                    element: <Users />,
                },
                {
                    path: "/setting",
                    element: <Settings />,
                    children: [
                        {
                            index: true,
                            element: <General />,
                        },
                        {
                            path: "general",
                            element: <General />,
                        },
                        {
                            path: "whatsapp",
                            element: <WhatsappSetting />,
                        },
                        {
                            path: "gateways",
                            element: <Gateways />,
                        },
                        {
                            path: "notification-templates",
                            element: <NotificationTemplates />,
                        },
                        {
                            path: "notification-templates/create",
                            element: <SaveNotificationTemplates />,
                        },
                    ],
                },
            ],
        },

        {
            path: "login",
            element: authRoute(<Login />),
        },
        {
            path: "forgot-password",
            element: authRoute(<ForgotPassword />),
        },
        {
            path: "email-verify",
            element: authRoute(<VerifyEmail />),
        },
        {
            path: "*",
            element: <Error />,
        },
    ],
    {
        basename: basename,
    }
);

export default router;
