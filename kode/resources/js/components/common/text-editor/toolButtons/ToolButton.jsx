

const ToolButton = (props) => {
    const { className = "", disabled, active, title, ...rest } = props;

    const classes = [
        "tool-button",
        active && "active",
        disabled && "disabled",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            className={classes}
            type="button"
            title={title}
            disabled={disabled}
            {...rest}
        />
    );
};

export default ToolButton;
