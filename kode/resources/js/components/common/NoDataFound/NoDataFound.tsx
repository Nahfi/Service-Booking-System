import { useTranslation } from "react-i18next";
import { valueToKey } from "../../../utils/helper";

import { LuDatabase } from "react-icons/lu";


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
        <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5 px-4 fade-in">
            <span className="mb-3 p-4 bg--light rounded-circle  text-ternary">
                {Icon ? (
                    <Icon
                        className="fs-60"
                        aria-label="No data icon"
                    />
                ) : (
                    <LuDatabase aria-label="No data icon" className="fs-60" />
                )}
            </span>

            <h4 className="fs-20">
                {message
                    ? t(valueToKey(message), message)
                    : t(valueToKey("No data available"), "No data available")}
            </h4>
            <p className="mt-2 text-muted">
                {t(valueToKey("No data available for your query"), "No data available for your query")}.
            </p>
        </div>
    );
};

export default NoDataFound;
