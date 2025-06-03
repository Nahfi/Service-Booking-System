import React, { HTMLAttributes, ReactNode } from "react";

interface BaseLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, ...props }) => {
    const attributes = {
        ...props,
        className: `base-layout main-body-scroll ${props?.className || ""}`,
    };
    return (
        <div {...attributes}>
            <div className="container-fluid px-0">{children}</div>
        </div>
    );
};

export default BaseLayout;
