import React, { ReactNode } from "react";

import type {
  ControlProps,
  Props as SelectProps,
  StylesConfig,
} from "react-select";

import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

// Define option type
interface OptionType {
  value: string | number;
  label: string;
}

// Custom Control component props
interface CustomControlProps extends ControlProps<OptionType, boolean> {
  icon?: ReactNode;
}

// SelectBox component props
interface SelectBoxProps<IsMulti extends boolean = false>
  extends Omit<SelectProps<OptionType, IsMulti>, "components" | "styles"> {
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Define the animated components
const animatedComponents = makeAnimated();

// Custom Control component
const Control: React.FC<CustomControlProps> = ({
  children,
  icon,
  ...props
}) => {
  return (
    <components.Control {...props}>
      {icon && <span className="fs-18">{icon}</span>}
      {children}
    </components.Control>
  );
};

const IndicatorSeparator = () => null;
// SelectBox component with custom components and styles
const SelectBox: React.FC<SelectBoxProps> = ({ icon, size, ...props }) => {
  const attributes = {
    ...props,
    className: `select-box ${props.className || ""}`,
  };

  const height = size === "lg"
    ? "40px"
    : size === "md"
      ? "36px"
      : size === "sm"
        ? "34px"
        : "48px";

  const Styles: StylesConfig<OptionType, boolean> = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "transparent",
      minHeight: height,
      borderRadius: "12px",
      borderColor: "var(--border-primary)",
      border: state.isFocused
        ? "1px solid var(--primary)"
        : "1px solid #ddd",
      paddingInlineStart: "10px",
      color: "var(--text-primary)",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "none",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected
        ? "var(--color-primary)"
        : state.isFocused
          ? "rgba(0, 0, 0, 0.05)"
          : "#fff",
      cursor: "pointer",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <Select<OptionType, IsMulti>
      components={{
        ...animatedComponents,
        IndicatorSeparator,
        Control: (controlProps) => (
          <Control {...controlProps} icon={icon} />
        ),
      }}
      styles={Styles}
      menuPortalTarget={document.body}
      menuShouldScrollIntoView={true}
      classNamePrefix="select"
      {...attributes}
    />
  );
};

SelectBox.displayName = "SelectBox";
export default SelectBox;
