import Button from "@/components/common/button/Button";
import TableWrapper from "@/components/common/table/TableWrapper";
import React from "react";
import { LuDownload, LuPlus } from "react-icons/lu";
import FilterWrapper from "../../../../../components/common/filter/FilterWrapper";
import { DeleteModal } from "../../../../../components/common/modal";
import ModalWrapper from "../../../../../components/common/modal/ModalWrapper";
import PaginationWrapper from "../../../../../components/common/pagination/PaginationWrapper";
import { useModal } from "../../../../../context";
import type { ModalContextType, ModalSize } from "../../../../../utils/types";
import SaveContact from "./modals/SaveContact";
import ContactTable from "./tables/ContactTable";


const AllContacts: React.FC = () => {

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "allContactModal";

    return (
        <>

            <div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                    <FilterWrapper className={"mb-0"} />

                    <div className="d-flex align-items-center gap-3">
                        <Button className="btn--dark outline btn--md rounded-3">
                            <LuDownload className="fs-18" />
                            Download CSV
                        </Button>

                        <Button
                            className="btn--primary btn--md rounded-3"
                            onClick={() => openModal(
                                modalUid,
                                "CREATE",
                                "Create new contact",
                                "lg"
                            )}
                        >
                            <LuPlus className="fs-18" /> Add Contact
                        </Button>
                    </div>
                </div>

                <div className="row row-cols-xl-3 g-4 mb-4">
                    <div className="col">
                        <div className="contact-status-card">
                            <p>Total Contacts</p>
                            <h6>2105</h6>
                        </div>
                    </div>

                    <div className="col">
                        <div className="contact-status-card">
                            <p>Active contacts</p>
                            <h6>75.25%</h6>
                        </div>
                    </div>

                    <div className="col">
                        <div className="contact-status-card">
                            <p>Contact Blacklisted</p>
                            <h6>150</h6>
                        </div>
                    </div>
                </div>

                <TableWrapper>
                    <ContactTable actions={{
                        modal: { fn: openModal, modalUid },
                    }} />
                </TableWrapper>

                <div className="mt-4">
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
                            <SaveContact onHide={closeModal} />
                        )}

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal onHide={closeModal} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default AllContacts;
