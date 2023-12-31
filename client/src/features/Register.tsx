import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useForm, SubmitHandler } from "react-hook-form";
import { faLock, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { createUser } from "../services/users";
import { AxiosError } from "axios";
import { useEffect } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>();

  interface FormValues {
    username: string;
    password: string;
  }

  const usernameAttributes = {
    ...register("username", { required: "Username is required" }),
  };
  const passwordAttributes = {
    ...register("password", { required: "Password is required" }),
  };

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    const { username, password } = formValues;
    try {
      await createUser(username, password);
      console.log("Registered!");
      navigate("/login"); // Redirect to login screen after successful registration
    } catch (e) {
      const error = e as AxiosError;
      console.error(error.response?.data);
    }
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <main className="bg-slate-100 min-h-screen p-2 sm:p-8 flex items-center">
      <section className="bg-white rounded-xl w-11/12 sm:w-4/5 m-auto drop-shadow-md ">
        <header className="text-center p-4">
          <h1 className="text-cyan-500 text-4xl text-center p-4">Synapse</h1>
          <p className="pb-4 font-medium">Real-Time Messaging</p>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-8 px-8 py-4 w-full"
        >
          <FormField
            name="username"
            inputType="text"
            attributes={usernameAttributes}
            icon={faUserCircle}
          />
          {errors.username && (
            <ErrorMessage message={errors.username.message} />
          )}
          <FormField
            name="password"
            inputType="password"
            attributes={passwordAttributes}
            icon={faLock}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
          <div className="p-4 flex flex-col items-center w-full">
            <button className="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600">
              Register
            </button>
            <p className="pt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-cyan-600 hover:underline hover:text-cyan-500 underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

function ErrorMessage({ message }: { message: string | undefined }) {
  return <p className="p-2 rounded-md bg-rose-200 text-rose-500">{message}</p>;
}
