

import toast from "react-hot-toast";

/**
 * Utility function to handle error responses and display appropriate toast notifications
 * @param {any} data - The error data object from the API response
 */

const onErrorResponse = (data) => {

  if (data?.response?.data) {

    const response = data.response;
    const resData = response?.data;
    const errors = resData?.data?.errors;

    if (errors) {
      Object.values(errors)
        .flat()
        .forEach((message) => {
          toast({
            variant: "destructive",
            description: message,
          });
        });
    } else if (resData?.data?.error) {
      toast.error(resData?.data?.error);
    } else if (response?.data?.message) (
      toast.error(response?.data?.message)
    )
  }
};

export { onErrorResponse };




