import FilterWrapper from "../../../components/common/filter/FilterWrapper"
import ModalWrapper, { DeleteModal } from "../../../components/common/modal"
import TableWrapper from "../../../components/common/table/TableWrapper"
import { useModal } from "../../../context"
import type { ModalContextType } from "../../../utils/types"
import CampaignTable from "./tables/CampaignTable"

const SmsCampaign = () => {

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid: string = "smsCampaign"

    return (
        <>
            <div>
                <FilterWrapper />
                <div>
                    <TableWrapper>
                        <CampaignTable actions={{
                            modal: { fn: openModal, modalUid },
                        }} />
                    </TableWrapper>
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

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal
                            onHide={closeModal}
                        />
                    )}
                </ModalWrapper>
            )}
        </>
    )
}

export default SmsCampaign