
import { LuPlus } from "react-icons/lu";
import Button from "../../../../../components/common/button/Button";
import FilterWrapper from "../../../../../components/common/filter/FilterWrapper";
import ModalWrapper, { DeleteModal } from "../../../../../components/common/modal";
import PaginationWrapper from "../../../../../components/common/pagination/PaginationWrapper";
import TableWrapper from "../../../../../components/common/table/TableWrapper";
import { useModal } from "../../../../../context";
import type { ModalContextType } from "../../../../../utils/types";
import SaveGroup from "./modals/SaveGroup";
import GroupTable from "./tables/GroupTable";

const Groups: React.FC = () => {

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "groupsModal";

    return (
        <>
            <div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                    <FilterWrapper className="mb-0" />

                    <div className="d-flex align-items-center gap-3">
                        <Button
                            className="btn--primary btn--md rounded-3"
                            onClick={() => openModal(modalUid, "CREATE_GROUP", "Create new group", "md")}
                        >
                            <LuPlus className="fs-18" /> Create Group
                        </Button>
                    </div>
                </div>

                <TableWrapper>
                    <GroupTable actions={{
                        modal: { fn: openModal, modalUid },
                    }} />
                </TableWrapper>

                <div className="mt-4">
                    <PaginationWrapper />
                </div>`
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
                    {(modalConfig?.type === "CREATE_GROUP" ||
                        modalConfig?.type === "EDIT_GROUP") && (
                            <SaveGroup onHide={closeModal} />
                        )}

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal onHide={closeModal} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default Groups;
