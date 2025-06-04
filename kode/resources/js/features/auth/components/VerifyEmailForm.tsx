import Button from "@/components/common/button/Button";
import type React from "react";
import Field from "../../../components/common/from/Field";

interface VerifyEmailProps {
    handleEmailVerify: (e: FormSubmitEvent) => void;
    loading: boolean;
}


const VerifyEmailForm: React.FC<VerifyEmailProps> = ({
    handleEmailVerify,
    loading,
}) => {
    return (
        <form onSubmit={handleEmailVerify}>
            <div className="row g-4">
                <div className="col-12">
                    <Field label="email" required>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </Field>
                </div>

                <div className="col-12">
                    <Button
                        type="submit"
                        className="btn--xl btn--primary w-100 rounded-3"
                        isLoading={loading}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default VerifyEmailForm;
