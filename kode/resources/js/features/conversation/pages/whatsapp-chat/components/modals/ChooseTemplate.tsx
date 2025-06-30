

import type React from "react";
import { useTranslation } from "react-i18next";
import { LuLayoutTemplate } from "react-icons/lu";
import Button from "../../../../../../components/common/button/Button";
import Field from "../../../../../../components/common/from/Field";
import SelectBox from "../../../../../../components/common/from/SelectBox";
import { valueToKey } from "../../../../../../utils/helper";

const options = [
    { value: "template-1", label: "Template-1" },
    { value: "template-2", label: "Template-2" },
    { value: "template-3", label: "Template-3" },
    { value: "template-4", label: "Template-4" },
];

const ChooseTemplate: React.FC = ({ onHide }) => {
    const { t } = useTranslation();
    return (
        <form action="">
            <div>
                <Field label={"Choose Audience"}>
                    <SelectBox
                        options={options}
                        icon={<LuLayoutTemplate />}
                        name="multiUser"
                        placeholder={"Choose Template"}
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
                    onClick={onHide}
                >
                    {t(valueToKey("Send"), "Send")}
                </Button>
            </div>
        </form>
    );
};

export default ChooseTemplate;