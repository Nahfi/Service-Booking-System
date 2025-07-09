import FilterWrapper from "../../../../../components/common/filter/FilterWrapper";
import ModalWrapper, { DeleteModal } from "../../../../../components/common/modal";
import PaginationWrapper from "../../../../../components/common/pagination/PaginationWrapper";
import TableWrapper from "../../../../../components/common/table/TableWrapper";
import { useModal } from "../../../../../context";
import type { ModalContextType } from "../../../../../utils/types";
import SendLogDetails from "./modals/SendLogDetails";
import SendLogTable from "./tables/SendLogTable";


const SendLog: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "sendLogModals";

  return (
      <>
          <div>
                <FilterWrapper />

                <TableWrapper>
                  <SendLogTable actions={{
                      modal: { fn: openModal, modalUid },
                  }} />
                </TableWrapper>

                <div className="mt-4">
                    <PaginationWrapper />
                </div>
          </div>

          {showModal && modalConfig?.modalUid === modalUid && (
              <ModalWrapper
                  title={modalConfig?.title}
                  onHide={closeModal}
                  show={showModal}
                  size={modalConfig?.size}
                  scrollable
                  centered
              >
                  {modalConfig?.type === "VIEW" && (
                      <SendLogDetails onHide={closeModal} />
                  )}

                  {modalConfig?.type === "DELETE" && (
                      <DeleteModal onHide={closeModal} />
                  )}
              </ModalWrapper>
          )}
      </>
  );
};

export default SendLog;
