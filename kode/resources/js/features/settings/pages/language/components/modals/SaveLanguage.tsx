
import type React from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import Button from '../../../../../../components/common/button/Button'
import Field from '../../../../../../components/common/from/Field'
import type { FormSubmitEvent } from '../../../../../../utils/types'
import useStoreLanguage from '../../api/hooks/useStoreLanguage'
import type { Language } from '../../utils/type'

interface SaveLanguagePayload {
    name: string;
    lang_code: string;
    direction: string;
}

interface SaveLanguageProps {
    onHide: () => void;
    language?: Language;
    refetchFn?: () => void;
}

const SaveLanguage: React.FC<SaveLanguageProps> = ({ onHide, language, refetchFn }) => {
    const { t } = useTranslation();
    const { mutate: saveLanguageFn, isPending } = useStoreLanguage();

    const handleStoreLanguage = (e: FormSubmitEvent): void => {
        console.log("Form submission triggered"); // Debug log
        e.preventDefault();

        const formData = new FormData(e.target);

        const postData = Object.fromEntries(
            formData.entries()
        ) as unknown as SaveLanguagePayload;

        saveLanguageFn(postData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success("User create successfully!");
                    e.currentTarget.reset();
                    refetchFn();
                    onHide();
                }
            },
        });
    }
    
    return (
        <form onSubmit={handleStoreLanguage}>
            <div className='row g-3'>
                <div className="col-12">
                    <Field label="Name" required>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            placeholder="Enter language name"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="Code" required>
                        <input
                            type="text"
                            id="lang_code"
                            name='lang_code'
                            placeholder="Enter language code"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="Direction" required>
                        <select
                            className="form-select"
                            id="direction"
                            aria-label="Direction"
                            name="direction"
                            required
                            defaultValue={language?.direction}
                        >
                            <option>--{t("select_direction","Select direction")}--</option>
                            <option
                                value={'ltr'}
                            >
                                LTR
                            </option>

                            <option
                                value={'rtl'}
                            >
                                RTL
                            </option>

                        </select>
                    </Field>
                </div>
            </div>

            <div className="modal-custom-footer mt-4">
                <Button
                    className="i-btn btn--dark outline btn--lg rounded-3"
                    type="button"
                    onClick={onHide}
                >
                    {t("cancel","Cancel")}
                </Button>

                <Button
                    type="submit"
                    className="i-btn btn--primary btn--lg rounded-3"
                    isLoading={isPending}
                >
                    {t("save", "Save")}
                </Button>
            </div>
        </form>
    )
}

export default SaveLanguage