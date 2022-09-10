import { useState } from "react";

const useForm = (callback) => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const auxValues = { ...values };

    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };

  const handleSubmit = (callback) => async (event) => {
    event.preventDefault();

    setLoading(true);
    callback();
    setLoading(false);
  };
  return [{ values, loading }, handleChange, handleSubmit];
};

export default useForm;
