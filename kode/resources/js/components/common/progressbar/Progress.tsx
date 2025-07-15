import { useEffect, useState, type FC } from "react";
import "../progressbar/progress.scss";

type ProgressProps = {
    percentage: number;
    color: string;
    size?: "sm" | "md" | "lg" | "xl" | "xxl";
    type?: "circle" | "linear";
    flagUrl?: string;
    countryName?: string;
};

const Progress: FC<ProgressProps> = ({
    percentage,
    color,
    size = "md",
    type = "circle",
    flagUrl,
    countryName,
}) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const timeout = setTimeout(() => setProgress(percentage), 100);
        return () => clearTimeout(timeout);
    }, [percentage]);

    // Enhanced size configurations with better proportions
    const sizeDimensions = {
        sm: {
            width: 40,
            height: 40,
            radius: 16,
            strokeWidth: 4,
            fontSize: 10,
            linearHeight: 34
        },
        md: {
            width: 56,
            height: 56,
            radius: 24,
            strokeWidth: 5,
            fontSize: 14,
            linearHeight: 36
        },
        lg: {
            width: 72,
            height: 72,
            radius: 32,
            strokeWidth: 6,
            fontSize: 18,
            linearHeight: 44
        },
        xl: {
            width: 88,
            height: 88,
            radius: 40,
            strokeWidth: 7,
            fontSize: 22,
            linearHeight: 56
        },
        xxl: {
            width: 104,
            height: 104,
            radius: 48,
            strokeWidth: 8,
            fontSize: 26,
            linearHeight: 64
        },
    };

    const { width, height: svgHeight, radius, strokeWidth, fontSize, linearHeight } = sizeDimensions[size];

    const linearFontSize = Math.max(linearHeight * 0.4, 10);

    const flagSize = Math.min(linearHeight * 0.6, 24);

    return type === "circle" ? (
        <svg
            className={`circular-svg ${color} size-${size}`}
            width={width}
            height={svgHeight}
            viewBox={`0 0 ${width} ${svgHeight}`}
        >
            {/* Background circle */}
            <circle
                cx={width / 2}
                cy={svgHeight / 2}
                r={radius}
                stroke="#E5E7EB"
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Progress circle */}
            <circle
                cx={width / 2}
                cy={svgHeight / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={2 * Math.PI * radius}
                strokeDashoffset={
                    2 * Math.PI * radius - (progress / 100) * (2 * Math.PI * radius)
                }
                style={{
                    transition: "stroke-dashoffset 1s ease",
                    strokeLinecap: "round"
                }}
                transform={`rotate(-90 ${width / 2} ${svgHeight / 2})`}
            />
            {/* Percentage text */}
            {progress > 0 && (
                <text
                    x={width / 2}
                    y={svgHeight / 2}
                    dy="0.35em"
                    textAnchor="middle"
                    fontSize={`${fontSize}px`}
                    fontWeight="600"
                    fill="#374151"
                >
                    {`${Math.round(progress)}%`}
                </text>
            )}
        </svg>
    ) : (
        <div
            className={`linear-progress-container size-${size}`}
            style={{
                width: `100%`,
                position: 'relative'
            }}
        >
            <div
                className={`linear-progress-bar ${size}`}
                style={{
                    height: `${linearHeight}px`,
                    backgroundColor: '#E5E7EB',
                    borderRadius: `${linearHeight / 2}px`,
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <div
                    className={`linear-progress-fill ${color}`}
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        borderRadius: `${linearHeight / 2}px`,
                        transition: 'width 1s ease',
                        backgroundColor: 'currentColor'
                    }}
                ></div>

                {/* Country info and percentage container */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '8px',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: `${linearFontSize}px`,
                    fontWeight: '500',
                    color: '#374151',
                    zIndex: 1
                }}>
                    {flagUrl && (
                        <img
                            src={flagUrl}
                            alt="flag"
                            style={{
                                width: `${flagSize}px`,
                                height: `${flagSize * 0.67}px`, // 3:2 ratio for flags
                                borderRadius: '2px',
                                objectFit: 'cover'
                            }}
                        />
                    )}
                    {countryName && (
                        <span style={{
                            whiteSpace: 'nowrap',
                            textShadow: progress > 50 ? '0 0 3px rgba(255,255,255,0.8)' : 'none'
                        }}>
                            {countryName}
                        </span>
                    )}
                </div>

                {/* Percentage display */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '8px',
                    transform: 'translateY(-50%)',
                    fontSize: `${linearFontSize}px`,
                    fontWeight: '600',
                    color: '#374151',
                    textShadow: progress > 70 ? '0 0 3px rgba(255,255,255,0.8)' : 'none',
                    zIndex: 1
                }}>
                    {`${Math.round(progress)}%`}
                </div>
            </div>
        </div>
    );
};

export default Progress;