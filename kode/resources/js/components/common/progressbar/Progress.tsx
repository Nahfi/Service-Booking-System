import { useEffect, useState, type FC } from "react";
import "../progressbar/progress.scss";

type ProgressProps = {
    percentage: number;
    color: string;
    height?: string;
    type?: "circle" | "linear";
    flagUrl?: string;
    countryName?: string;
};

const Progress: FC<ProgressProps> = ({
    percentage,
    color,
    height,
    type = "circle",
    flagUrl,
    countryName,
}) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const timeout = setTimeout(() => setProgress(percentage), 100);
        return () => clearTimeout(timeout);
    }, [percentage]);

    return type === "circle" ? (
        <svg
            className={`circular-svg ${color}`}
            width="80"
            height="80"
            viewBox="0 0 120 120"
        >
            <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#DFE3E4"
                strokeWidth="10"
                fill="none"
            />
            <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                strokeDasharray={2 * Math.PI * 50}
                strokeDashoffset={
                    2 * Math.PI * 50 - (progress / 100) * (2 * Math.PI * 50)
                }
                style={{ transition: "stroke-dashoffset 1s ease" }}
            />
            {progress && (
                <text
                    x="60"
                    y="60"
                    dy="0.3em"
                    textAnchor="middle"
                    fontSize="22px"
                    fontWeight="600"
                    fill="#000"
                >
                    {`${progress}%`}
                </text>
            )}
        </svg>
    ) : (
        <div className="linear-progress-container">
            <div className={`linear-progress-bar ${height}`}>
                <div
                    className={`linear-progress-fill ${color}`}
                    style={{ width: `${progress}%` }}
                ></div>
                {countryName && (
                    <div className="linear--text d-flex align-items-center gap-2">
                        {flagUrl && (
                            <img src={flagUrl} alt="flagImage" className="" />
                        )}
                        {countryName}
                    </div>
                )}
                <span className="progress-value">{`${progress}%`}</span>
            </div>
        </div>
    );
};

export default Progress;
