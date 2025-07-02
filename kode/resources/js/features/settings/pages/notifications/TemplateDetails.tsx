import PageHeader from "@/components/common/Page-header/PageHeader";
import React from "react";
import SaveNotificationTemplates from "./components/SaveNotificationTemplates";

const TemplateDetails: React.FC = () => {
  return (
      <>
          <PageHeader
              title={"Update Templates"}
              breadcrumbs={[
                  { title: "Settings", path: "/setting/general" },
                  {
                      title: "Notification Templates",
                      path: "/setting/notification-templates",
                  },
                  {
                      title: "Update",
                  },
              ]}
          />

          <SaveNotificationTemplates/>
      </>
  );
}

export default TemplateDetails;