import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {UseFormRegisterReturn} from 'react-hook-form'

type FormFieldProps = {
  name: string;
  inputType: string;
  attributes: UseFormRegisterReturn
  icon: IconDefinition
};

export default function FormField({ name, inputType, attributes, icon }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <label htmlFor={name} className="capitalize flex gap-2 items-center">
        <FontAwesomeIcon icon={icon}/>
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
