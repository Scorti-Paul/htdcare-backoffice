import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { IDynamicInput, IDynamicProps } from "pages/main/products/types";
import React, { ChangeEvent } from "react";

const DynamicInputComponent: React.FC<IDynamicProps> = ({
  inputs,
  setInputs,
}) => {
  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name as keyof IDynamicInput] = value;
    setInputs(newInputs);
  };

  const handleAddInput = (e: any) => {
    e?.preventDefault();
    setInputs([...inputs, { unit: "", price: "" }]);
  };
  const handleRemove = (e: any, index: number) => {
    e?.preventDefault();
    const remainder = inputs?.filter((item) => index !== inputs?.indexOf(item));
    setInputs(remainder);
  };

  return (
    <div className="grid gap-y-2 relative">
      {inputs.map((input: IDynamicInput, index: number) => (
        <div key={index} className="grid gap-x-6 gap-y-8 grid-cols-6">
          <div className={"col-span-3 pe-8"}>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor={`unit-${index}`}
            >
              Unit:
            </label>
            <input
              type="text"
              id={`unit-${index}`}
              name="unit"
              value={input.unit}
              className="mt-1  block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm"
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div className={"col-span-3 pe-8"}>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor={`price-${index}`}
            >
              Price:
            </label>
            <input
              type="number"
              id={`price-${index}`}
              name="price"
              value={input.price}
              className="mt-1  block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm"
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <button
            onClick={(e) => handleRemove(e, index)}
            className={`${
              inputs?.length === 1 && "hidden"
            } absolute right-0 mt-3`}
          >
            <XCircleIcon className="h-5 text-red-500 w-5 mt-5" />
          </button>
        </div>
      ))}
      <button onClick={handleAddInput} className="mt-3 ">
        <PlusCircleIcon className="text-white h-6 w-6 shadow-lg rounded-full bg-green-500" />
      </button>
    </div>
  );
};

export default DynamicInputComponent;
