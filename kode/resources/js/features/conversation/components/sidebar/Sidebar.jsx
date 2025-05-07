import { useMediaQuery } from "react-responsive";

import {
  BsChatDots,
  BsInbox,
  BsPlusLg,
  BsWhatsapp
} from "react-icons/bs";
import {
  LuCalendarRange,
  LuChartArea,
  LuContact,
  LuLayoutTemplate,
} from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";

const menuList = [
  {
    icon: <BsInbox />,
    to: "/conversation/inbox",
    label: "Your Inbox",
    recent: 5,
    allCount: "50k",
  },
  {
    icon: <BsChatDots />,
    to: "/conversation/sms",
    label: "SMS",
    recent: null,
    allCount: "50k",
  },
  {
    icon: <BsWhatsapp />,
    to: "/conversation/whatsapp",
    label: "Whatsapp",
    recent: 5,
    allCount: "50k",
  },
  {
    icon: <LuContact />,
    to: "/conversation/contact",
    label: "Contact",
    recent: 5,
    allCount: "50k",
  },
  {
    icon: <LuCalendarRange />,
    to: "/conversation/subscriptions",
    label: "Subscription",
    recent: 5,
    allCount: "50k",
  },
  {
    icon: <LuChartArea />,
    to: "/conversation/report",
    label: "Report",
    recent: null,
  },
  {
    icon: <LuLayoutTemplate />,
    to: "/conversation/template",
    label: "Template",
    recent: null,
  },
  // {
  //   icon: <BsTrash3 />,
  //   to: "/conversation/trash",
  //   label: "Trash",
  //   recent: null,
  // },
];

const Sidebar = () => {
  const isLgUp = useMediaQuery({
    query: "(min-width: 992px)",
  });

  return (
    <div className="col-auto conversation-sidebar">
      <div className="conversation-sidebar-body">
        {isLgUp && (
          <div className="sidebar-header">
            <h6>Conversations</h6>

            <div className="d-flex align-items-center gap-2">
              <button className="bg--transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M10.0833 3.66667H7.15C5.60986 3.66667 4.83978 3.66667 4.25153 3.9664C3.73408 4.23005 3.31338 4.65075 3.04973 5.16819C2.75 5.75645 2.75 6.52652 2.75 8.06667V12.8333C2.75 13.6858 2.75 14.112 2.8437 14.4618C3.09799 15.4108 3.83924 16.152 4.78825 16.4063C5.13796 16.5 5.56419 16.5 6.41667 16.5V18.6409C6.41667 19.1293 6.41667 19.3735 6.51679 19.499C6.60387 19.6081 6.73591 19.6715 6.87549 19.6714C7.03599 19.6712 7.2267 19.5186 7.60811 19.2135L9.79478 17.4642C10.2415 17.1068 10.4648 16.9281 10.7135 16.8011C10.9342 16.6884 11.1691 16.606 11.4118 16.5561C11.6854 16.5 11.9714 16.5 12.5434 16.5H13.9333C15.4735 16.5 16.2436 16.5 16.8318 16.2003C17.3493 15.9366 17.7699 15.5159 18.0336 14.9985C18.3333 14.4102 18.3333 13.6401 18.3333 12.1V11.9167M18.4445 3.55546C19.5185 4.6294 19.5185 6.3706 18.4445 7.44454C17.3706 8.51849 15.6294 8.51849 14.5555 7.44454C13.4815 6.3706 13.4815 4.6294 14.5555 3.55546C15.6294 2.48151 17.3706 2.48151 18.4445 3.55546Z"
                    stroke="#47546C"
                    strokeOpacity="0.8"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="chat-menus-wrapper scroll scroll-3 scroll-hover">
          <nav className="chat-menu">
            {menuList.map((menu, ind) => (
              <NavLink to={menu?.to} key={ind} className="chat-menu-link">
                <span className="chat-menu-icon">{menu?.icon}</span>
                <h6>
                  {menu?.label}
                  {menu?.recent !== null && (
                    <span className="i-badge pill danger-solid fs-10 px-lg-2 px-1 menu-badge">
                      {menu?.recent}
                    </span>
                  )}
                </h6>
                <span className="count-value">{menu?.allCount}</span>
              </NavLink>
            ))}
          </nav>

          {isLgUp && (
            <div className="channel">
              <div className="channel-title">
                <h5>Channels </h5>
                <span>
                  <BsPlusLg />
                </span>
              </div>
              <nav className="channel-list">
                <Link to="#" className="channel-link">
                  SMS
                </Link>
                <Link to="#" className="channel-link">
                  Whatsapp
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
