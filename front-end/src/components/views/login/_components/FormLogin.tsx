import AlertRef from "@/components/AlertRef";
import { Button } from "@/components/ui/button";
import { Input, InputRoot } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useLoginPageContext } from "../page.context";

const LoginForm = () => {
  const { formLogin } = useLoginPageContext();

  return (
    <form className="p-4 grid gap-2" onSubmit={formLogin.onSubmit}>
      {/* {formError && (
        <div className="text-red-600 text-sm">
          <span>{formError?.message}</span>
          <button onClick={formErrorClose}>TESTE</button>
        </div>
      )} */}

      <AlertRef ref="login-form" />

      <InputRoot>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          value={formLogin.v.email}
          onChange={({ target: { value } }) => {
            formLogin.s({ email: value });
          }}
          type="email"
          errorMessage={formLogin.e.email?.message}
        />
      </InputRoot>

      <InputRoot>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          value={formLogin.v.password}
          onChange={({ target: { value } }) => {
            formLogin.s({ password: value });
          }}
          type="password"
          errorMessage={formLogin.e.password?.message}
        />
      </InputRoot>

      <div className="flex justify-end">
        <Button type="submit">Entrar</Button>
      </div>
    </form>
  );
};

export default LoginForm;
