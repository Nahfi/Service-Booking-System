import Card from '../../components/common/card/Card';
import CardBody from '../../components/common/card/CardBody';
import PageHeader from '../../components/common/Page-header/PageHeader';
import BaseLayout from '../../components/layouts/BaseLayout';

import profileImage from "../../assets/images/user/user-1.png";

import { useTranslation } from 'react-i18next';
import { LuClock, LuEyeOff, LuMail, LuPen, LuPhone, LuShieldOff } from 'react-icons/lu';
import Button from '../../components/common/button/Button';
import CardHeader from '../../components/common/card/CardHeader';
import ModalWrapper from '../../components/common/modal';
import { useModal } from '../../context';
import { keyToValue, valueToKey } from '../../utils/helper';
import type { ModalContextType } from '../../utils/types';
import SaveUserModal from './components/SaveUserModal';
import "./user.scss";

const address = {
    country: "Bangladesh",
    city: "dhaka",
    full_address: "Mirpur 2",
    postal_code: "1216"
}

const permissions = {
    settings: [
        "view_setting",
        "save_setting"
    ],
    user: [
        "view_user",
        "save_user",
        "delete_user"
    ]
}

const UserDetails = () => {
    const { t } = useTranslation();

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "userDetailsModal"

    return (
        <>
            <BaseLayout>
                <PageHeader
                    title={"Manage Staffs"}
                    breadcrumbs={[
                        { title: "Manage User", path: "/users" },
                        { title: "User Name" },
                    ]}
                />

                <div className="row g-4 user-details">
                    <div className="col-12">
                        <Card>
                            <CardBody>
                                <div className="user-profile-wrapper d-flex align-items-center justify-content-between gap-4 flex-wrap">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="user-profile-image">
                                            <img src={profileImage} />
                                        </div>
                                        <div className="user-profile-info">
                                            <h5 className="fs-18 mb-2">
                                                Jack ma
                                                <span className="i-badge pill success-soft ms-3">
                                                    Active
                                                </span>
                                            </h5>

                                            <p className="fs-14 d-flex align-items-center gap-2">
                                                <span className="text-muted d-flex align-items-center gap-2">
                                                    <LuMail /> Email :
                                                </span>
                                                hack@gmail.com
                                            </p>

                                            <p className="fs-14 d-flex align-items-center gap-2">
                                                <span className="text-muted d-flex align-items-center gap-2">
                                                    <LuPhone /> Phone :
                                                </span>
                                                0123456789
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        className="btn--info outline btn--md rounded-3"
                                        onClick={() =>
                                            openModal(
                                                modalUid,
                                                "EDIT",
                                                "Update User",
                                                "lg",
                                            )
                                        }
                                    >
                                        <LuPen className="fs-18" />
                                        {t(
                                            valueToKey("Edit Profile"),
                                            "Edit Profile"
                                        )}
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="col-lg-6">
                        <Card className="h-100">
                            <CardHeader cardTitle="Address" />
                            <CardBody>
                                <div className="row g-2">
                                    {Object.entries(address).map(
                                        ([key, value]) => (
                                            <div className="col-xl-6">
                                                <div className="py-2 px-3 bg--light border rounded-2">
                                                    <span className="fs-13 text-muted">
                                                        {keyToValue(key)}
                                                    </span>
                                                    <h6 className="mt-1 fs-14">
                                                        {value}
                                                    </h6>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="col-lg-6">
                        <Card className="h-100">
                            <CardHeader cardTitle="Security Settings" />
                            <CardBody>
                                <div className="row g-2">
                                    <div className="col-xl-6">
                                        <div className="py-2 px-3 bg--light border rounded-2 d-flex align-items-center gap-3">
                                            <LuShieldOff className="fs-20" />
                                            <div>
                                                <span className="fs-13 text-muted">
                                                    Two-Factor Authentication
                                                </span>
                                                <h6 className="mt-1 fs-14">
                                                    Disabled
                                                </h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                        <div className="py-2 px-3 bg--light border rounded-2 d-flex align-items-center gap-3">
                                            <LuEyeOff className="fs-20" />
                                            <div>
                                                <span className="fs-13 text-muted">
                                                    Online Status Visibility
                                                </span>
                                                <h6 className="mt-1 fs-14">
                                                    Hidden
                                                </h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                        <div className="py-2 px-3 bg--light border rounded-2 d-flex align-items-center gap-3">
                                            <LuClock className="fs-20" />
                                            <div>
                                                <span className="fs-13 text-muted">
                                                    Last Login
                                                </span>
                                                <h6 className="mt-1 fs-14">
                                                    3 days ago
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="col-12">
                        <Card>
                            <CardHeader cardTitle="Role & Permissions" />
                            <CardBody>
                                <div>
                                    <h6 className="fs-14 mb-3">
                                        Admin
                                        <span className="i-badge pill success-soft ms-3">
                                            Active
                                        </span>
                                    </h6>

                                    <div className="row g-3">
                                        {Object.entries(permissions).map(
                                            ([key, value], index) => (
                                                <div
                                                    key={index}
                                                    className="col-lg-6"
                                                >
                                                    <div className="py-2 px-3 border rounded-3 bg--light">
                                                        <p className="mb-2">
                                                            {keyToValue(key)}
                                                        </p>
                                                        <ul className="d-flex align-items-center gap-2">
                                                            {value?.map(
                                                                (
                                                                    permission,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="i-badge pill info-soft"
                                                                    >
                                                                        {keyToValue(
                                                                            permission
                                                                        )}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
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
                {modalConfig?.type === "EDIT" && (
                    <SaveUserModal
                        closeModal={closeModal}
                        modalConfig={modalConfig as ModalConfigType}
                    />
                )}
            </ModalWrapper>
        </>
    );
}

export default UserDetails