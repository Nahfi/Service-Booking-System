import { useTranslation } from "react-i18next";
import { valueToKey } from "../../../utils/helper";

import NoDataImage from "../../../assets/images/no-data-found.gif";


interface NoDataFoundProps {
    icon?: IconType; 
    message?: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
    icon: Icon,
    message = "",
}) => {
    const { t } = useTranslation();
    return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5 px-4 animate-fade-in">
            {Icon ? (
                <Icon
                    className="fs-60 text-ternary"
                    aria-label="No data icon"
                />
            ) : (
                <img className="no-data-image" src={NoDataImage} alt="No data found" />
            )}

            <h4 className="fs-18">
                {message
                    ? t(valueToKey(message), message)
                    : t(valueToKey("No Data Found"), "No Data Found")}
            </h4>
            <p className="mt-2 text-muted">
                {t(valueToKey("Your list is empty. Create your first item to begin"), "Your list is empty. Create your first item to begin")}.
            </p>
        </div>
    );
};

export default NoDataFound;
