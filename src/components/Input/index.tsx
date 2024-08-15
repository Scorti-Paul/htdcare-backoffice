import { InputProps } from "./types";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export default function Input({
  label,
  optionalLabel,
  type,
  field,
  required,
  name,
  value,
  onChange,
  hasShowPassword,
  handleShowHidePassword,
  autoComplete,
  placeholder,
  inputLength,
  selectOptions,
  id,
  desc,
  disable,
}: InputProps) {
  const [inputBlur, setInputBlur] = useState(false);

  const handleBlur = (e: any) => {
    if (optionalLabel === true) {
      !e.target.value ? setInputBlur(true) : setInputBlur(false);
    }
  };

  return (
    <>
      {field === "input" ? (
        type === "date" ? (
          <>
            <div
              className={`${
                inputLength === "small"
                  ? "col-span-6 sm:col-span-6 lg:col-span-2 relative"
                  : inputLength === "medium"
                  ? "col-span-6 sm:col-span-3 relative"
                  : inputLength === "large"
                  ? "col-span-6 relative"
                  : "col-span-6 sm:col-span-6 lg:col-span-2 relative"
              }
                `}
            >
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
              >
                {label}{" "}
                <span className="mt-2 text-sm text-red-400">
                  {optionalLabel}
                </span>
              </label>

              <DatePicker
                className={
                  !inputBlur
                    ? `mt-1 block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm  form-control form-input py-3.5`
                    : `mt-1 block w-full rounded-md  border-red-400 shadow-sm placeholder:text-red-200 bg-red-50/40 focus:border-red-500 focus:ring-red-500 sm:text-sm form-control form-input py-3.5`
                }
                selected={moment(value || new Date()).toDate()}
                dateFormat="MMMM d, yyyy"
                onChange={(date) =>
                  onChange
                    ? onChange({
                        target: {
                          name: name,
                          value: moment(date).toDate(),
                        },
                      })
                    : () => {}
                }
                onBlur={handleBlur}
              />

              {hasShowPassword === "disable" ? (
                ""
              ) : !hasShowPassword ? (
                <div className="flex items-center gap-2">
                  <EyeSlashIcon
                    className="w-5 text-gray-400 absolute top-8 right-3 z-30 hover:cursor-pointer"
                    onClick={handleShowHidePassword}
                  />
                </div>
              ) : hasShowPassword ? (
                <div className="flex items-center gap-2">
                  <EyeIcon
                    className="transition-all duration-100 ease-in w-5 text-gray-400 absolute top-8 right-3 z-30 hover:cursor-pointer"
                    onClick={handleShowHidePassword}
                  />
                </div>
              ) : (
                ""
              )}
              {/* <span></span> */}
              {inputBlur && (
                <span className="mt-1 text-xs text-red-400 absolute ">
                  This field is required
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <div
              className={
                inputLength === "small"
                  ? "col-span-6 sm:col-span-6 lg:col-span-2 relative"
                  : inputLength === "medium"
                  ? "col-span-6 sm:col-span-3 relative"
                  : inputLength === "large"
                  ? "col-span-6 relative"
                  : "col-span-6 sm:col-span-6 lg:col-span-2 relative"
              }
            >
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
              >
                {label}{" "}
                <span className="mt-2 text-sm text-red-400">
                  {optionalLabel}
                </span>
              </label>
              <input
                type={
                  hasShowPassword === "disable"
                    ? `${type}`
                    : hasShowPassword
                    ? "password"
                    : `${type}`
                }
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                required={required}
                disabled={disable}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={
                  !inputBlur
                    ? `mt-2 block w-full rounded-md border-gray-300 shadow-sm py-3 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm`
                    : `mt-2 block w-full  rounded-md border-red-400 shadow-sm py-3 placeholder:text-red-200 bg-red-50/40 focus:border-red-500 focus:ring-red-500 sm:text-sm`
                }
              />
              {hasShowPassword === "disable" ? (
                ""
              ) : !hasShowPassword ? (
                <div className="flex items-center gap-2">
                  <EyeSlashIcon
                    className="w-5 text-gray-400 absolute top-8 right-3 z-30 hover:cursor-pointer"
                    onClick={handleShowHidePassword}
                  />
                </div>
              ) : hasShowPassword ? (
                <div className="flex items-center gap-2">
                  <EyeIcon
                    className="transition-all duration-100 ease-in w-5 text-gray-400 absolute top-10 right-3 z-30 hover:cursor-pointer"
                    onClick={handleShowHidePassword}
                  />
                </div>
              ) : (
                ""
              )}
              {/* <span></span> */}
              {inputBlur && (
                <span className="mt-1 text-xs text-red-400 absolute ">
                  This field is required
                </span>
              )}
            </div>
          </>
        )
      ) : field === "textarea" ? (
        <>
          <div
            className={
              inputLength === "small"
                ? "col-span-6 sm:col-span-6 lg:col-span-2"
                : inputLength === "medium"
                ? "col-span-6 sm:col-span-3"
                : inputLength === "large"
                ? "col-span-6"
                : "col-span-6 sm:col-span-6 lg:col-span-2"
            }
          >
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}{" "}
              <span className="mt-2 text-sm text-red-400">{optionalLabel}</span>
            </label>
            <div className="mt-1">
              <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                rows={3}
                placeholder={placeholder}
                className={
                  !inputBlur
                    ? `mt-1 block w-full rounded-md border-gray-300 shadow-sm resize-none placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-700`
                    : `mt-1 block w-full rounded-md border-red-400 shadow-sm resize-none placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500 sm:text-sm`
                }
                defaultValue={""}
              />
            </div>
          </div>
        </>
      ) : field === "select" ? (
        <>
          <div
            className={
              inputLength === "small"
                ? "col-span-6 sm:col-span-6 lg:col-span-2"
                : inputLength === "medium"
                ? "col-span-6 sm:col-span-3"
                : inputLength === "large"
                ? "col-span-6"
                : "col-span-6 sm:col-span-6 lg:col-span-2"
            }
          >
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}{" "}
              <span className="mt-2 text-sm text-red-400">{optionalLabel}</span>
            </label>
            <select
              id={name}
              value={value}
              onChange={onChange}
              onBlur={handleBlur}
              name={name}
              autoComplete={autoComplete}
              className="mt-2 py-3 block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              <>
                {selectOptions?.map((selectOption: any) => (
                  <option value={selectOption.value} key={selectOption.value}>
                    {selectOption.label}
                  </option>
                ))}
              </>
            </select>
          </div>
        </>
      ) : field === "checkbox" ? (
        <>
          <label
            htmlFor={name}
            className="mb-4 ml-3 inline-block hover:cursor-pointer"
          >
            <input
              type="checkbox"
              id={id}
              onChange={onChange}
              className="transition-all duration-100 ease-in ring-0 mr-3 text-green-500 border-green-400 hover:ring-8  hover:ring-green-100 focus:ring-0 hover:cursor-pointer"
              name={name}
            />
            <span className="text-gray-600 text-sm capitalize">{label}</span>
          </label>
        </>
      ) : field === "radio" ? (
        <>
          <div>
            <label
              htmlFor={id}
              className="mb-4 mr-2 ml-3 inline-block text-sm font-medium text-gray-700 hover:cursor-pointer"
            >
              <input
                type="radio"
                id={id}
                className="transition-all duration-100 ease-in ring-0 mr-4 rounded-full outline-none text-green-500 border-green-400 hover:ring-8  hover:ring-green-100 focus:ring-0 hover:cursor-pointer"
                name={name}
                onChange={onChange}
              />
              <span className="text-gray-600">{label}</span>
              <br />
              {desc && (
                <span className="text-gray-400 ml-8 block text-sm">{desc}</span>
              )}
            </label>
          </div>
        </>
      ) : field === "upload" ? (
        <>
          <div
            className={
              inputLength === "small"
                ? "col-span-6 sm:col-span-6 lg:col-span-2"
                : inputLength === "medium"
                ? "col-span-6 sm:col-span-3"
                : inputLength === "large"
                ? "col-span-6"
                : "col-span-6 sm:col-span-6 lg:col-span-2"
            }
          >
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor={name}
                    className="relative cursor-pointer rounded-md bg-white font-medium text-green-600 focus-within:outline-none focus-within:ring-offset-2 hover:text-green-500 text-center"
                  >
                    <p className="text-center">Upload a file</p>
                    <input
                      id={name}
                      name={name}
                      type="file"
                      onChange={onChange}
                      accept=".png,.jpg,.jpeg"
                      className="sr-only"
                    />
                  </label>
                  {/* <p className="pl-1">or drag and drop</p> */}
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={
              inputLength === "small"
                ? "col-span-6 sm:col-span-6 lg:col-span-2"
                : inputLength === "medium"
                ? "col-span-6 sm:col-span-3"
                : inputLength === "large"
                ? "col-span-6"
                : "col-span-6 sm:col-span-6 lg:col-span-2"
            }
          >
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              id={name}
              autoComplete={autoComplete}
              placeholder={placeholder}
              className="mt-1  block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>
        </>
      )}
    </>
  );
}
