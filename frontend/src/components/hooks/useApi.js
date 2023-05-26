import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useAPI = (apiFunc) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  let toastId;
  const request = async (display, ...args) => {
    console.log("display :",display);
    if (display) {
      console.log("in if")
      toastId = toast.info("Submitting form...", {
        autoClose: false,
        hideProgressBar: false,
      });
    }
    try {
      setDisabled(true);
      console.log("reached here")
      const result = await apiFunc(...args);
      setResponse(result);
      if (display) {
        toast.update(toastId, {
          render: result.data.message,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
      }
      console.log("result", result);
      setDisabled(false);
    } catch (error) {
      console.log(error);
      if (display) {
        toast.update(toastId, {
          render: `Error: ${error.response.data.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 3000,
        });
      }
      setError(error.message || "Unexpected error occurred");
      setDisabled(false);
    }
  };

  return { error, response, disabled, request, setResponse };
};

export default useAPI;
