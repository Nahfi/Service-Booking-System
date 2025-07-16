import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuLayoutTemplate } from "react-icons/lu";
import Button from "../../../../../../components/common/button/Button";
import Field from "../../../../../../components/common/from/Field";
import FileUploader from "../../../../../../components/common/from/FileUploader";
import SelectBox from "../../../../../../components/common/from/SelectBox";
import { whatsappTemplates } from "../../../../../../utils/data";
import MessagePreview from "../../../../../campaign/components/campaign/MessagePreview";

// -------------------------
// Types
// -------------------------

type TemplateOption = {
    label: string;
    value: string;
};

type TemplateVariable = {
    name: string;
    type: string; // "text" | "media" | "url" | "copy_code"
    required: boolean;
    description: string;
};

type Template = {
    id: string;
    name: string;
    category: string;
    language: string;
    template_data: {
        components: Array<{
            type: "HEADER" | "BODY" | "FOOTER" | "BUTTONS";
            format?: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT";
            text?: string;
            example?: { header_text?: string[]; body_text?: string[][] };
            buttons?: Array<{
                type: "QUICK_REPLY" | "URL" | "COPY_CODE";
                text: string;
                url?: string;
                example?: string[];
            }>;
        }>;
    };
};

type VariableValues = {
    [key: string]: string | File;
};

type ChooseTemplateProps = {
    onHide: () => void;
    onTemplateSubmit: (template: Template, values: VariableValues) => void;
};

// -------------------------
// Component
// -------------------------

const ChooseTemplate: React.FC<ChooseTemplateProps> = ({ onHide, onTemplateSubmit }) => {
    const { t } = useTranslation();
    const templates: Template[] = whatsappTemplates;
    console.log("whatsappTemplates:", whatsappTemplates);

    const options: TemplateOption[] = templates.map((template) => ({
        label: template.name,
        value: template.id,
    }));

    const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption | null>(null);
    const [variableValues, setVariableValues] = useState<VariableValues>({});


    const template = selectedTemplate
        ? templates.find((temp) => temp.id === selectedTemplate.value)
        : null;


    // Extract variables from template components
    const getVariables = (template: Template | null): {
        header: TemplateVariable[];
        body: TemplateVariable[];
        button: TemplateVariable[];
    } => {
        if (!template) {
            return { header: [], body: [], button: [] };
        }

        const header: TemplateVariable[] = [];
        const body: TemplateVariable[] = [];
        const button: TemplateVariable[] = [];

        template.template_data.components.forEach((component) => {
            if (component.type === "HEADER") {
                if (component.format === "TEXT" && component.example?.header_text) {
                    component.example.header_text.forEach((_, index) => {
                        header.push({
                            name: `header_${index + 1}`,
                            type: "text",
                            required: true,
                            description: `Header variable ${index + 1}`,
                        });
                    });
                } else if (["IMAGE", "VIDEO", "DOCUMENT"].includes(component.format || "")) {
                    header.push({
                        name: `header_media`,
                        type: "media",
                        required: true,
                        description: `Header ${component.format?.toLowerCase()}`,
                    });
                }
            } else if (component.type === "BODY") {
                const placeholderCount = (component.text?.match(/\{\{\d+\}\}/g) || []).length;
                const bodyExamples = component.example?.body_text?.[0] || [];
                for (let i = 0; i < placeholderCount; i++) {
                    body.push({
                        name: `body_${i + 1}`,
                        type: "text",
                        required: true,
                        description: `Body variable ${i + 1}${bodyExamples[i] ? ` (e.g., ${bodyExamples[i]})` : ""}`,
                    });
                }
            } else if (component.type === "BUTTONS") {
                component.buttons?.forEach((btn, index) => {
                    if (["URL", "COPY_CODE"].includes(btn.type) && btn.example) {
                        button.push({
                            name: `button_${btn.type.toLowerCase()}_${index + 1}`,
                            type: btn.type === "URL" ? "url" : "copy_code",
                            required: true,
                            description: `${btn.type === "URL" ? "URL" : "Copy code"} for button "${btn.text}"`,
                        });
                    }
                });
            }
        });

        return { header, body, button };
    };

    const variables = getVariables(template);

    const handleVariableChange = (name: string, value: string | File) => {
        setVariableValues((prev) => {
            const newValues = { ...prev, [name]: value };
            console.log("Updated variableValues:", newValues);
            return newValues;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (template) {
            onTemplateSubmit(template, variableValues);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="mb-4">
                    <Field label={t("Choose Template")}>
                        <SelectBox
                            options={options}
                            icon={<LuLayoutTemplate />}
                            name="template"
                            placeholder={t("Choose Template")}
                            onChange={(selected: TemplateOption) => {
                                setSelectedTemplate(selected);
                                setVariableValues({});
                            }}
                        />
                    </Field>
                </div>

                {template && (
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="bg-light fade-in p-3 rounded-3">
                                <h6 className="mb-3">{template.name}</h6>

                                {(variables.header.length > 0 || variables.body.length > 0 || variables.button.length > 0) ? (
                                    <div className="d-flex flex-column gap-3">
                                        {/* Header Variables */}
                                        {variables.header.length > 0 && (
                                            <div className="p-3 border rounded-3 bg-white">
                                                <h6 className="fs-14 mb-3">{t("Header Variables")}</h6>
                                                {variables.header.map((variable) => (
                                                    <div key={variable.name} className="mb-3">
                                                        {variable.type === "media" ? (
                                                            <FileUploader
                                                                maxFile="3MB"
                                                                onChange={(file: File) =>
                                                                    handleVariableChange(variable.name, file)
                                                                }
                                                            />
                                                        ) : (
                                                            <Field label={variable.description}>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder={t("Enter variable value")}
                                                                    value={(variableValues[variable.name] as string) || ""}
                                                                    onChange={(e) =>
                                                                        handleVariableChange(variable.name, e.target.value)
                                                                    }
                                                                />
                                                            </Field>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Body Variables */}
                                        {variables.body.length > 0 && (
                                            <div className="p-3 border rounded-3 bg-white">
                                                <h6 className="fs-14 mb-3">{t("Body Variables")}</h6>
                                                {variables.body.map((variable, index) => (
                                                    <div key={variable.name} className="d-flex align-items-center gap-3 mb-3">
                                                        <span className="flex-shrink-0">{`{{${index + 1}}}`}</span>
                                                        <div className="flex-grow-1">
                                                            <Field>
                                                                <div className="input-group overflow-hidden border rounded-3">
                                                                    <span className="input-group-text border-0 py-0 px-1">
                                                                        <select
                                                                            name={`${variable.name}_method`}
                                                                            className="form-select input-group-select h-40"
                                                                        >
                                                                            <option value="static">Static</option>
                                                                            <option value="dynamic">Dynamic</option>
                                                                        </select>
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        name={variable.name}
                                                                        className="form-control h-40 border-0"
                                                                        placeholder={t("Enter variable value")}
                                                                        value={(variableValues[variable.name] as string) || ""}
                                                                        onChange={(e) =>
                                                                            handleVariableChange(variable.name, e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                            </Field>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Button Variables */}
                                        {variables.button.length > 0 && (
                                            <div className="p-3 border rounded-3 bg-white">
                                                <h6 className="fs-14 mb-3">{t("Button Variables")}</h6>
                                                {variables.button.map((variable) => (
                                                    <div key={variable.name} className="mb-3">
                                                        <Field label={variable.description}>
                                                            <div className="input-group overflow-hidden border rounded-3">
                                                                <span className="input-group-text border-0 py-0 px-1">
                                                                    <select
                                                                        name={`${variable.name}_method`}
                                                                        className="form-select input-group-select h-40"
                                                                    >
                                                                        <option value="static">Static</option>
                                                                        <option value="dynamic">Dynamic</option>
                                                                    </select>
                                                                </span>
                                                                <input
                                                                    type={variable.type === "url" ? "url" : "text"}
                                                                    name={variable.name}
                                                                    className="form-control h-40 border-0"
                                                                    placeholder={t(`Enter ${variable.type === "url" ? "URL" : "code"}`)}
                                                                    value={(variableValues[variable.name] as string) || ""}
                                                                    onChange={(e) =>
                                                                        handleVariableChange(variable.name, e.target.value)
                                                                    }
                                                                />
                                                            </div>
                                                        </Field>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-muted">{t("No variables for this template")}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <MessagePreview type="whatsapp" template={template} variables={variableValues} whatsapp />
                        </div>
                    </div>
                )}
            </div>

            <div className="modal-custom-footer mt-4">
                <Button type="button" className="btn--dark btn--lg outline rounded-3" onClick={onHide}>
                    {t("Cancel")}
                </Button>
                <Button type="submit" className="btn--primary btn--lg rounded-3">
                    {t("Send Template")}
                </Button>
            </div>
        </form>
    );
};

export default ChooseTemplate;