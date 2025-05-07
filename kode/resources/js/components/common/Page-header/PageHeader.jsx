
import "../Page-header/PageHeader.scss";
const PageHeader = ({
  title,
  shortTitle,
  children,
  ...props
}) => {


  const attributes = {
    ...props,
    className: `page-header-wrapper mb-4 ${props.className || ""}`,
  };

  return (
    <div {...attributes}>
      <div className="page-header-left">
        <h2>{title}</h2>
        <p>{shortTitle}</p>

        {/* {breadcrumbs && (
          <nav aria-label="breadcrumb" className="breadcrumb-wrapper">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link
                  href={`${
                    isAffiliateRoute
                      ? "/affiliate/dashboard"
                      : "/admin/dashboard"
                  }`}
                  className="breadcrumb-link"
                >
                  <TranslateComponent textKey={"Dashboard"} />
                </Link>
              </li>

              {breadcrumbs.map((breadcrumb, i) => {
                return (
                  <li
                    key={i}
                    className={`breadcrumb-item ${
                      breadcrumb?.path ? "active" : ""
                    }`}
                    aria-current="page"
                  >
                    {breadcrumb?.path ? (
                      <Link
                        href={navigateBack(breadcrumb)}
                        className="breadcrumb-link bg--transparent"
                      >
                        {" "}
                        <TranslateComponent textKey={breadcrumb?.title} />
                      </Link>
                    ) : (
                      <TranslateComponent textKey={breadcrumb?.title} />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )} */}
      </div>

      {children && <div className="page-header-action">{children}</div>}
    </div>
  );
};

export default PageHeader;
