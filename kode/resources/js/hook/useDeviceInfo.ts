import { useEffect, useState } from "react";

// Types
type Orientation = "portrait" | "landscape";

interface ScreenSize {
    width: number;
    height: number;
}

interface DeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    os: string;
    browser: string;
    screenSize: ScreenSize;
    windowSize: ScreenSize;
    touchSupported: boolean;
    orientation: Orientation;
}

// Custom hook for device information
export const useDeviceInfo = (): DeviceInfo => {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        os: "",
        browser: "",
        screenSize: { width: 0, height: 0 },
        windowSize: { width: 0, height: 0 },
        touchSupported: false,
        orientation: "portrait",
    });

    useEffect(() => {
        const detectDevice = () => {
            const userAgent = navigator?.userAgent?.toLowerCase();

            // Device type detection
            const isMobile =
                /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(
                    userAgent
                );
            const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
            const isDesktop = !isMobile && !isTablet;

            // OS detection
            let os = "Unknown";
            if (userAgent.includes("windows")) os = "Windows";
            else if (userAgent.includes("mac")) os = "macOS";
            else if (userAgent.includes("linux")) os = "Linux";
            else if (userAgent.includes("android")) os = "Android";
            else if (userAgent.includes("iphone") || userAgent.includes("ipad"))
                os = "iOS";

            // Browser detection
            let browser = "Unknown";
            if (userAgent.includes("chrome")) browser = "Chrome";
            else if (userAgent.includes("firefox")) browser = "Firefox";
            else if (userAgent.includes("safari")) browser = "Safari";
            else if (userAgent.includes("edge")) browser = "Edge";
            else if (userAgent.includes("opera")) browser = "Opera";

            // Touch support
            const touchSupported =
                "ontouchstart" in window || navigator.maxTouchPoints > 0;

            // Orientation
            const orientation: Orientation =
                window.innerHeight > window.innerWidth
                    ? "portrait"
                    : "landscape";

            setDeviceInfo({
                isMobile,
                isTablet,
                isDesktop,
                os,
                browser,
                screenSize: {
                    width: window.screen.width,
                    height: window.screen.height,
                },
                windowSize: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                touchSupported,
                orientation,
            });
        };

        detectDevice();

        const handleResize = () => {
            setDeviceInfo((prev) => ({
                ...prev,
                windowSize: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                orientation:
                    window.innerHeight > window.innerWidth
                        ? "portrait"
                        : "landscape",
            }));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return deviceInfo;
};
