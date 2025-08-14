import AlertRef from "@/components/AlertRef";
import { Button } from "@/components/ui/button";
import { Input, InputRoot } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useLoginFormHooks from "./LoginForm.hooks";

const LoginForm = () => {
  const { formError, formErrorClose, setValues, values, errors, onSubmit } =
    useLoginFormHooks();

  return (
    <form className="p-4 grid gap-2" onSubmit={onSubmit}>
      {formError && (
        <div className="text-red-600 text-sm">
          <span>{formError?.message}</span>
          <button onClick={formErrorClose}>TESTE</button>
        </div>
      )}

      <AlertRef ref="login-form" />

      <InputRoot>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          value={values.email}
          onChange={({ target: { value } }) => {
            setValues({ email: value });
          }}
          type="email"
          errorMessage={errors.email?.message}
        />
      </InputRoot>

      <InputRoot>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          value={values.password}
          onChange={({ target: { value } }) => {
            setValues({ password: value });
          }}
          type="password"
          errorMessage={errors.password?.message}
        />
      </InputRoot>

      <div className="flex justify-end">
        <Button type="submit">Entrar</Button>
      </div>
    </form>
  );
};

export default LoginForm;
