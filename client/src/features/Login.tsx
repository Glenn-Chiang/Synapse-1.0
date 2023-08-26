import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useForm, SubmitHandler } from "react-hook-form";
import { faLock, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import login from "../requests/auth";

export default function Login() {
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

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    const { username, password } = formValues;
    try {
      const user = await login(username, password);
      localStorage.setItem("currentUser", JSON.stringify(user)); // Store non-sensitive userinfo in localStorage for easy retrieval
      console.log(`Signed in as: ${user.username}`)
      navigate('/')

    } catch (error) {
      console.error("Error logging in:", error);
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
              Login
            </button>
            <p className="pt-4">
              New to Synapse?{" "}
              <Link
                to={"/register"}
                className="text-cyan-600 hover:underline hover:text-cyan-500 underline-offset-4"
              >
                Register
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
