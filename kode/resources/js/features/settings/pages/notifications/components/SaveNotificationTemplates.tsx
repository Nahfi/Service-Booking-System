import Button from "@/components/common/button/Button";
import Field from "@/components/common/from/Field";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { LuCopy } from "react-icons/lu";
import TinyEditor from "../../../../../components/common/text-editor/TinyEditor";
import { keyToValue, onCopy, valueToKey } from "../../../../../utils/helper";
import type { FormSubmitEvent } from "../../../../../utils/types";
import useUpdateNotificationTemplate from "../api/hooks/useUpdateNotificationTemplate";
import type { NotificationTemplate, SingleTemplateResponse } from "../utils/type";

interface SaveNotificationTemplatesProps {
    template?: NotificationTemplate;
    refetchFn: () => void;
  }

const SaveNotificationTemplates: React.FC<SaveNotificationTemplatesProps> = ({ template, refetchFn }) => {
    const { t } = useTranslation();

    const { mutate: templateUpdate, isPending } = useUpdateNotificationTemplate();

    const [editorContent, setEditorContent] = useState<string>('');

    useEffect(() => {
        setEditorContent(template?.mail_body || '');
    }, [template]);

    const handleEditorChange = (value: string ) => {
        setEditorContent(value);
    };

    const handleUpdateTemplate = (e: FormSubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData.entries());
        const postData = { ...inputs, mail_body: editorContent, id: template?.id };

        templateUpdate(postData, {
            onSuccess: (response: SingleTemplateResponse | null) => {
                toast.success("Template Update");
                refetchFn()
            }
        })
    };


    return (
        <form onSubmit={handleUpdateTemplate}>
            <div className="row g-4">
                <div className="col-12">
                    <div className="p-3 border rounded-4">
                        <h6 className="fs-16 mb-3">{t(valueToKey("Template Info"), "Template Info")}</h6>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <Field label="Template name">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter template name"
                                        className="form-control"
                                        defaultValue={template?.name}
                                        readOnly 
                                    />
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Subject">
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Enter template subject"
                                        className="form-control"
                                        defaultValue={template?.subject}
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="p-3 border rounded-4">
                        <h6 className="fs-16 mb-3">{t(valueToKey("Notifications setup"), "Notifications setup")}</h6>
                        <div className="row g-3">
                            {!template?.is_sms_disable &&
                                template?.sms_body && (
                                    <div className="col-md-6">
                                        <Field label="SMS Notification">
                                            <select
                                                name="sms_notification"
                                                id="sms_notification"
                                                className="form-select"
                                                defaultValue={template?.sms_notification}
                                            >
                                                <option value="active">
                                                    {t(valueToKey("Active"), "Active")}
                                                </option>
                                                <option value="inactive">
                                                    {t(valueToKey("Inactive"), "Inactive")}
                                                </option>
                                            </select>
                                        </Field>
                                    </div>
                                )}

                            {!template?.is_mail_disable &&
                                template?.mail_body && (
                                    <div className="col-md-6">
                                        <Field label="Email Notification">
                                            <select
                                                name="email_notification"
                                                id="email_notification"
                                                className="form-select"
                                                defaultValue={
                                                    template?.email_notification
                                                }
                                            >
                                                <option value="active">
                                                    {t(valueToKey("Active"), "Active")}
                                                </option>
                                                <option value="inactive">
                                                    {t(valueToKey("Inactive"), "Inactive")}
                                                </option>
                                            </select>
                                        </Field>
                                    </div>
                                )}

                            {!template?.is_real_time_disable &&
                                template?.push_notification_body && (
                                    <>
                                        <div className="col-md-6">
                                            <Field label="Push Notification">
                                                <select
                                                    name="push_notification"
                                                    id="push_notification"
                                                    className="form-select"
                                                    defaultValue={
                                                        template?.push_notification
                                                    }
                                                >
                                                    <option value="active">
                                                        {t(valueToKey("Active"), "Active")}
                                                    </option>
                                                    <option value="inactive">
                                                        {t(valueToKey("Inactive"), "Inactive")}
                                                    </option>
                                                </select>
                                            </Field>
                                        </div>

                                        <div className="col-md-6">
                                            <Field label="Site Notification">
                                                <select
                                                    name="site_notificaton"
                                                    id="site_notificaton"
                                                    className="form-select"
                                                    defaultValue={
                                                        template?.site_notificaton
                                                    }
                                                >
                                                    <option value="active">
                                                        {t(valueToKey("Active"), "Active")}
                                                    </option>
                                                    <option value="inactive">
                                                        {t(valueToKey("Inactive"), "Inactive")}
                                                    </option>
                                                </select>
                                            </Field>
                                        </div>
                                    </>
                                )}
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="p-3 border rounded-4">
                        <h6 className="fs-16 mb-3">{t(valueToKey("Template Key"), "Template Key")}</h6>

                        <ul className="ul-list">
                            {template?.template_key &&
                                Object.entries(template?.template_key).map(
                                    ([key, label]) => (
                                        <li className="py-2" key={key}>
                                            <div className="d-flex align-items-center gap-3 info-list-left copy-section">
                                                <b className="fs-14 d-flex align-items-center gap-3 copy-content">
                                                    {`{{${key}}}`}
                                                </b>

                                                <Button
                                                    iconBtn={true}
                                                    tooltipText="Copy"
                                                    icon={LuCopy}
                                                    type="button"
                                                    onClick={() => onCopy(key)}
                                                    className="info-soft btn-ghost hover btn-sm rounded-circle fs-18"
                                                />
                                            </div>

                                            <span className="fs-14">{t(key, keyToValue(key))}</span>
                                        </li>
                                    )
                                )}
                        </ul>
                    </div>
                </div>

                <div className="col-12">
                    <div className="p-3 border rounded-4">
                        <h6 className="fs-16 mb-3">{t(valueToKey("Template body"), "Template body")}</h6>
                        <div className="row g-3">
                            {!template?.is_sms_disable &&
                                template?.sms_body && (
                                    <div className="col-12">
                                        <Field label="SMS" required>
                                            <textarea
                                                id="sms_body"
                                                name="sms_body"
                                                rows="6"
                                                className="form-control"
                                                placeholder="Enter SMS body"
                                                defaultValue={template?.sms_body}
                                            ></textarea>
                                        </Field>
                                    </div>
                                )}

                            {!template?.is_real_time_disable &&
                                template?.push_notification_body && (
                                    <div className="col-12">
                                        <Field label="Push Notification" required>
                                            <textarea
                                                id="push_notification_body"
                                                name="push_notification_body"
                                                rows="6"
                                                className="form-control"
                                                placeholder="Enter notification body"
                                                defaultValue={
                                                    template?.push_notification_body
                                                }
                                            ></textarea>
                                        </Field>
                                    </div>
                                )}

                            {!template?.is_mail_disable &&
                                template?.mail_body && (
                                    <div className="col-12">
                                        <Field label="Email" required>
                                            <TinyEditor
                                                onHandleChange={handleEditorChange}
                                                defaultValue={editorContent}
                                            />
                                        </Field>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-end mt-4">
                <Button
                    type="submit"
                    className="i-btn btn--primary btn--lg rounded-3"
                    isLoading={isPending}
                >
                    {t(valueToKey("Save Template"), "Save Template")}
                </Button>
            </div>
        </form>
    );
}

export default SaveNotificationTemplates