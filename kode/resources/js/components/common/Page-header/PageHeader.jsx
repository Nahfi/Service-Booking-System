import { Link } from "react-router-dom";
import "../Page-header/PageHeader.scss";

const PageHeader = ({ title, shortTitle, breadcrumbs, children, ...props }) => {
    const attributes = {
        ...props,
        className: `page-header-wrapper mb-4 ${props.className || ""}`,
    };

    const navigateBack = (breadcrumb) => {
        if (breadcrumb) {
            let url = breadcrumb?.path;

            if (breadcrumb?.query_params) {
                Object.entries(breadcrumb?.query_params).forEach(
                    ([key, value], index) => {
                        if (index === 0) {
                            url += "?";
                        } else {
                            url += "&";
                        }
                        url += `${key}=${value || null}`;
                    }
                );
            }
            return url;
        }
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
                                        !breadcrumb?.path ? "active" : ""
                                    }`}
                                    aria-current={
                                        !breadcrumb?.path ? "page" : undefined
                                    }
                                >
                                    {breadcrumb?.path ? (
                                        <Link
                                            to={navigateBack(breadcrumb)}
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
