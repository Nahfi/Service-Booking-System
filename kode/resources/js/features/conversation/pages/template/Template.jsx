import Button from "@/components/common/button/Button";
import PageHeader from "@/components/common/Page-header/PageHeader";
import MessagePreview from "@/features/campaign/components/campaign/MessagePreview";
import { Tab, Tabs } from "react-bootstrap";
import SmsTemplate from "./components/SmsTemplate";
import WhatsappTemplate from "./components/WhatsappTemplate";


const Template = () => {


  return (
    <div>
      <div className="main-content-body py-0">
        <div className="row h-100 g-0">
          <div className="col-xxl-8 col-xl-7 col-lg-6 border-lg-end py-30 pe-lg-30">
            <div className="mb-4">
              <PageHeader
                title="Template"
                shortTitle="Manage your contacts"
              />
            </div>
            <div className="form-wrapper-width ms-0 me-auto">
              <Tabs
                defaultActiveKey="sms"
                id="template-tab"
                className="mb-4 style-1"
              >
                <Tab eventKey="sms" title="SMS">
                  <SmsTemplate />
                </Tab>

                <Tab eventKey="whatsapp" title="Whatsapp">
                  <WhatsappTemplate />
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-5 col-lg-6 py-30 position-relative">
            <MessagePreview
              whatsapp
            />
          </div>
        </div>
      </div>

      <div className="position-sticky bottom-0 end-0 px-3 py-2 border-top w-100 text-end z-3 bg-white">
        <Button className="i-btn btn--primary btn--md">
          Next step
        </Button>
      </div>
    </div>
  );
};

export default Template;
