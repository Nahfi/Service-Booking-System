import Filter from "./Filter";

interface FilterProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const FilterWrapper: React.FC<FilterProps> = ({
    className = "",
    children,
    ...props
}) => {
    const attributes = {
        ...props,
        className: `filter-form ${className || ""}`,
    };

    return <div {...attributes}>{children ? children : <Filter/>}</div>;
};

export default FilterWrapper;
