import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import Button from '../../../components/common/button/Button'
import Card from '../../../components/common/card/Card'
import CardBody from '../../../components/common/card/CardBody'
import CardHeader from '../../../components/common/card/CardHeader'
import Field from '../../../components/common/from/Field'
import FileUploader, { type UploadedFile } from '../../../components/common/from/FileUploader'
import { setUser } from '../../../redux/slices/userSlice'
import { valueToKey } from '../../../utils/helper'
import useUpdateProfile from '../api/hooks/useUpdateProfile'

const ProfileForm: React.FC = ({ user }) => {
    
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [images, setImages] = useState<UploadedFile[]>([]);
    const { mutate: profileUpdateFn, isPending } = useUpdateProfile();

    const address = user?.address?.[0] ?? {}
    const metaData = user?.metaData?.[0] ?? {}
    
    const handleImagesUpload = (uploadedImages) => {
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    };
    

    const handleSaveProfile = (e: FormSubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const addressData = [
            {
                country: formData.get("country") as string,
                city: formData.get("city") as string,
                full_address: formData.get("full_address") as string,
                postal_code: formData.get("postal_code") as string,
            },
        ];

        formData.delete("country");
        formData.delete("city");
        formData.delete("full_address");
        formData.delete("postal_code");

        formData.delete('image');

        if (images.length > 0 && images[0].file) {
            const imageFile = images[0].file;
            formData.append('image', imageFile);
        }
        const postData = Object.fromEntries(
            formData.entries()
        );

        postData.address = addressData;

        profileUpdateFn(postData, {
            onSuccess: (response) => {
                if (response && response?.code === 200) {
                    toast.success("Profile saved successfully!");
                    dispatch(setUser(response?.data));
                    setImages([]);
                }
            },
        });
    }


  return (
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
                                    <FileUploader
                                        defaultFiles={
                                            user?.img_url
                                                ? [user.img_url]
                                                : []
                                        }
                                        uploadText="Select a file or drag and drop here"
                                        maxFile="JPG or PNG, file size no more than 5MB"
                                        onUpload={
                                            handleImagesUpload
                                        }
                                        accept="image/*"
                                        multiple={false}
                                        name="image"
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>

                    <div className="info-block">
                        <div>
                            <div className="mb-2">
                                <h6 className="title--sm">
                                    {t("address_information", "Address Information")}
                                </h6>
                            </div>

                            <div className="row g-4">
                                <div className="col-md-6">
                                    <Field label="Country">
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            className="form-control"
                                            placeholder={t(
                                                valueToKey(
                                                    "Enter your country"
                                                ),
                                                "Enter your country"
                                            )}
                                            defaultValue={
                                                address?.country
                                            }
                                        />
                                    </Field>
                                </div>

                                <div className="col-md-6">
                                    <Field label="City">
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="form-control"
                                            placeholder={t(
                                                valueToKey(
                                                    "Enter your city"
                                                ),
                                                "Enter your city"
                                            )}
                                            defaultValue={
                                                address?.city
                                            }
                                        />
                                    </Field>
                                </div>

                                <div className="col-md-6">
                                    <Field label="Full Address">
                                        <input
                                            type="text"
                                            id="full_address"
                                            name="full_address"
                                            className="form-control"
                                            placeholder={t(
                                                valueToKey(
                                                    "Enter your full address"
                                                ),
                                                "Enter your full address"
                                            )}
                                            defaultValue={
                                                address?.full_address
                                            }
                                        />
                                    </Field>
                                </div>

                                <div className="col-md-6">
                                    <Field label="Postal Code">
                                        <input
                                            type="text"
                                            id="postal_code"
                                            name="postal_code"
                                            className="form-control"
                                            placeholder={t(
                                                valueToKey(
                                                    "Enter your postal code"
                                                ),
                                                "Enter your postal code"
                                            )}
                                            defaultValue={address?.postal_code
                                            }
                                        />
                                    </Field>
                                </div>
                            </div>
                        </div>
                    </div>

                    {(metaData && !metaData === null) && (
                        <div className="info-block">
                            <div>
                                <div className="mb-2">
                                    <h6 className="title--sm">
                                        {t("Custom Information", "Custom Information")}
                                    </h6>
                                </div>

                                <div className="row g-4">
                                    {Object.entries(metaData).map(([key, value]) => (
                                        <div className="col-md-6" key={key}>
                                            <Field label={keyToValue(key)}>
                                                <input
                                                    type="text"
                                                    id={key}
                                                    name={`meta_data[${key}]`}
                                                    className="form-control"
                                                    defaultValue={value}
                                                />
                                            </Field>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    )}

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
    )
}

export default ProfileForm