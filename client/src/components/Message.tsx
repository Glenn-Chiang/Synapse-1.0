import React, { useRef, useEffect, useState } from "react";
import { Message } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { useDeleteMessage, useEditMessage } from "../requests/messages";

export function OutgoingMessage({ message }: { message: Message }) {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  const [editIsToggled, setEditIsToggled] = useState(false);
  const [deleteIsToggled, setDeleteIsToggled] = useState(false);

  const deleteMessage = useDeleteMessage();

  return (
    <li
      ref={ref}
      className="self-end flex flex-col items-end relative group w-full"
    >
      <p className="bg-cyan-500 text-white p-2 rounded-xl shadow max-w-xs break-words hover:bg-cyan-600 transition">
        {message.text}
      </p>
      <span className="p-2 text-sm text-slate-400">{message.timestamp}</span>
      <MessageTools
        toggleEdit={() => setEditIsToggled((prev) => !prev)}
        toggleDelete={() => setDeleteIsToggled((prev) => !prev)}
      />
      {editIsToggled && (
        <EditModal message={message} close={() => setEditIsToggled(false)} />
      )}
      {deleteIsToggled && (
        <DeleteModal
          handleSubmit={() => deleteMessage(message.id)}
          close={() => setDeleteIsToggled(false)}
        />
      )}
    </li>
  );
}

type EditModalProps = {
  close: () => void;
  message: Message;
};

function EditModal({ close, message }: EditModalProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isSaving, setIsSaving] = useState(false);

  const editMessage = useEditMessage();

  const handleSubmit = () => {
    const text = inputRef.current?.value;
    if (!text) {
      return;
    }
    editMessage(message.id, text);
    setIsSaving(true)
    close();
  };

  return (
    <ModalContainer>
      {isSaving ? (
        "Saving..."
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="text-cyan-500">Edit message</h2>
            <FontAwesomeIcon
              icon={faX}
              onClick={close}
              className="absolute right-2 top-2 p-2 hover:bg-slate-200 rounded-md w-4 h-4"
            />
          </div>
          <textarea
            className="bg-slate-100 rounded shadow p-2"
            ref={inputRef}
          />
          <button
            onClick={handleSubmit}
            className="bg-cyan-500 text-white w-max p-2 rounded-md hover:bg-cyan-600"
          >
            Save changes
          </button>
        </>
      )}
    </ModalContainer>
  );
}

type DeleteModalProps = {
  close: () => void;
  handleSubmit: () => void;
};

function DeleteModal({ close, handleSubmit }: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onConfirm = () => {
    setIsDeleting(true);
    handleSubmit();
  };

  return (
    <ModalContainer>
      {isDeleting ? (
        "Deleting..."
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="text-cyan-500">
              Are you sure you want to delete this message?
            </h2>
            <FontAwesomeIcon
              icon={faX}
              onClick={close}
              className="absolute right-2 top-2 p-2 hover:bg-slate-200 rounded-md w-4 h-4"
            />
          </div>
          <button
            onClick={onConfirm}
            className="bg-cyan-500 text-white w-max p-2 rounded-md hover:bg-cyan-600"
          >
            Confirm
          </button>
        </>
      )}
    </ModalContainer>
  );
}

function ModalContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full z-10 ">
      <div className="fixed top-0 w-full h-screen bg-cyan-600/20 p-4 ">
        <section className="fixed top-60 w-1/2 bg-white rounded-xl flex flex-col p-4 gap-2 shadow ">
          {children}
        </section>
      </div>
    </div>
  );
}

type MessageToolsProps = {
  toggleEdit: () => void;
  toggleDelete: () => void;
};

function MessageTools({ toggleEdit, toggleDelete }: MessageToolsProps) {
  return (
    <div className="hidden group-hover:flex p-2 rounded-xl bg-white shadow gap-2 absolute -bottom-4">
      <FontAwesomeIcon
        onClick={toggleEdit}
        icon={faEdit}
        className="shadow text-white bg-cyan-500 hover:bg-cyan-600 p-2 rounded-md transition"
      />
      <FontAwesomeIcon
        onClick={toggleDelete}
        icon={faTrash}
        className="shadow text-white bg-red-500 hover:bg-red-600 p-2 rounded-md transition"
      />
    </div>
  );
}

export function IncomingMessage({ message }: { message: Message }) {
  const ref = useRef<HTMLLIElement>(null);

  const usernameIsShown = message.roomType === "Channel";

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <li ref={ref} className="self-start flex flex-col ">
      {usernameIsShown && (
        <span className="p-2 text-cyan-500 font-medium">
          {message.sender.username}
        </span>
      )}
      <p className="bg-white p-2 rounded-xl shadow max-w-xs break-words">
        {message.text}
      </p>
      <span className="p-2 text-sm text-slate-400">{message.timestamp}</span>
    </li>
  );
}
