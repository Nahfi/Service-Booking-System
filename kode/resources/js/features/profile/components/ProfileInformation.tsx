
import type React from "react";
import { useState } from "react";
import { CardBody } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch } from "react-redux";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import CardHeader from "../../../components/common/card/CardHeader";
import Field from "../../../components/common/from/Field";
import ImageUpload, { type UploadedFile } from "../../../components/common/from/ImageUpload";
import ModalWrapper, { DeleteModal } from "../../../components/common/modal";
import { useModal } from "../../../context";
import { setUser } from "../../../redux/slices/userSlice";
import { valueToKey } from "../../../utils/helper";
import type { ModalContextType } from "../../../utils/types";
import useUpdateProfile from "../api/hooks/useUpdateProfile";
import useUserOnlineStatus from "../api/hooks/useUserOnlineStatus";

const ProfileInformation: React.FC = ({ user }) => {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const  modalUid = "profileInfoModal"

    const [images, setImages] = useState<UploadedFile[]>([]);

    const handleImagesUpload = (uploadedImages) => {
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    };

    const { mutate: profileUpdate, isPending } = useUpdateProfile();

    const { mutate: updateOnlineStatusFn, isPending: isOnlineStatusPending } =useUserOnlineStatus();
    
    const handleSaveProfile = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        profileUpdate(formData, {
            onSuccess: (response) => {
                if (response) {
                    dispatch(setUser(response.data));
                    toast.success("Profile saved successfully!");
                }
            },
        });
    }



    const handleUpdateOnlineStatus = () => {

        const postData = {
            id: user?.id,
            value: user?.status === "active" ? "inactive" : "active",
        };

        updateOnlineStatusFn(postData, {
            onSuccess: (response) => {
                if (response) {
                    const updatedUser = {
                        ...user,
                        status: user?.status === "active" ? "inactive" : "active",
                    };
                    dispatch(setUser(updatedUser));
                    toast.success("Update online status");
                }
            }
        });
    }

    return (
        <>
            <div className="row g-4">
                <div className="col-lg-8">
                    <Card>
                        <CardHeader cardTitle="Profile Information" />
                        <CardBody>
                            <form onSubmit={handleSaveProfile}>
                                <input
                                    type="hidden"
                                    name="userId"
                                    defaultValue={user?.id}
                                />

                                <div className="info-block pt-0">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <Field label="Name" required>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Enter your name"
                                                    defaultValue={user?.name}
                                                    required
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
                                                    placeholder="Enter your email"
                                                    defaultValue={user?.email}
                                                    required
                                                />
                                            </Field>
                                        </div>

                                        <div className="col-md-6">
                                            <Field label="Phone">
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder={t(
                                                        valueToKey(
                                                            "Enter your phone"
                                                        ),
                                                        "Enter your phone"
                                                    )}
                                                    defaultValue={user?.phone}
                                                />
                                            </Field>
                                        </div>

                                        <div className="col-12">
                                            <Field
                                                label="Profile photo"
                                                htmlFor={"profile_photo"}
                                            >
                                                <ImageUpload
                                                    defaultFiles={
                                                        user?.img_url
                                                            ? [user.img_url]
                                                            : []
                                                    }
                                                    uploadText="Select a file or drag and drop here"
                                                    maxFile="JPG, PNG or PDF, file size no more than 10MB"
                                                    onUpload={
                                                        handleImagesUpload
                                                    }
                                                    accept="image/*"
                                                    multiple={false}
                                                />
                                            </Field>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-block">
                                    <div>
                                        <div className="mb-2">
                                            <h6 className="title--sm">
                                                Address Information
                                            </h6>
                                        </div>

                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <Field label="Country">
                                                    <input
                                                        type="text"
                                                        id="country"
                                                        name="address[country]"
                                                        className="form-control"
                                                        placeholder={t(
                                                            valueToKey(
                                                                "Enter your country"
                                                            ),
                                                            "Enter your country"
                                                        )}
                                                        defaultValue={
                                                            user?.address
                                                                ?.country
                                                        }
                                                    />

                                                    {/* <SelectBox
                                            options={countries}
                                            name="country"
                                            id="country"
                                            className="w-full"
                                            defaultValue={
                                                user?.address?.country
                                                    ? {
                                                            value:
                                                                user?.address
                                                                    ?.country || "",
                                                            label:
                                                                user?.address
                                                                    ?.country || "",
                                                        }
                                                    : null
                                            }
                                            required
                                        /> */}
                                                </Field>
                                            </div>

                                            <div className="col-md-6">
                                                <Field label="City">
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        name="address[city]"
                                                        className="form-control"
                                                        placeholder={t(
                                                            valueToKey(
                                                                "Enter your city"
                                                            ),
                                                            "Enter your city"
                                                        )}
                                                        defaultValue={
                                                            user?.address?.city
                                                        }
                                                    />
                                                </Field>
                                            </div>

                                            <div className="col-md-6">
                                                <Field label="Full Address">
                                                    <input
                                                        type="text"
                                                        id="full_address"
                                                        name="address[full_address]"
                                                        className="form-control"
                                                        placeholder={t(
                                                            valueToKey(
                                                                "Enter your full address"
                                                            ),
                                                            "Enter your full address"
                                                        )}
                                                        defaultValue={
                                                            user?.address
                                                                ?.full_address
                                                        }
                                                    />
                                                </Field>
                                            </div>

                                            <div className="col-md-6">
                                                <Field label="Postal Code">
                                                    <input
                                                        type="text"
                                                        id="postal_code"
                                                        name="address[postal_code]"
                                                        className="form-control"
                                                        placeholder={t(
                                                            valueToKey(
                                                                "Enter your postal code"
                                                            ),
                                                            "Enter your postal code"
                                                        )}
                                                        defaultValue={
                                                            user?.address
                                                                ?.postal_code
                                                        }
                                                    />
                                                </Field>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-end mt-4">
                                    <Button
                                        type="submit"
                                        isLoading={isPending}
                                        className="btn--primary btn--lg"
                                    >
                                        {t(
                                            valueToKey(`Update profile`),
                                            `Update profile`
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-lg-4">
                    <Card>
                        <CardHeader
                            cardTitle="Visibility Settings"
                            description="Control how others see your online presence"
                        />
                        <CardBody>
                            <div className="d-flex align-items-center justify-content-between gap-4 flex-wrap p-3 bg--light rounded-3">
                                <div>
                                    <h6 className="fs-14 mb-1">
                                        {t(
                                            valueToKey(`Show Online Status`),
                                            `Show Online Status`
                                        )}
                                    </h6>
                                    <p className="fs-13 text-muted">
                                        {t(
                                            valueToKey(
                                                `Let others know when you're available`
                                            ),
                                            `Let others know when you're available`
                                        )}
                                    </p>
                                </div>

                                <span className="form-check form-switch me-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        disabled={isOnlineStatusPending}
                                        checked={
                                            user?.status === "active"
                                                ? false
                                                : true
                                        }
                                        onChange={handleUpdateOnlineStatus}
                                    />
                                </span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="mt-4">
                        <CardHeader
                            cardTitle="Danger Zone"
                            description="These actions cannot be undone please proceed with caution."
                        />
                        <CardBody>
                            <div className="d-flex align-items-center justify-content-between gap-4 flex-wrap p-3 fade alert alert-danger show rounded-3 mb-0">
                                <div>
                                    <h6 className="fs-14 mb-1">
                                        {t(
                                            valueToKey(
                                                `Delete Account Permanently`
                                            ),
                                            `Delete Account Permanently`
                                        )}
                                        ?
                                    </h6>

                                    <p className="fs-13 text-muted">
                                        {t(
                                            valueToKey(
                                                `Permanently remove your account and all data`
                                            ),
                                            `Permanently remove your account and all data`
                                        )}
                                    </p>
                                </div>

                                <Button
                                    className="btn--danger btn--md rounded-3 flex-shrink-0"
                                    onClick={() =>
                                        openModal(
                                        modalUid,
                                        "PROFILE_DELETE",
                                        "",
                                        "md"
                                    )}
                                >
                                    <LuTrash2 />
                                    {t(
                                        valueToKey(`Delete Account`),
                                        `Delete Account`
                                    )}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
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
                    {modalConfig?.type === "PROFILE_DELETE" && (
                        <DeleteModal onHide={closeModal}/>
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default ProfileInformation;
