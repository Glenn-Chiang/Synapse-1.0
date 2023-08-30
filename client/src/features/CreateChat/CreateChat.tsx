import { faUserPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormField from "../../components/FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { createChat } from "../../requests/chats";


export default function CreateChat() {
  const currentUserId = localStorage.getItem("userId") as string;
  const navigate = useNavigate();

  interface FormValues {
    "chatname": string;
    description: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const createchatMutation = useMutation({
    mutationFn: ({ chatname, description }: FormValues) =>
      createChat(chatname, description, currentUserId),
    onSuccess: () => {
      console.log("chat created");
      navigate('/chats')
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    createchatMutation.mutate(formValues);
  };


  return (
    <main className="bg-white">
      <div className="w-full p-2 flex items-center justify-center gap-2 shadow">
        <h1 className="flex gap-2 items-center text-cyan-500">Create chat</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-slate-500 hover:bg-slate-200 rounded-full p-2 w-8 absolute right-2 text-xs"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-8"
      >
        <FormField
          name="chat name"
          inputType="text"
          attributes={{
            ...register("chatname", {
              required: "chatname is required",
              maxLength: {
                value: 50,
                message: "Chatname cannot be longer than 50 characters",
              },
            }),
          }}
        />
        {errors.chatname?.message && (
          <ErrorMessage message={errors.chatname.message} />
        )}

        <FormField
          name="description"
          inputType="text"
          attributes={{
            ...register("description", {
              maxLength: {
                value: 1000,
                message:
                  "Chat description cannot be longer than 1000 characters",
              },
            }),
          }}
        />

        <section>
          <h2 className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faUserPlus} />
            Add members
          </h2>
        </section>

        <div className="text-center pt-4">
          <button className="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600">
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
