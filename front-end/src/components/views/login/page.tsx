import FormLogin from "./_components/FormLogin";
import { LoginPageContextProvider } from "./page.provider";

export const LoginPage = () => {
  return (
    <LoginPageContextProvider>
      <h1 className="text-3xl font-semibold leading-12 border-b mb-2">Login</h1>
      <FormLogin />
    </LoginPageContextProvider>
  );
};
