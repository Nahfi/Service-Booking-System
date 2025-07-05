import React, { useEffect, useState } from "react";

interface SwitchWrapperProps {
    id: string | number;
    label?: string;
}

const SwitchWrapper: React.FC<SwitchWrapperProps> = ({
    id,
    label,
    ...props
}) => {
    const { checked = false, onSwitch = undefined } = props;
    const isDisabled = props?.isDisabled ?? false;
    const [isChecked, setIsChecked] = useState(checked || false);

    useEffect(() => {
        if (checked !== undefined) {
            setIsChecked(checked);
        }
    }, [checked]);

    const handleToggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        if (onSwitch) {
            onSwitch(newValue);
        }
    };
    
    return (
        <label htmlFor={id} className="switch-wrapper">
            {label && <span className="text-dark fs-14">{label}</span>}

            <span className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={id}
                    disabled={isDisabled}
                    checked={isChecked}
                    onChange={handleToggle}
                />
            </span>
        </label>
    );
};

export default SwitchWrapper;
