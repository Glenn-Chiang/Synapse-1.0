type FormFieldProps = {
  name: string;
  inputType: string;
};

export default function FormField({ name, inputType }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <label htmlFor={name} className="capitalize">
        {name}
      </label>
      <input
        id={name}
        type={inputType}
        className="p-2 bg-slate-100 rounded-md shadow"
      />
    </div>
  );
}
