import Button from "@/components/common/button/Button";
import Field from "@/components/common/from/Field";
import type React from "react";
import { useTranslation } from "react-i18next";
import { valueToKey } from "../../../utils/helper";
import useGetRoles from "../../role-permission/api/hooks/useGetRoles";

interface SaveUserModalProps {
    closeModal: () => void;
    modalConfig: {};
}

const SaveUserModal: React.FC<SaveUserModalProps> = ({
    closeModal,
    modalConfig = {},
}) => {
    const { t } = useTranslation();

    const { data } = useGetRoles();
    const roles = data?.data || null;

    const user = modalConfig?.data;

    return (
        <form>
            <div>
                <div
                    className={`${
                        modalConfig?.type === "CREATE" ? "info-block pt-0" : ""
                    } `}
                >
                    <div className="pb-3">
                        <h6 className="title--sm">
                            {t(
                                valueToKey("User Information"),
                                "User Information"
                            )}
                        </h6>
                    </div>

                    {!modalConfig?.type === "CREATE" && (
                        <input type="hidden" name="id" defaultValue={user?.id}/>
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
                            <Field label="Choose Role">
                                <select
                                    className="form-select"
                                    id="role_id"
                                    aria-label="role"
                                    name="role_id"
                                >
                                    <option>--Select role--</option>
                                    {roles?.length > 0 &&
                                        roles?.map((role) => (
                                            <option value={role?.id}>
                                                {role?.name}
                                            </option>
                                        ))}
                                </select>
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="New password" required>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder={t(
                                        valueToKey(
                                            "Enter your password"
                                        ),
                                        "Enter your password"
                                    )}
                                    required={modalConfig?.type === "CREATE"}
                                />
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field
                                label="Confirm New Password"
                                required
                            >
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
                                    required={modalConfig?.type === "CREATE"}
                                />
                            </Field>
                        </div>
                    </div>
                </div>

                {modalConfig?.type === "CREATE" && (
                    <div className="info-block border-0 pb-0">
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
                                            name="address[country]"
                                            className="form-control"
                                            placeholder={t(
                                                valueToKey(
                                                    "Enter your country"
                                                ),
                                                "Enter your country"
                                            )}
                                            defaultValue={
                                                user?.address?.country
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
                                                valueToKey("Enter your city"),
                                                "Enter your city"
                                            )}
                                            defaultValue={user?.address?.city}
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
                                                user?.address?.full_address
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
                                                user?.address?.postal_code
                                            }
                                        />
                                    </Field>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="modal-custom-footer mt-4">
                <Button
                    type="button"
                    className="btn--dark btn--lg outline rounded-3"
                    onClick={closeModal}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    className="btn--primary btn--lg rounded-3"
                >
                    Save
                </Button>
            </div>
        </form >
    );
};

export default SaveUserModal