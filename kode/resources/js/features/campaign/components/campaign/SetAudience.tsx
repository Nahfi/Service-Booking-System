import { FC } from "react";

import Field from "../../../../components/common/from/Field";
import FileUploader from "../../../../components/common/from/FileUploader";

const SetAudience: FC = () => {
    return (
        <div className="row g-4">
            <div className="col-12">
                <Field
                    label="Choose Groups"
                    inputNote="Select the members of your group where you want to send this campaign."
                >
                    <select
                        className="form-select"
                        id="country"
                        aria-label="State"
                    >
                        <option selected>Choose your state</option>
                        <option value="1">Spain</option>
                        <option value="2">England</option>
                        <option value="3">Bangladesh</option>
                        <option value="3">Dhaka</option>
                    </select>
                </Field>
            </div>
            <div className="col-12">
                <FileUploader
                    label="Or Upload your file"
                    inputNote="Only support extension of .csv, .dsv, .txt or .xlsx."
                />
            </div>
        </div>
    );
};

export default SetAudience;
