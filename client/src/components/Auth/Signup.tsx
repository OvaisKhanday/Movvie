import { useState } from "react";
import { Input, Button, ProfileInput } from "../ui";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/features/auth/authSlice";

type SignupSchema = {
  username: string;
  email: string;
  password: string;
  age: number;
  name: string;
  profile?: FileList;
};

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      age: 18,
      profile: undefined,
      password: "",
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    console.log(data);
    setIsSubmitting(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        data
      );

      if (response.data) {
        dispatch(login(response.data.user));

        navigate("/");
      }
    } catch (error) {
      console.log("Error sign up", error);
      const axiosError = error as AxiosError<ApiResponse>;
      setError(axiosError.response?.data.message ?? "Error in Sign up");
    } finally {
      setIsSubmitting(false);
      setError("");
    }
  };

  return (
    <div className="bg-secondary w-[35%] flex flex-col items-start px-10 py-5 gap-5 rounded-md shadow-sm">
      <h2 className="text-heading-lg font-sans text-onPrimary/85 capitalize">
        Sign up
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-3 p-2"
      >
        <ProfileInput
          type="file"
          {...register("profile")}
          error={errors.profile ? errors.profile.message : undefined}
          accept="image/jpeg, image/jpg, image/png"
        />
        <Input
          label="Full name"
          {...register("name", { required: "Can't be empty" })}
          error={errors.name ? errors.name.message : undefined}
        />
        <Input
          label="username"
          {...register("username", { required: "Can't be empty" })}
          error={errors.username ? errors.username.message : undefined}
        />

        <Input
          label="email"
          {...register("email", {
            required: "Can't be empty",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          error={errors.email ? errors.email.message : undefined}
        />
        <Input
          type="password"
          label="password"
          {...register("password", { required: "Can't be empty" })}
          error={errors.password ? errors.password.message : undefined}
        />
        <Input
          type="number"
          label="age"
          {...register("age", { required: "Can't be empty", min: 1, max: 69 })}
          error={errors.age ? errors.age.message : undefined}
        />

        <Button type="submit" className="mt-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="animate-spin block w-4 h-4 rounded-full bg-transparent border-[2px] border-current  border-t-transparent text-white">
              <span className="sr-only">loading...</span>
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
      {error && <p>{error}</p>}

      <span className="self-center font-sans font-light text-sm text-onPrimary/80">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Login
        </Link>
      </span>
    </div>
  );
};

export default Signup;
