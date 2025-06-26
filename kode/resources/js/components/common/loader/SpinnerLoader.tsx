
import React from "react";

interface SpinnerLoaderProps {
    bg?: string;
    size?: "sm" | "md" | "lg" | "xl" | string;
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
    bg = "text-primary",
    size = "md",
}) => {
    return (
        <div
            className={`spinner-border spinner-border-${size} ${bg}`}
            role="status"
        >
            <span className="visually-hidden"></span>
        </div>
    );
};

export default SpinnerLoader;
