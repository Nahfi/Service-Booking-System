import type React from "react";
import { Nav } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import { useTranslation } from "react-i18next";
import { LuMonitorDot, LuShield, LuUserCog } from "react-icons/lu";
import { useSelector } from "react-redux";
import PageHeader from "../../components/common/Page-header/PageHeader";
import SEO from "../../components/common/seo/SEO";
import BaseLayout from "../../components/layouts/BaseLayout";
import type { RootState } from "../../redux/store/store";
import { valueToKey } from "../../utils/helper";
import ProfileInformation from "./components/ProfileInformation";
import Security from "./components/Security";
import Sessions from "./components/Sessions";
import "./profile.scss";


const Profile: React.FC = () => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
    
  const tabMenu = [
      {
          label: "Profile Information",
          value: "profile",
          icon: <LuUserCog />,
          component: <ProfileInformation user={user}/>,
      },
      {
          label: "Security",
          value: "security",
          icon: <LuShield />,
          component: <Security user={user}/>,
      },
      {
          label: "Sessions",
          value: "sessions",
          icon: <LuMonitorDot />,
          component: <Sessions user={user}/>,
      },
  ];

  return (
      <>
          <SEO title="Profile" />

          <BaseLayout>
              <>
                  <PageHeader
                      title="My Account"
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
                                                  {t(
                                                      valueToKey(menu?.label),
                                                      menu?.label
                                                  )}
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
