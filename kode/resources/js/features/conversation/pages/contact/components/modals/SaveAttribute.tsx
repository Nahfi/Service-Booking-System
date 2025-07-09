
import type React from 'react'
import Button from '../../../../../../components/common/button/Button'
import Field from '../../../../../../components/common/from/Field'

const SaveAttribute: React.FC = ({ onHide }) => {
    return (
        <form action="#">
            <div className='row g-3'>
                <div className="col-12">
                    <Field label={"Attribute Name"} required>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            placeholder="Enter attribute name"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="Select attribute type">
                        <select
                            className="form-select"
                            id="attribute-type"
                            aria-label="Attribute"
                        >
                            <option selected> -- Choose attribute type -- </option>
                            <option value="data">Data</option>
                            <option value="boolean">Boolean</option>
                            <option value="number">Number</option>
                            <option value="text">Text</option>
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

export default SaveAttribute