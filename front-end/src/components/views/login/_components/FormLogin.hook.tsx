import type { FormLoginSchema } from "@/@features/schemas/formLogin";
import type { Features, IFormLoginValues, Store } from "@/types";
import sleep from "@/utils/sleep";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useFormLoginHook = ($store: Store, $features: Features) => {
  const {} = $store;
  const {
    schemas: { formLoginSchema },
    services: { authSignInService, addToast, navigateTo },
  } = $features;

  /** form */
  const parseInput = (): FormLoginSchema => {
    return {
      email: "user1@email.com",
      password: "user+1-@qwert",
    };
  };
  const parseOutput = ({
    email,
    password,
  }: FormLoginSchema): IFormLoginValues => {
    return {
      email,
      password,
    };
  };
  const formTag = useForm({
    resolver: zodResolver(formLoginSchema),
    defaultValues: parseInput(),
  });
  const formLoginSetValues = (currentValues: Partial<FormLoginSchema>) => {
    Object.entries(currentValues).forEach(([key, value]) =>
      formTag.setValue(key as keyof FormLoginSchema, value)
    );
  };

  /** events */
  const onSubmit = async () => {
    const values = parseOutput(formTag.getValues());

    try {
      const payload = {
        email: values.email,
        password: values.password,
      };

      await sleep(500);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      await authSignInService(payload)
        .then(() => {
          navigateTo("/dashboard");
        })
        .catch((error: Error) => {
          addToast({ message: error.message, key: "login-form" });
        });
    } catch (error) {
      console.log(error);

      // addToast({ message: error.message, key: "login-form" });
    }
  };

  return {
    v: formTag.watch(),
    e: formTag.formState.errors,
    s: formLoginSetValues,
    onSubmit: formTag.handleSubmit(() => onSubmit()),
    // formError: toastKey.shift(),
    // formErrorClose: () => removeToastByKey("authSignInService"),
  };
};
