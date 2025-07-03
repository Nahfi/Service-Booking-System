

import type React from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LuLayoutTemplate } from "react-icons/lu";
import Button from "../../../../../../components/common/button/Button";
import Field from "../../../../../../components/common/from/Field";
import FileUploader from "../../../../../../components/common/from/FileUploader";
import SelectBox from "../../../../../../components/common/from/SelectBox";
import { valueToKey } from "../../../../../../utils/helper";

// -------------------------
// Types
// -------------------------

type TemplateOption = {
    label: string;
    value: string;
};

type ChooseTemplateProps = {
    onHide: () => void;
};

// -------------------------
// Constants
// -------------------------

const options: TemplateOption[] = [
    { value: "template-1", label: "Template-1" },
    { value: "template-2", label: "Template-2" },
    { value: "template-3", label: "Template-3" },
    { value: "template-4", label: "Template-4" },
];
  

const ChooseTemplate: React.FC<ChooseTemplateProps> = ({ onHide, onTemplateSubmit }) => {
    const { t } = useTranslation();

    
    const [template, setTemplate] = useState<TemplateOption | null>(null);



    return (
        <form onSubmit={onTemplateSubmit}>
            <div>
                <div className="mb-3">
                    <Field label={"Choose Template"}>
                        <SelectBox
                            options={options}
                            icon={<LuLayoutTemplate />}
                            name="template"
                            placeholder={"Choose Template"}
                            onChange={(selected: TemplateOption) => setTemplate(selected)}
                        />
                    </Field>
                </div>

                {template ? (
                    <div className="bg--light fade-in p-3 rounded-3">
                        <h6 className="mb-3">{template.label}</h6>

                        <div className="d-flex flex-column gap-3">
                            <div className="p-3 border rounded-3 bg-white">
                                <div className="mb-3">
                                    <h6 className="fs-14">Header Variables</h6>
                                </div>

                                <FileUploader
                                    maxFile="3MB"
                                />

                                <p className="fs-13 mt-1">
                                    Only support extension of{" "}
                                    <span className="text-info">.jpg</span>,
                                    <span className="text-info">.png</span>
                                </p>
                            </div>

                            <div className="p-3 border rounded-3 bg-white">
                                <div className="mb-3">
                                    <h6 className="fs-14">Body Variables</h6>
                                </div>

                                <div className="d-flex align-items-center flex-column gap-3">
                                    <div className="d-flex align-items-center gap-3 w-100">
                                        <span className="flex-shrink-0">{`{{ 1}}`}</span>
                                        <div className="flex-grow-1">
                                            <Field>
                                                <div className="input-group overflow-hidden border rounded-3">
                                                    <span
                                                        className="input-group-text border-0 py-0 px-1"
                                                        id="apiUrl"
                                                    >
                                                        <select
                                                            name="custom_api_method"
                                                            id="apiMethod"
                                                            className="form-select input-group-select h-40"
                                                        >
                                                            <option value="static">Static</option>
                                                            <option value="dynamic">Dynamic</option>
                                                        </select>
                                                    </span>

                                                    <input
                                                        type="text"
                                                        name="variable"
                                                        className="form-control h-40 border-0"
                                                        placeholder="Enter variable value"
                                                    />
                                                </div>
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center gap-3 w-100">
                                        <span className="flex-shrink-0">{`{{ 1}}`}</span>
                                        <div className="flex-grow-1">
                                            <Field>
                                                <div className="input-group overflow-hidden border rounded-3">
                                                    <span
                                                        className="input-group-text border-0 py-0 px-1"
                                                        id="apiUrl"
                                                    >
                                                        <select
                                                            name="custom_api_method"
                                                            id="apiMethod"
                                                            className="form-select input-group-select h-40"
                                                        >
                                                            <option value="static">Static</option>
                                                            <option value="dynamic">Dynamic</option>
                                                        </select>
                                                    </span>

                                                    <input
                                                        type="text"
                                                        name="variable"
                                                        className="form-control h-40 border-0"
                                                        placeholder="Enter variable value"
                                                    />
                                                </div>
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 border rounded-3 bg-white">
                                <div className="mb-3">
                                    <h6 className="fs-14">Button Variables</h6>
                                </div>

                                <div className="d-flex align-items-center flex-column gap-3">
                                    <div className="w-100">
                                        <Field label="Replay">
                                            <div className="input-group overflow-hidden border rounded-3">
                                                <span
                                                    className="input-group-text border-0 py-0 px-1"
                                                    id="apiUrl"
                                                >
                                                    <select
                                                        name="custom_api_method"
                                                        id="apiMethod"
                                                        className="form-select input-group-select h-40"
                                                    >
                                                        <option value="static">Static</option>
                                                        <option value="dynamic">Dynamic</option>
                                                    </select>
                                                </span>

                                                <input
                                                    type="text"
                                                    name="variable"
                                                    className="form-control h-40 border-0"
                                                    placeholder="Enter variable value"
                                                />
                                            </div>
                                        </Field>
                                    </div>

                                    <div className="w-100">
                                        <Field label="Copy offer code">
                                            <div className="input-group overflow-hidden border rounded-3">
                                                <span
                                                    className="input-group-text border-0 py-0 px-1"
                                                    id="apiUrl"
                                                >
                                                    <select
                                                        name="custom_api_method"
                                                        id="apiMethod"
                                                        className="form-select input-group-select h-40"
                                                    >
                                                        <option value="static">Static</option>
                                                        <option value="dynamic">Dynamic</option>
                                                    </select>
                                                </span>

                                                <input
                                                    type="text"
                                                    name="variable"
                                                    className="form-control h-40 border-0"
                                                    placeholder="Enter variable value"
                                                />
                                            </div>
                                        </Field>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Alert variant="warning" className="mb-0">
                        <Alert.Heading as={"h6"} className="fs-14">
                            24-Hour Messaging Policy
                        </Alert.Heading>
                        <p className="mt-2 fs-14">
                            WhatsApp restricts message sending to within 24 hours of a user's last reply. To continue the conversation after this window, you must use an approved message template.
                        </p>
                    </Alert>)}
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
                    {t(valueToKey("Send Template"), "Send Template")}
                </Button>
            </div>
        </form>
    );
};

export default ChooseTemplate;