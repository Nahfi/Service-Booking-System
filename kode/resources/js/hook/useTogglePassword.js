import { useState } from "react";

const useTogglePassword = () => {

    const[visible, setVisible] =  useState(false);

    const togglePassword = () => {
        if(!visible) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }

    return{
        visible,
        togglePassword
    };
};

export default useTogglePassword;