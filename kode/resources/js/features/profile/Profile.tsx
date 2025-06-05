import type React from "react";
import { Nav } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import { LuMonitorDot, LuSettings, LuShield, LuUserCog } from "react-icons/lu";
import { useSelector } from "react-redux";
import PageHeader from "../../components/common/Page-header/PageHeader";
import SEO from "../../components/common/seo/SEO";
import BaseLayout from "../../components/layouts/BaseLayout";
import type { RootState } from "../../redux/store/store";
import Information from "./components/Information";
import Password from "./components/Password";
import Subscription from "./components/Subscription";
import "./profile.scss";


const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const tabMenu = [
      {
          label: "Profile",
          value: "profile",
          icon: <LuUserCog />,
          component: <Information user={user} />,
      },
      {
          label: "Security",
          value: "security",
          icon: <LuShield />,
          component: <Password user={user} />,
      },
      {
          label: "Sessions",
          value: "sessions",
          icon: <LuMonitorDot />,
          component: <Subscription user={user} />,
      },
      {
          label: "Setting",
          value: "setting",
          icon: <LuSettings />,
          component: <Password user={user} />,
      },
  ];
  // const tabMenu = ["profile", "security", "sessions", "groups"];

  return (
      <>
          <SEO title="Profile" />

          <BaseLayout>
              <>
                  <PageHeader
                      title="My Profile"
                      description="Manage your profile"
                      breadcrumbs={[{ title: "Profile" }]}
                  />
                  <div className="tab-container-wrapper">
                      <Tab.Container
                          id="profile-setting-tab"
                          defaultActiveKey="profile"
                      >
                          <div className="tab-wrapper mb-4">
                              <Nav variant="pills" className="pills-tab">
                                  {tabMenu?.map((menu) => (
                                      <Nav.Item key={menu.value}>
                                          <Nav.Link
                                              as="button"
                                              eventKey={menu.value}
                                              className="pills-tab-item"
                                      >
                                              {menu.icon}
                                              <span>
                                                  {menu.label}
                                              </span>
                                          </Nav.Link>
                                      </Nav.Item>
                                  ))}
                              </Nav>
                          </div>

                          <div className="tab-content">
                              <Tab.Content>
                                  {tabMenu?.map((menu) => (
                                      <Tab.Pane
                                          key={menu.value}
                                          eventKey={menu.value}
                                          transition={true}
                                      >
                                          {menu.component}
                                      </Tab.Pane>
                                  ))}
                              </Tab.Content>
                          </div>
                      </Tab.Container>

                  </div>
              </>
          </BaseLayout>
      </>
  );
};

export default Profile;
