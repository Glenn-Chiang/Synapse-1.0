import { faUserPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormField from "../../components/FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { createChat } from "../../requests/chats";
import React from "react";

export default function CreateChat({handleClose}: {handleClose: () => void}) {
  const currentUserId = localStorage.getItem("userId") as string;
  const navigate = useNavigate();

  interface FormValues {
    chatname: string;
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
      navigate("/chats");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    createchatMutation.mutate(formValues);
  };

  return (
    <Modal>
      <header className="bg-cyan-500 text-white p-4 pr-2 rounded-t-xl flex justify-between">
        <h1 className="text-white">
          Create chat
        </h1>
        <button onClick={handleClose} className="hover:bg-cyan-600 rounded-full p-2 w-10">
          <FontAwesomeIcon icon={faX}/>
        </button>
      </header>
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
    </Modal>
  );
}

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-cyan-800/50 z-10">
      <div className="w-1/2 relative top-20 m-auto rounded-xl shadow bg-white">
        {children}
      </div>
    </div>
  );
}
