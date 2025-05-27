import ModalWrapper, { DeleteModal } from "@/components/common/modal";
import PageHeader from "@/components/common/Page-header/PageHeader";
import { ModalContext } from "@/context";
import { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import MailGateway from "./components/MailGateway";
import SaveMailGatewayModal from "./components/SaveMailGatewayModal";
import SaveSmsGatewayModal from "./components/SaveSmsGatewayModal";
import SmsGateway from "./components/SmsGateway";

const Gateways = () => {

  const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext);
  return (
      <>
          <PageHeader
              title={"Gateway configurations"}
              breadcrumbs={[
                  { title: "Settings", path: "/setting/general" },
                  {
                      title: "Gateway configurations",
                  },
              ]}
          />

          <Tabs
              defaultActiveKey="sms-gateway"
              id="gateway-tab"
              className="mb-4 style-1"
          >
              <Tab eventKey="sms-gateway" title="SMS Gateway">
                  <SmsGateway openModal={openModal} />
              </Tab>

              <Tab eventKey="mail-gateway" title="Mail Gateway">
                  <MailGateway openModal={openModal} />
              </Tab>
          </Tabs>

          <ModalWrapper
              title={modalConfig?.title}
              onHide={closeModal}
              show={showModal}
              size={modalConfig?.size}
              scrollable
              centered
          >
              {(modalConfig?.type === "CREATE_SMS" ||
                  modalConfig?.type === "EDIT_SMS") && (
                  <SaveSmsGatewayModal closeModal={closeModal} />
              )}

              {(modalConfig?.type === "CREATE_MAIL" ||
                  modalConfig?.type === "EDIT_MAIL") && (
                  <SaveMailGatewayModal closeModal={closeModal} />
              )}

              {modalConfig?.type === "DELETE" && (
                  <DeleteModal onHide={closeModal} />
              )}
          </ModalWrapper>
      </>
  );
}

export default Gateways