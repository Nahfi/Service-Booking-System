import React, { HTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import "../Page-header/PageHeader.scss";

// Define breadcrumb type
interface Breadcrumb {
    title: string;
    path?: string;
    query_params?: Record<string, string | number | boolean | null>;
}

// Define component props
interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    shortTitle?: string;
    breadcrumbs?: Breadcrumb[];
    children?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    shortTitle,
    breadcrumbs,
    children,
    ...props
}) => {
    const attributes = {
        ...props,
        className: `page-header-wrapper mb-4 ${props?.className || ""}`,
    };

    const getUrlWithQuery = (breadcrumb: Breadcrumb): string => {
        let url = breadcrumb.path || "";

        if (breadcrumb.query_params) {
            const searchParams = new URLSearchParams();

            for (const [key, value] of Object.entries(
                breadcrumb.query_params
            )) {
                searchParams.append(key, value?.toString() || "");
            }

            const queryString = searchParams.toString();
            url += queryString ? `?${queryString}` : "";
        }

        return url;
    };

    return (
        <div {...attributes}>
            <div className="page-header-left">
                <h2>{title}</h2>
                {shortTitle && <p>{shortTitle}</p>}

                {breadcrumbs && (
                    <nav aria-label="breadcrumb" className="breadcrumb-wrapper">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/" className="breadcrumb-link">
                                    Dashboard
                                </Link>
                            </li>
                            {breadcrumbs.map((breadcrumb, i) => (
                                <li
                                    key={i}
                                    className={`breadcrumb-item ${
                                        !breadcrumb.path ? "active" : ""
                                    }`}
                                    aria-current={
                                        !breadcrumb.path ? "page" : undefined
                                    }
                                >
                                    {breadcrumb.path ? (
                                        <Link
                                            to={getUrlWithQuery(breadcrumb)}
                                            className="breadcrumb-link bg--transparent"
                                        >
                                            {breadcrumb.title}
                                        </Link>
                                    ) : (
                                        breadcrumb.title
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}
            </div>

            {children && <div className="page-header-action">{children}</div>}
        </div>
    );
};

export default PageHeader;
