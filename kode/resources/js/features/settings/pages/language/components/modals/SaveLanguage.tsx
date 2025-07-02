
import type React from 'react'
import Button from '../../../../../../components/common/button/Button'
import Field from '../../../../../../components/common/from/Field'

const SaveLanguage: React.FC = ({ onHide }) => {
    return (
        <form action="#">
            <div>
                <Field label={"Name"}>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter language name"
                        className="form-control"
                    />
                </Field>
            </div>

            <div className="modal-custom-footer mt-4">
                <Button
                    className="i-btn btn--dark outline btn--lg rounded-3"
                    type="button"
                    onClick={onHide}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    className="i-btn btn--primary btn--lg rounded-3"
                >
                    Save
                </Button>
            </div>
        </form>
    )
}

export default SaveLanguage