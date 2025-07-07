import { useTranslation } from 'react-i18next';
import { LuClock, LuEyeOff, LuMail, LuPhone, LuShieldOff } from 'react-icons/lu';
import Button from '../../../../components/common/button/Button';
import Card from '../../../../components/common/card/Card';
import CardBody from '../../../../components/common/card/CardBody';
import CardHeader from '../../../../components/common/card/CardHeader';
import NoDataFound from '../../../../components/common/NoDataFound/NoDataFound';
import { keyToValue, valueToKey } from '../../../../utils/helper';


const UserDetailsModal: React.FC = ({ onHide, modalData:user }) => {
    const { t } = useTranslation();
    const address = Object.entries(user?.address[0] || []);
    const role = user?.role
    
    return (
        <div>
            <div className="row g-3 user-details">
                <div className="col-12">
                    <Card>
                        <CardBody>
                            <div className="user-profile-wrapper d-flex align-items-center gap-4">
                                <div className="user-profile-image flex-shrink-0">
                                    <img src={user?.img_url} className='w-100 h-100'/>
                                </div>

                                <div className="user-profile-info">
                                    <h5 className="fs-18 mb-2">
                                        {user?.name}
                                        <span className={`i-badge pill ${user?.status==="active"? "success":"dark"}-soft ms-3`}>
                                            {keyToValue(user?.status)}
                                        </span>
                                    </h5>

                                    <p className="fs-14 d-flex align-items-center gap-2">
                                        <span className="text-muted d-flex align-items-center gap-2">
                                            <LuMail /> {t(valueToKey("Email"),"Email")} :
                                        </span>
                                        {user?.email || "--"}
                                    </p>

                                    <p className="fs-14 d-flex align-items-center gap-2">
                                        <span className="text-muted d-flex align-items-center gap-2">
                                            <LuPhone /> {t(valueToKey("Phone"), "Phone")} :
                                        </span>
                                        {user?.phone || "--"}
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-lg-6">
                    <Card className="h-100">
                        <CardHeader cardTitle="Address" />
                        <CardBody>
                            <div className="row g-2">
                                {address?.length > 0 ? (address?.map(
                                    ([key, value]) => (
                                        <div className="col-12">
                                            <div className="py-2 px-3 bg--light border rounded-2">
                                                <span className="fs-13 text-muted">
                                                    {keyToValue(key)}
                                                </span>
                                                <h6 className="mt-1 fs-14">
                                                    {value}
                                                </h6>
                                            </div>
                                        </div>
                                    )
                                )) : (
                                        <NoDataFound/>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-lg-6">
                    <Card className="h-100">
                        <CardHeader cardTitle="Security Settings" />
                        <CardBody>
                            <div className="row g-2">
                                <div className="col-12">
                                    <div className="py-2 px-3 bg--light border rounded-2 d-flex align-items-center gap-3">
                                        <LuShieldOff className="fs-20" />
                                        <div>
                                            <span className="fs-13 text-muted">
                                                {t(valueToKey("Two-Factor Authentication"),"Two-Factor Authentication")}
                                            </span>
                                            <h6 className="mt-1 fs-14">
                                                {user?.two_factor_enabled ? "Enabled" :"Disabled"}
                                            </h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="py-2 px-3 bg--light border rounded-2 d-flex align-items-center gap-3">
                                        <LuEyeOff className="fs-20" />
                                        <div>
                                            <span className="fs-13 text-muted">
                                                {t(valueToKey("Online Status Visibility"),"Online Status Visibility")}
                                            </span>
                                            <h6 className="mt-1 fs-14">
                                                {user?.two_factor_enabled ? "Visible" : "Hidden"}
                                            </h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="py-2 px-3 bg--light border rounded-2 d-flex align-items-center gap-3">
                                        <LuClock className="fs-20" />
                                        <div>
                                            <span className="fs-13 text-muted">
                                                Last Login
                                            </span>
                                            <h6 className="mt-1 fs-14">
                                                {user?.last_login_time || "--"}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-12">
                    <Card>
                        <CardHeader cardTitle="Role & Permissions" />
                        <CardBody>
                            <div>
                                <h6 className="fs-14 mb-3">
                                    {role?.name}
                                    <span className="i-badge pill success-soft ms-3">
                                        Active
                                    </span>
                                </h6>

                                <div className="row g-3">
                                    {Object.entries(role?.permissions).map(
                                        ([key, value], index) => (
                                            <div
                                                key={index}
                                                className="col-lg-6"
                                            >
                                                <div className="py-2 px-3 border rounded-3 bg--light">
                                                    <p className="mb-2 fs-13 fw-semibold">
                                                        {keyToValue(key)}
                                                    </p>
                                                    <ul className="d-flex align-items-center flex-wrap gap-2">
                                                        {value?.map(
                                                            (
                                                                permission,
                                                                index
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        index
                                                                    }
                                                                    className="i-badge pill info-soft"
                                                                >
                                                                    {keyToValue(
                                                                        permission
                                                                    )}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

             <div className="modal-custom-footer mt-4">
                <Button
                    type="button"
                    className="btn--dark btn--lg outline rounded-3"
                    onClick={onHide}
                >
                    {t(valueToKey("Cancel"), "Cancel")}
                </Button>

            </div>
        </div>
    )
}

export default UserDetailsModal