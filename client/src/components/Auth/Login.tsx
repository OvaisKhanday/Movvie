import { useState } from "react";
import { Input, Button } from "../ui";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/features/auth/authSlice";

type LoginSchema = {
  identifier: string;
  password: string;
};

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
    setIsSubmitting(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        data
      );

      if (response.data) {
        dispatch(login(response.data.user));

        navigate("/");
      }
    } catch (error) {
      console.log("Error login", error);
      const axiosError = error as AxiosError<ApiResponse>;
      setError(axiosError.response?.data.message ?? "Error in log in");
    } finally {
      setIsSubmitting(false);
      setError("");
    }
  };

  return (
    <div className="bg-secondary w-[35%] flex flex-col items-start px-10 py-5 gap-5 rounded-md shadow-sm">
      <h2 className="text-heading-lg font-sans text-onPrimary/85 capitalize">
        Login
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-3 p-2"
      >
        <Input
          label="username / Email"
          {...register("identifier", {
            required: "Can't be empty",
          })}
          error={errors.identifier ? errors.identifier.message : undefined}
        />
        <Input
          type="password"
          label="password"
          {...register("password", { required: "Can't be empty" })}
          error={errors.password ? errors.password.message : undefined}
        />

        <Button type="submit" className="mt-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="animate-spin block w-4 h-4 rounded-full bg-transparent border-[2px] border-current  border-t-transparent text-white">
              <span className="sr-only">loading...</span>
            </span>
          ) : (
            "Login to your account"
          )}
        </Button>
      </form>
      {error && <p>{error}</p>}

      <span className="self-center font-sans font-light text-sm text-onPrimary/80">
        Don't have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Sign up
        </Link>
      </span>
    </div>
  );
};

export default Login;
