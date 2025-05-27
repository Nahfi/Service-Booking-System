import Button from "@/components/common/button/Button";
import Field from "@/components/common/from/Field";

const SaveUserModal = ({ closeModal }) => {
    return (
        <form>
            <div className="row g-3">
                <div className="col-md-6">
                    <Field label="Name" required>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter name"
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Email" required>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Phone" required>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="Enter Phone"
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Select Role" required>
                        <select
                            name="role_id"
                            id="role_id"
                            className="form-select"
                        >
                            <option>--Select Role--</option>
                            <option value="Active">Admin</option>
                            <option value="Inactive">CEO</option>
                        </select>
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Password" required>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter password"
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Confirm password" required>
                        <input
                            type="password"
                            id="password_confirm"
                            name="password_confirm"
                            className="form-control"
                            placeholder="Enter confirm password"
                        />
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="Profile Image">
                        <input
                            type="file"
                            id="userImage"
                            className="form-control"
                            placeholder="Enter Phone"
                        />
                    </Field>
                </div>
            </div>

            <div className="modal-custom-footer mt-4">
                <Button
                    type="button"
                    className="i-btn btn--dark btn--lg outline rounded-3"
                    onClick={closeModal}
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
    );
};

export default SaveUserModal