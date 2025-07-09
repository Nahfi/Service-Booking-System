import { LuPlus } from 'react-icons/lu';
import Button from '../../../../components/common/button/Button';
import FilterWrapper from '../../../../components/common/filter/FilterWrapper';
import ModalWrapper, { DeleteModal } from '../../../../components/common/modal';
import PageHeader from '../../../../components/common/Page-header/PageHeader';
import PaginationWrapper from '../../../../components/common/pagination/PaginationWrapper';
import TableWrapper from '../../../../components/common/table/TableWrapper';
import { useModal } from '../../../../context';
import type { ModalContextType } from '../../../../utils/types';
import SaveChannel from './components/modals/SaveChannel';
import ChannelsTable from './components/tables/ChannelsTable';

const WhatsappAccount: React.FC = () => {

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "allContactModal";

    return (

        <>
            <div className="conversation-content-body">
                <div className="channel-page">
                    <PageHeader
                        title="Whatsapp account"
                        breadcrumbs={[
                            {
                                title: "Whatsapp account",
                            },
                        ]}
                    />

                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                        <FilterWrapper className={"mb-0"} />

                        <div className="d-flex align-items-center gap-3">
                            <Button
                                className="btn--primary btn--md rounded-3"
                                href='/conversation/gateway/whatsapp/create'
                                // onClick={() => openModal(
                                //     modalUid,
                                //     "CREATE",
                                //     "Create new channel",
                                //     "lg"
                                // )}
                            >
                                <LuPlus className="fs-18" /> Add account
                            </Button>
                        </div>
                    </div>

                    <TableWrapper>
                        <ChannelsTable actions={{
                            modal: { fn: openModal, modalUid },
                        }} />
                    </TableWrapper>

                    <PaginationWrapper />
                </div>
            </div>

            {showModal && modalConfig.modalUid === modalUid && (
                <ModalWrapper
                    title={modalConfig?.title}
                    onHide={closeModal}
                    show={showModal}
                    size={modalConfig?.size as ModalSize}
                    scrollable
                    centered
                >
                    {(modalConfig?.type === "CREATE" ||
                        modalConfig?.type === "EDIT") && (
                        <SaveChannel onHide={closeModal} />
                        )}

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal onHide={closeModal} />
                    )}
                </ModalWrapper>
            )}
        </>


    )
}

export default WhatsappAccount