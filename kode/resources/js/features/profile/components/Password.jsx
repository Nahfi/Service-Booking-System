import React from "react";
import Field from "../../../components/common/from/Field";

const Password = () => {
    return(
        <div className="info-block">
            <div className="row">
                <div className="col-xl-2 col-lg-3">
                    <h6 className="title--sm">Password Security</h6>
                </div>
                <div className="col-xl-10 col-lg-9">
                    <div className="row g-4 mb-40">
                        <div className="col-12">
                            <Field label="Old password" required>
                                <input 
                                    type="text" 
                                    id="oldPassw"
                                    className="form-control"
                                    placeholder="Enter your Old Password"
                                />
                            </Field>
                        </div>
                        <div className="col-12">
                            <Field label="New password" required>
                                <input 
                                    type="text" 
                                    id="newPassw"
                                    className="form-control"
                                    placeholder="Enter your New Password"
                                />
                            </Field>
                        </div>
                        <div className="col-12">
                            <Field label="Confirm password" required>
                                <input 
                                    type="email" 
                                    id="confirmPass"
                                    className="form-control"
                                    placeholder="+1 252 252 2522"
                                />
                            </Field>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <button className="i-btn btn--primary btn--lg">Update password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Password;