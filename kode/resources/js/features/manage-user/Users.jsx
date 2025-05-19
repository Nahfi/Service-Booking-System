import { useContext } from "react";
import {
    BsPlusLg,
    BsRecycle
} from "react-icons/bs";

import Button from "@/components/common/button/Button";
import { DeleteModal } from "@/components/common/modal";
import TableWrapper from "@/components/common/table/TableWrapper";
import BaseLayout from "@/components/layouts/BaseLayout";
import { ModalContext } from "@/context";
import Filter from "../../components/common/filter/Filter";
import Field from "../../components/common/from/Field";
import ModalWrapper from "../../components/common/modal/ModalWrapper";
import PageHeader from "../../components/common/Page-header/PageHeader";
import PaginationWrapper from "../../components/common/pagination/PaginationWrapper";
import UserTable from "./components/UserTable";

const Users = () => {

    const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext);

    return (
        <>
            <BaseLayout>
                <PageHeader
                    title={"Manage Staffs"}
                    shortTitle={"Manage your Staff"}
                >
                    <>
                        <Button
                            onClick={() =>
                                openModal("CREATE", "Create User", "lg")
                            }
                            className="btn--primary btn--md rounded-3"
                        >
                            <BsPlusLg className="fs-16" /> Add New staff
                        </Button>

                        <Button className="btn--danger btn--md rounded-3">
                            <BsRecycle className="fs-16" />
                            Recycle Bin
                        </Button>
                    </>
                </PageHeader>

                <div>
                    <div className="mb-4">
                        <Filter />
                    </div>

                    <TableWrapper>
                        <UserTable openModal={openModal} />
                    </TableWrapper>

                    <div className="mt-4">
                        <PaginationWrapper />
                    </div>
                </div>
            </BaseLayout>

            <ModalWrapper
                title={modalConfig?.title}
                onHide={closeModal}
                show={showModal}
                size={modalConfig?.size}
                scrollable
                centered
            >
                {(modalConfig?.type === "CREATE" ||
                    modalConfig?.type === "EDIT") && (
                    <form action="">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Field label="Name" required>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        placeholder="Enter name"
                                    />
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Email" required>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                    />
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Phone" required>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Enter Phone"
                                    />
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Select Role" required>
                                    <select
                                        name="role_id"
                                        id="role_id"
                                        className="form-select"
                                    >
                                        <option>--Select Role--</option>
                                        <option value="Active">Admin</option>
                                        <option value="Inactive">CEO</option>
                                    </select>
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Password" required>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Enter password"
                                    />
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Confirm password" required>
                                    <input
                                        type="password"
                                        id="password_confirm"
                                        name="password_confirm"
                                        className="form-control"
                                        placeholder="Enter confirm password"
                                    />
                                </Field>
                            </div>

                            <div className="col-12">
                                <Field label="Profile Image">
                                    <input
                                        type="file"
                                        id="userImage"
                                        className="form-control"
                                        placeholder="Enter Phone"
                                    />
                                </Field>
                            </div>
                        </div>

                        <div className="modal-custom-footer mt-4">
                            <Button
                                type="button"
                                className="i-btn btn--dark btn--lg outline rounded-3"
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="i-btn btn--primary btn--lg rounded-3"
                                isLoading={true}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                )}

                {modalConfig?.type === "DELETE" && (
                    <DeleteModal onHide={closeModal} />
                )}
            </ModalWrapper>
        </>
    );
};

export default Users;
