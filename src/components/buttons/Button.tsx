import { Link } from "react-router-dom";
import { ButtonProps } from ".";
import Loader from "./loader";

export default function Button({
  text,
  type,
  Icon,
  hasIcon,
  onClick,
  path,
  ref,
  children,
  loading,
}: ButtonProps) {
  return (
    <>
      {type === "primary" ? (
        <>
          <button
            onClick={onClick}
            className={`inline-flex w-full justify-center font-bold rounded-md border-0 border-transparent  bg-green-500 px-4 py-3 text-base text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm ${children}`}
          >
            <div className="flex gap-2 items-center justify-center">
              {loading && <Loader />}

              <span>{text}</span>
              {hasIcon && <>{Icon}</>}
            </div>
          </button>
        </>
      ) : type === "secondary" ? (
        <>
          <div>
            <button
              onClick={onClick}
              ref={ref}
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:mt-0 sm:text-sm"
            >
              <div className="flex gap-2 items-center justify-center">
                {loading && <Loader />}

                <span>{text}</span>
                {hasIcon && <>{Icon}</>}
              </div>
            </button>
          </div>
        </>
      ) : type === "link" ? (
        <>
          <div>
            <Link
              to={path}
              onClick={onClick}
              className="inline-flex items-center gap-2 rounded-md border-transparent border border-gray-300
                   py-2 px-4 text-sm  text-green-700 font-medium shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto hover:text-gray-100
                   h-10  transition-colors duration-150   focus:shadow-outline "
            >
              <div className="flex gap-2 items-center justify-center">
                <span>{text}</span>
                {hasIcon && <>{Icon}</>}
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <button
              onClick={onClick}
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <div className="flex gap-2 items-center justify-center">
                <span>{text}</span>
                {hasIcon && <>{Icon}</>}
              </div>
            </button>
          </div>
        </>
      )}
    </>
  );
}
