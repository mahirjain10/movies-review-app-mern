import { useState, useRef, useEffect, useCallback } from "react";
import * as yup from "yup";

const useInputError = (inputState,schemaName) => {
  console.log({ ...inputState });
  const [inputError, setInputError] = useState({ ...inputState });
  const errorRef = useRef(inputError);

  const onInputChangeError = async (fieldName, data) => {
    try {
      const validData = await schemaName.validate(data, {
        abortEarly: false,
      });
      console.log({ ...validData });
      if (validData) {
        const keys = Object.keys(validData);
        for (let key of keys) {
          errorRef.current[key] = null;
          setInputError((prev) => {
            const updatedData = { ...prev, [key]: null };
            return updatedData;
          });
        }
      }
     
    } catch (error) {
      console.log(error.errors);
      if (error instanceof yup.ValidationError) {
        for (let i = 0; i < error.inner.length; i++) {
          const err = error.inner[i];
          console.log("err.path : ", err.path);
          if (err.path === fieldName) {
            setInputError((prev) => {
              let updatedData = { ...prev, [err.path]: err.message };
              errorRef.current[err.path] = err.message;
              return updatedData;
            });
            break; // exit the loop early
          }
          if (err.path !== fieldName) {
            console.log("in other if");
            // console.log(`${err.path}: ${err.message}`);
            errorRef.current[fieldName] = null;
            setInputError((prev) => {
              let updatedData = { ...prev, [fieldName]: null };
              return updatedData;
            });
            console.log("on submit : ", errorRef.current);
          }
        }
      } else {
        console.log(error);
      }
    }
  };
  const onSubmitError = async (data, apiFunc) => {
    try {
      const validData = await schemaName.validate(data, {
        abortEarly: false,
      });
      apiFunc(true,data);
    } catch (error) {
      for (let i = 0; i < error.inner.length; i++) {
        const err = error.inner[i];
        errorRef.current[err.path] = err.message;
        setInputError((prev) => {
          let updatedData = { ...prev, [err.path]: err.message };
        //   console.log("input error in setinput error", inputError);
          return updatedData;
        });
        
      }
    }
  };

  return { onInputChangeError, onSubmitError, errorRef, inputError };
};

export default useInputError;
