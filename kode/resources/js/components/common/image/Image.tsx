import { useEffect, useState } from "react";

type ImageState = "loading" | "loaded" | "error";

interface ImageComponentProps {
    src: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    placeholder?: string;
    errorImage?: string;
    onLoad?: () => void;
    onError?: () => void;
}

const Image: React.FC<ImageComponentProps> = ({
    src,
    alt = "Image",
    width = "300",
    height = "200",
    className = "",
    placeholder = "https://via.placeholder.com/300x200/e2e8f0/64748b?text=Loading...",
    errorImage = "https://via.placeholder.com/300x200/fee2e2/dc2626?text=Failed+to+load",
    onLoad,
    onError,
}) => {
    const [imageState, setImageState] = useState<ImageState>("loading");
    const [imageSrc, setImageSrc] = useState<string>(placeholder);

    const handleImageLoad = (): void => {
        setImageState("loaded");
        setImageSrc(src);
        onLoad?.();
    };

    const handleImageError = (): void => {
        setImageState("error");
        setImageSrc(errorImage);
        onError?.();
    };

    const handleImageStart = (): void => {
        if (src) {
            const img = new Image();
            img.onload = handleImageLoad;
            img.onerror = handleImageError;
            img.src = src;
        }
    };

    useEffect(() => {
        handleImageStart();
    }, [src]);

    return (
        <div className={`relative inline-block ${className}`}>
            <img
                src={imageSrc}
                alt={alt}
                width={width}
                height={height}
                className={`transition-all duration-300 ${
                    imageState === "loading"
                        ? "opacity-70 animate-pulse"
                        : "opacity-100"
                } ${
                    imageState === "error" ? "border-2 border-red-300" : ""
                } rounded-lg shadow-sm hover:shadow-md transition-shadow`}
            />

            {imageState === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            )}

            {imageState === "error" && (
                <div className="absolute bottom-2 left-2 bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                    Failed to load
                </div>
            )}
        </div>
    );
};
export default Image;