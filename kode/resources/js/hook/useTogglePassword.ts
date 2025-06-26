import { useState } from "react";

const useTogglePassword = () => {

    const [visible, setVisible] = useState<boolean>(false);

    const togglePassword = () => {
        setVisible(prevState => !prevState)
    }

    return{
        visible,
        togglePassword
    };
};

export default useTogglePassword;
