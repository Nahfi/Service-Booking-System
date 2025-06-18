import toast from 'react-hot-toast';
import Button from '../../../components/common/button/Button';
import Card from '../../../components/common/card/Card';
import CardBody from '../../../components/common/card/CardBody';
import CardHeader from '../../../components/common/card/CardHeader';
import Field from '../../../components/common/from/Field';
import usePasswordUpdate from '../api/hooks/usePasswordUpdate';

const PasswordUpdate = () => {
    const { mutate: passwordUpdate, isPending } = usePasswordUpdate();


    const handleUpdatePassword = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        passwordUpdate(formData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success("Password update successfully!");
                    e.target.reset();
                }
            },
        });
    };

  return (
      <Card>
          <CardHeader
              cardTitle="Change Password"
              description={"Keep your account secure with a strong password"}
          />

          <CardBody>
              <form onSubmit={handleUpdatePassword}>
                  <div className="row g-4">
                      <div className="col-12">
                          <Field label="Current Password" required>
                              <input
                                  type="password"
                                  id="current_password"
                                  name="current_password"
                                  className="form-control"
                                  placeholder="Enter your current password"
                                  required
                              />
                          </Field>
                      </div>

                      <div className="col-md-6">
                          <Field label="New password" required>
                              <input
                                  type="password"
                                  id="password"
                                  name="password"
                                  className="form-control"
                                  placeholder="Enter your New Password"
                                  required
                              />
                          </Field>
                      </div>

                      <div className="col-md-6">
                          <Field label="Confirm New Password" required>
                              <input
                                  type="password"
                                  id="password_confirmation"
                                  name="password_confirmation"
                                  className="form-control"
                                  placeholder="Enter your confirmation password"
                                  required
                              />
                          </Field>
                      </div>
                  </div>

                  <div className="text-end mt-4">
                      <Button
                          className="btn--primary btn--lg"
                          type="submit"
                          isLoading={isPending}
                      >
                          Update password
                      </Button>
                  </div>
              </form>
          </CardBody>
      </Card>
  );
}

export default PasswordUpdate