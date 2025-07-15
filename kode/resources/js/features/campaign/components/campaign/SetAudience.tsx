import { FC } from "react";

import Field from "../../../../components/common/from/Field";
import FileUploader from "../../../../components/common/from/FileUploader";

const SetAudience: FC = () => {
    return (
        <div className="row g-4 fade-in">
            <div className="col-xxl-9 col-xl-8">
                <Field
                    label="Choose Groups"
                    inputNote="Select the members of your group where you want to send this campaign."
                >
                    <select
                        className="form-select"
                        id="country"
                        aria-label="State"
                    >
                        <option selected>Select group</option>
                        <option value="1">Group-1</option>
                        <option value="2">Group-2</option>
                        <option value="3">Group-3</option>
                        <option value="3">Group-4</option>
                    </select>
                </Field>
            </div>

            <div className="col-xxl-9 col-xl-8">
                <FileUploader
                    maxFile="Only support extension of .csv, .dsv, .txt or .xlsx."
                />
            </div>
        </div>
    );
};

export default SetAudience;
