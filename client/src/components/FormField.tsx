import {UseFormRegisterReturn} from 'react-hook-form'

type FormFieldProps = {
  name: string;
  inputType: string;
  attributes: UseFormRegisterReturn
};

export default function FormField({ name, inputType, attributes }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <label htmlFor={name} className="capitalize">
        {name}
      </label>
      <input
        id={name}
        type={inputType}
        {...attributes}
        className="p-2 bg-slate-100 rounded-md shadow"
      />
    </div>
  );
}
