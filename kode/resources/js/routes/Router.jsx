import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Calendar from "../features/calendar/Calendar";
import Campaign from "../features/campaign/Campaign";
import Conversation from "../features/conversation/Conversation";
import Dashboard from "../features/dashboard/Dashboard";
import Profile from "../features/profile/Profile";
import Reports from "../features/reports/Reports";
import CreateRole from "../features/role-permission/CreateRole";
import ManageRole from "../features/role-permission/ManageRole";
import ManageStaffs from "../features/role-permission/ManageStaffs";
import Error from "../features/error/Error";
import ChooseCampaign from "../features/campaign/ChooseCampaign";
import CreateSmsCampaign from "../features/campaign/CreateSmsCampaign";
import CreateWhatsappCampaign from "../features/campaign/CreateWhatsappCampaign";
import ChatWrapper from "../features/conversation/pages/chat/ChatWrapper";
import Contact from "../features/conversation/pages/contact/Contact";
import Report from "../features/conversation/pages/report/Report";
import Subscription from "../features/conversation/pages/subscription/Subscription";
import Template from "../features/conversation/pages/template/Template";
import PricingPlan from "../features/plans/PricingPlan";
import Root from "./Root";


const basename = window.APP_BASE_URL
? new URL(window.APP_BASE_URL).pathname
: '/';

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "conversation",
        element: <Conversation />,
        children: [
          {
            index:true,
            path: "/conversation/inbox",
            element: <ChatWrapper />,
          },

          {
            path: "/conversation/sms",
            element: <ChatWrapper />,
          },
          {
            path: "/conversation/whatsapp",
            element: <ChatWrapper />,
          },
          {
            path: "/conversation/subscriptions",
            element: <Subscription />,
          },
          {
            path: "/conversation/contact",
            element: <Contact />,
          },
          {
            path: "/conversation/report",
            element: <Report />,
          },
          {
            path: "/conversation/template",
            element: <Template />,
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
        path: "/roles/staff",
        element: <ManageStaffs />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <Error />,
  },
],
{
  basename: basename
}

);

export default router;
