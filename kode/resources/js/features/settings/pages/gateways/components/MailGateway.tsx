import Button from "@/components/common/button/Button";
import PaginationWrapper from "@/components/common/pagination/PaginationWrapper";
import TableWrapper from "@/components/common/table/TableWrapper";
import { LuPlus } from "react-icons/lu";
import FilterWrapper from "../../../../../components/common/filter/FilterWrapper";
import ModalWrapper, { DeleteModal } from "../../../../../components/common/modal";
import { useModal } from "../../../../../context";
import type { ModalContextType } from "../../../../../utils/types";
import SaveMailGatewayModal from "./modals/SaveMailGatewayModal";
import GatewayTable from "./tables/GatewayTable";

interface MailGatewayProps {
    openModal: OpenModalFn;
}


const MailGateway: React.FC<MailGatewayProps> = () => {

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "mailGatewayModal";
    
    return (
        <>
            <div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                    <FilterWrapper className={"mb-0"} />

                    <Button
                        className="btn--primary btn--md rounded-3 flex-shrink-0"
                        onClick={() =>
                            openModal(modalUid,"CREATE_MAIL", "Create mail gateway", "lg")
                        }
                    >
                        <LuPlus className="fs-20" /> Add gateway
                    </Button>
                </div>

                <TableWrapper>
                    <GatewayTable openModal={openModal} type={"mail"} />
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
                    {(modalConfig?.type === "CREATE_MAIL" ||
                        modalConfig?.type === "EDIT_MAIL") && (
                            <SaveMailGatewayModal closeModal={closeModal} />
                        )}

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal onHide={closeModal} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default MailGateway;