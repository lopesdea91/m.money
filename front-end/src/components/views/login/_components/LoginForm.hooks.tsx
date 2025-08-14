import { useNavigate } from "react-router";

import { authSignInService } from "@/@features/services/auth";
import {
  addToast,
  cleanToast,
  removeToastByKey,
} from "@/@features/services/toast";
import { getStore } from "@/@store";
import { useLoginForm } from "./LoginForm.schema";

const useLoginFormHooks = () => {
  // global
  const navigate = useNavigate();
  const toasts = getStore().toast;

  // global > local
  const toastKey = toasts.filter((el) => el._key === "authSignInService");

  // local
  const { values, errors, setValues, handleSubmit } = useLoginForm();

  async function onSubmit() {
    cleanToast();

    const payload = {
      email: values.email,
      password: values.password,
    };
    await authSignInService(payload)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error: Error) => {
        addToast({ message: error.message, key: "login-form" });
      });
  }

  return {
    formError: toastKey.shift(),
    formErrorClose: () => removeToastByKey("authSignInService"),
    values,
    errors,
    setValues,
    onSubmit: handleSubmit(onSubmit),
  };
};

export default useLoginFormHooks;
