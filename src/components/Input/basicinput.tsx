import { InputFProps } from "./types";

function InputF({ label, name, value, onChange, placeholder }: InputFProps) {
  return (
    <div className={"w-full"}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={"text"}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        placeholder={placeholder}
        className="mt-1  block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm"
      />
    </div>
  );
}

export default InputF;
