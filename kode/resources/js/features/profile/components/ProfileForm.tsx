import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { LuPlus, LuX } from 'react-icons/lu'
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

    const [customInputs, setCustomInputs] = useState([]);
    
    const handleImagesUpload = (uploadedImages) => {
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    };
    

    useEffect(() => {
        if (metaData && Object.keys(metaData).length > 0) {
            let formattedInputs = Object.entries(metaData).map(([name, value]) => ({
                id: Date.now() + Math.random(),
                name: name,
                value: value
            }));

            setCustomInputs(formattedInputs);
        }
    }, [metaData]); 
    

    const handleAddItem = () => {
        const newItem = { id: Date.now() + Math.random(), name: "", value: "" };
        setCustomInputs((prev) => [...prev, newItem]);
    };

    const handleRemoveItem = (id) => {
        setCustomInputs((prev) => prev.filter((item) => item.id !== id));
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

        const metaDataObj = {};

        customInputs.forEach((item) => {
            if (item.name && item.value) {
                metaDataObj[item.name] = item.value;
            }
        });

        if (Object.keys(metaDataObj).length > 0) {
            postData.metaData = [metaDataObj];
        }

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

                    <div className="info-block">
                        <div>
                            <div className="mb-2 d-flex justify-content-between align-items-center gap-3">
                                <h6 className="title--sm">
                                    {t("custom_information", "Custom Information")}
                                </h6>
                            
                                <Button
                                    iconBtn={true}
                                    tooltipText="Add custom information"
                                    icon={LuPlus}
                                    className="dark-soft hover btn-sm circle fs-18"
                                    onClick={handleAddItem}
                                    type="button"
                                />
                            </div>

                            <div className="row g-4">
                                {customInputs?.map((item, index) => (
                                    <div className="col-md-6" key={item.id}>
                                        <div className='d-flex align-items-center justify-content-between gap-3'>
                                            <div className="flex-grow-1">
                                                <Field label="Field Name">
                                                    <input
                                                        type="text"
                                                        placeholder="Field name"
                                                        value={item.name}
                                                        onChange={(e) => {
                                                            const newCustomInputs = [...customInputs];
                                                            newCustomInputs[index].name = e.target.value;
                                                            setCustomInputs(newCustomInputs);
                                                        }}
                                                        className="form-control mb-2"
                                                    />
                                                </Field>
                                                <Field label="Field Value">
                                                    <input
                                                        type="text"
                                                        placeholder="Field value"
                                                        value={item.value}
                                                        onChange={(e) => {
                                                            const newCustomInputs = [...customInputs];
                                                            newCustomInputs[index].value = e.target.value;
                                                            setCustomInputs(newCustomInputs);
                                                        }}
                                                        className="form-control"
                                                    />
                                                </Field>
                                            </div>

                                            <Button
                                                iconBtn={true}
                                                tooltipText="Remove"
                                                icon={LuX}
                                                className="danger-soft hover btn-sm circle fs-18 flex-shrink-0"
                                                onClick={() => handleRemoveItem(item.id)}
                                                type="button"
                                            />
                                        </div>
                                    </div>
                                ))}
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
    )
}

export default ProfileForm