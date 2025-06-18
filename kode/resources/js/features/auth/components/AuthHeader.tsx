import React from 'react';
import { useTranslation } from 'react-i18next';
import headerLogo from "../../../assets/images/logo/logo.png";
import { valueToKey } from '../../../utils/helper';

type AuthLayoutProps = {
  title: string,
  description: string;
}
const AuthHeader: React.FC<AuthHeaderProps> = ({ title, description }) => {
    const { t } = useTranslation();
    
    return (
        <div className="form-header">
            <div className="logo">
                <img src={headerLogo} alt="auth-logo" />
            </div>
            <h3>{t(valueToKey(title), title)}</h3>
            <p>{t(valueToKey(description), description)} </p>
        </div>
    );
};

export default AuthHeader