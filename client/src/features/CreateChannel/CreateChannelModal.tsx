import { faUserPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormField from "../../components/FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation, useQueryClient } from "react-query";
import { createChannel } from "../../services/channels";
import React from "react";
import { useAppDispatch } from "../../store";
import { closeModal } from "./channelModalSlice";

export default function CreateChannelModal() {
  const currentUserId = localStorage.getItem("userId") as string;

  interface FormValues {
    channelname: string;
    description: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const queryClient = useQueryClient();

  const createChannelMutation = useMutation({
    mutationFn: ({ channelname, description }: FormValues) =>
      createChannel(channelname, description, currentUserId),
    onSuccess: () => {
      console.log("channel created");
      queryClient.invalidateQueries({ queryKey: ["channels"], exact: true });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    createChannelMutation.mutate(formValues);
    handleClose();
  };

  // Closing modal
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal>
      <header className="bg-cyan-500 text-white p-4 pr-2 rounded-t-xl flex justify-between">
        <h1 className="text-white">Create channel</h1>
        <button
          onClick={handleClose}
          className="hover:bg-cyan-600 rounded-full p-2 w-10"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-8"
      >
        <FormField
          name="channel name"
          inputType="text"
          attributes={{
            ...register("channelname", {
              required: "channelname is required",
              maxLength: {
                value: 50,
                message: "channelname cannot be longer than 50 characters",
              },
            }),
          }}
        />
        {errors.channelname?.message && (
          <ErrorMessage message={errors.channelname.message} />
        )}
        <FormField
          name="description"
          inputType="text"
          attributes={{
            ...register("description", {
              maxLength: {
                value: 1000,
                message:
                  "channel description cannot be longer than 1000 characters",
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
    <div className="fixed left-0 top-0 w-screen h-screen bg-cyan-800/50 z-30">
      <div className="w-11/12 sm:w-3/4 relative top-20 m-auto rounded-xl shadow bg-white">
        {children}
      </div>
    </div>
  );
}
