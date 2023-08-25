import { Link } from "react-router-dom";
import FormField from "../components/FormField";

export default function Register() {

  return (
    <main className="bg-slate-100 h-screen flex items-center">
      <section className="bg-white rounded-xl w-4/5 m-auto drop-shadow-md ">
        <header className="text-center p-4">
          <h1 className="text-cyan-500 text-4xl text-center p-4">Synapse</h1>
          <p className="pb-4 font-medium">Real-Time Messaging</p>
        </header>
        <form className="flex flex-col items-start gap-8 px-8 py-4 w-full">
          <FormField name="username" inputType="text" />
          <FormField name="password" inputType="password" />
          <div className="p-4 flex flex-col items-center w-full">
            <button className="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600">
              Register
            </button>
            <p className="pt-4">
              Already have an account?{' '}
              <Link to={"/login"} className="text-cyan-600 hover:underline hover:text-cyan-500 underline-offset-4">
                Login
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
