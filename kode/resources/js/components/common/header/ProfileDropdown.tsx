import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LuLogOut, LuSettings, LuUser } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import type { RootState } from '../../../redux/store/store';

const ProfileDropdown = () => {
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user);

    return (
        <Dropdown>
            <Dropdown.Toggle className="transparent-dropdown">
                <div className="user-toggle d-flex justify-content-start align-items-center gap-lg-3 gap-2 position-relative">
                    <div className="image">
                        <img src={user?.img_url} alt="profile-image" />
                    </div>
                    <span
                        className={`position-absolute top-0 end-0 translate-middle badge border border-light rounded-circle p-1 ${
                            user?.is_online ? "bg-success" : "bg-secondary"
                        }`}
                    >
                        <span className="visually-hidden"></span>
                    </span>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="profile-dropdown">
                <Dropdown.Header as={"div"} className="p-3 pt-1">
                    <div className="content lh-1">
                        <h6 className="mb-1">{user?.name}</h6>
                        <span>{user?.email}</span>
                    </div>
                </Dropdown.Header>

                <Dropdown.Item
                    as={Link}
                    to="/profile"
                    className="text-dark d-flex align-items-center gap-3 w-100 p-3"
                >
                    <span>
                        <LuUser className="fs-18" />
                    </span>
                    <p>{t("my_account", "My Account")}</p>
                </Dropdown.Item>

                <Dropdown.Item
                    as={Link}
                    to="/setting/general"
                    className="text-dark d-flex align-items-center gap-3 w-100 p-3"
                >
                    <span>
                        <LuSettings className="fs-18" />
                    </span>
                    <p>{t("settings", "Settings")}</p>
                </Dropdown.Item>

                <Dropdown.Item
                    as={Link}
                    to={`/login`}
                    className="text-dark d-flex align-items-center gap-3 w-100 p-3"
                >
                    <span>
                        <LuLogOut className="fs-18" />
                    </span>
                    <span>{t("sign_out", "Sign out")}</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ProfileDropdown