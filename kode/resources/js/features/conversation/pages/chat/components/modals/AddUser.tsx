import type React from "react";
import { useTranslation } from "react-i18next";
import { LuUserPlus } from "react-icons/lu";
import Button from "../../../../../../components/common/button/Button";
import Field from "../../../../../../components/common/from/Field";
import SelectBox from "../../../../../../components/common/from/SelectBox";
import { valueToKey } from "../../../../../../utils/helper";


const options = [
    { value: "emma", label: "Emma" },
    { value: "liam", label: "Liam" },
    { value: "olivia", label: "Olivia" },
];

const AddUser: React.FC = ({ onHide }) => {
    const { t } = useTranslation();
    return (
        <form action="">
            <div>
                <Field label={"Choose Audience"}>
                    <SelectBox
                        options={options}
                        icon={<LuUserPlus />}
                        name="multiUser"
                        placeholder={"Add Audience"}
                    />
                </Field>
            </div>

            <div className="modal-custom-footer mt-4">
                <Button
                    type="button"
                    className="btn--dark btn--lg outline rounded-3"
                    onClick={onHide}
                >
                    {t(valueToKey("Cancel"), "Cancel")}
                </Button>

                <Button
                    type="submit"
                    className="btn--primary btn--lg rounded-3"
                >
                    {t(valueToKey("Submit"), "Submit")}
                </Button>
            </div>
        </form>
    );
};

export default AddUser