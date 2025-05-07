

import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router";
import TooltipWrapper from "../tooltip/TooltipWrapper";

const Button = ({
  children,
  isLoading = false,
  iconBtn = false,
  tooltipText = "",
  disabled = false,
  icon: Icon,
  className = "",
  href = "",
  ...props
}) => {
  const buttonClass = `${iconBtn ? "icon-btn" : "i-btn"} ${className || ""}`;

  if (href) {
    return iconBtn ? (
      <TooltipWrapper content={tooltipText}>
        <Link to={href} {...props} className={buttonClass}>
          {Icon && <Icon className="d-inline" />}
        </Link>
      </TooltipWrapper>
    ) : (
      <Link to={href} {...props} className={buttonClass} disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <FaSpinner className="inline-block animate-spin" />
            {children}
          </div>
        ) : (
          children
        )}
      </Link>
    );
  }

  return iconBtn ? (
    tooltipText ? (
      <TooltipWrapper content={tooltipText}>
        <button
          {...props}
          className={`${buttonClass} ${
            isLoading || disabled ? "opacity-50" : ""
          }`}
          disabled={isLoading || disabled}
        >
          {Icon && <Icon className="d-inline" />}
        </button>
      </TooltipWrapper>
    ) : (
      <button
        {...props}
        className={`${buttonClass} ${
          isLoading || disabled ? "opacity-50" : ""
        }`}
        disabled={isLoading || disabled}
      >
        {Icon && <Icon className="d-inline" />}
      </button>
    )
  ) : (
    <button {...props} className={buttonClass} disabled={isLoading || disabled}>
      {isLoading ? (
        <div className="d-flex align-items-center gap-2">
          {children}
          <FaSpinner className="d-inline animate-spin" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
