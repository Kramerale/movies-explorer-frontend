import React, { useCallback } from "react";

export function useFormWithValidation() {

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });

    if (value === '') {
        setErrors({ ...errors, [name]: "Заполните поле" });
    } else if (name === 'email') {
      const isValidEmail = emailRegex.test(value);
      setErrors({ ...errors, [name]: isValidEmail ? "" : "Поле Email заполненно некорректно" });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }

    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
