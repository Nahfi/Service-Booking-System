
interface FilterProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Filter: React.FC<FilterProps> = ({ className = "",children,...props }) => {

    const attributes = {
        ...props,
        className: `filter-form ${className || ""}`,
    };


    return (
        <div {...attributes}>
            {children}
        </div>
    );
};

export default Filter;
