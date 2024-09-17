import { Signup } from "../components";
import { AppLogo } from "../components/logos";

function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <span>
        <AppLogo className="text-primary w-full" />
      </span>
      <Signup />
    </div>
  );
}

export default SignupPage;
