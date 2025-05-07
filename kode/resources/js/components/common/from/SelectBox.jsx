import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

// Define the animated components
const animatedComponents = makeAnimated();

// Custom Control component
const Control = ({ children, icon, ...props }) => {
  return (
    <components.Control {...props}>
      {icon && <span className="fs-18">{icon}</span>}
      {children}
    </components.Control>
  );
};

const IndicatorSeparator = () => null;
// SelectBox component with custom components and styles
const SelectBox = ({ icon, size,...props }) => {
  const attributes = {
    ...props,
    className: `select-box ${props.className || ""}`,
  };

   const height =
     size === "lg"
       ? "40px"
       : size === "md"
       ? "36px"
       : size === "sm"
       ? "34px"
       : "48px";

  const Styles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "transparent",
      minHeight: height,
      borderRadius: "12px",
      borderColor: "var(--border-primary)",
      border: state.isFocused ? "1px solid var(--primary)" : "1px solid #ddd",
      paddingInlineStart: "10px",
      color: "var(--text-primary)",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "none",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "var(--color-primary)" : "#fff",
      cursor: "pointer;",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <Select
      components={{
        ...animatedComponents,
        IndicatorSeparator,
        Control: (controlProps) => <Control {...controlProps} icon={icon} />,
      }}
      styles={Styles}
      menuPortalTarget={document.body}
      menuShouldScrollIntoView={true}
      classNamePrefix="select"
      {...attributes}
    />
  );
};

export default SelectBox;
