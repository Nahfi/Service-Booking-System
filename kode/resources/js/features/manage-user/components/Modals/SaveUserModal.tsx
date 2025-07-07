import Button from "@/components/common/button/Button";
import Field from "@/components/common/from/Field";
import type React from "react";
import { useTranslation } from "react-i18next";
import { valueToKey } from "../../../../utils/helper";
import type { FormSubmitEvent } from "../../../../utils/types";
import useSaveUser from "../../api/hooks/useSaveUser";
import type { ModalConfigType, RoleType } from "../../utils/type";
import { saveUser } from "../../utils/userController";

interface SaveUserModalProps {
    closeModal: () => void;
    modalConfig: ModalConfigType;
    refetchFn: () => void;
    roles: RoleType[];
    isTrash: boolean;
}

const SaveUserModal: React.FC<SaveUserModalProps> = ({
    closeModal,
    modalConfig,
    refetchFn,
    roles,
    isTrash = false
}) => {

    const { t } = useTranslation();
    const { mutate: saveUserFn, isPending } = useSaveUser();
    const user = modalConfig?.data;
    const address = user?.address?.[0] ?? {}

    const handleOnSubmit = (event: FormSubmitEvent): void => {
        saveUser(event, saveUserFn, refetchFn, closeModal)
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                <div
                    className={`info-block pt-0`}
                >
                    <div className="pb-3">
                        <h6 className="title--sm">
                            {t(
                                valueToKey("User Information"),
                                "User Information"
                            )}
                        </h6>
                    </div>

                    {user && user?.id && (
                        <input
                            type="hidden"
                            name="id"
                            defaultValue={user?.id}
                        />
                    )}

                    {isTrash && (
                        <input
                            type="hidden"
                            name="is_trash"
                            defaultValue={1}
                        />
                    )}

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
                                        valueToKey("Enter your phone"),
                                        "Enter your phone"
                                    )}
                                    defaultValue={user?.phone}
                                />
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="Choose Role" required>
                                <select
                                    className="form-select"
                                    id="role_id"
                                    aria-label="role"
                                    name="role_id"
                                    required
                                    defaultValue={user?.role?.id}
                                >
                                    <option value={""}>--Select role--</option>
                                    {roles?.length > 0 &&
                                        roles?.map((role) => (
                                            <option
                                                value={role?.value}
                                                key={role?.value}
                                            >
                                                {role?.label}
                                            </option>
                                        ))}
                                </select>
                            </Field>
                        </div>
                    </div>
                </div>

                <div className="info-block">
                    <div>
                        <div className="pb-3">
                            <h6 className="title--sm">
                                {t(
                                    valueToKey(" Address Information"),
                                    " Address Information"
                                )}
                            </h6>
                        </div>

                        <div className="row g-3">
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
                                            valueToKey("Enter your city"),
                                            "Enter your city"
                                        )}
                                        defaultValue={address?.city}
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
                                        defaultValue={
                                            address?.postal_code
                                        }
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-block border-0 pb-0">
                    <div>
                        <div className="pb-3">
                            <h6 className="title--sm">
                                {t(
                                    valueToKey(" Password"),
                                    "Password"
                                )}
                            </h6>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <Field label="New password">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder={t(
                                            valueToKey("Enter your password"),
                                            "Enter your password"
                                        )}
                                    />
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Confirm New Password" required>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        className="form-control"
                                        placeholder={t(
                                            valueToKey(
                                                "Enter your confirmation password"
                                            ),
                                            "Enter your confirmation password"
                                        )}
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                </div>
        
            </div>

            <div className="modal-custom-footer mt-4">
                <Button
                    type="button"
                    className="btn--dark btn--lg outline rounded-3"
                    onClick={closeModal}
                >
                    {t(valueToKey("Cancel"), "Cancel")}
                </Button>

                <Button
                    type="submit"
                    className="btn--primary btn--lg rounded-3"
                    isLoading={isPending}
                >
                    {t(valueToKey("Submit"), "Submit")}
                </Button>
            </div>
        </form>
    );
};

export default SaveUserModal