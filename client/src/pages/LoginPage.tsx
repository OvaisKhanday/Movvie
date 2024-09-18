import { Login } from "../components";
import { AppLogo } from "../components/logos";

function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-4">
      <span>
        <AppLogo className="text-primary w-full" />
      </span>
      <Login />
    </div>
  );
}

export default LoginPage;
