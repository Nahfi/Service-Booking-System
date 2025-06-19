import Button from "@/components/common/button/Button";
import PageHeader from "@/components/common/Page-header/PageHeader";
import MessagePreview from "@/features/campaign/components/campaign/MessagePreview";
import type React from "react";
import WhatsappTemplate from "../components/form/WhatsappTemplate";

const CreateTemplate: React.FC = () => {
  return (
      <>
          <div className="conversation-content-body py-0">
              <div className="row h-100 g-0">
                  <div className="col-xxl-8 col-xl-7 col-lg-6 border-lg-end py-30 pe-lg-30">
                      <div className="mb-4">
                          <PageHeader
                              title="Create  Template"
                              breadcrumbs={[
                                  {
                                      title: "Template",
                                  },
                              ]}
                          />
                      </div>
                      <div className="form-wrapper-width ms-0 me-auto">
                          <WhatsappTemplate />
                      </div>
                  </div>
                  <div className="col-xxl-4 col-xl-5 col-lg-6 py-30 position-relative">
                      <MessagePreview type={"whatsapp"} whatsapp />
                  </div>
              </div>
          </div>

          <div className="position-sticky bottom-0 end-0 px-3 py-2 border-top w-100 text-end z-3 bg-white">
              <Button className="i-btn btn--primary btn--md">Save</Button>
          </div>
      </>
  );
}

export default CreateTemplate