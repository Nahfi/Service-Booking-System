import type React from "react";
import Button from "../../../../../../components/common/button/Button";
import Field from "../../../../../../components/common/from/Field";


const AddNote: React.FC = ({ onClose }) => {
    const { t } = useTranslation();
    return (
        <form action="">
            <Field label="Note" required>
                <textarea
                    name="note"
                    id="note"
                    placeholder='Enter note here'
                    className="form-control"
                    rows={6}
                    required
                ></textarea>
            </Field>

            <div className="modal-custom-footer mt-4">
                <Button
                    type="button"
                    className="btn--dark btn--lg outline rounded-3"
                    onClick={onClose}
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

export default AddNote