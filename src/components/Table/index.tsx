import {
  EyeIcon,
  PencilSquareIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/20/solid";
import { DocumentIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Column, TableProps } from "./types";
import { useLocation } from "react-router-dom";
import {Fragment} from "react";

export default function Table({columns, data}: TableProps) {
  const location = useLocation();

  const currentUrl = location.pathname;

  const getKey = (row: any, keys: string[]): any => {
    let value = row;
    for (const key of keys) {
      value = value?.[key];
    }
    return value;
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {columns?.map((col: Column) => (
              <Fragment key={col?.headerText}>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  <span className="group inline-flex">{col?.headerText}</span>
                </th>
              </Fragment>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {data?.map((row: any, index: number) => (
            <Fragment key={index}>
              <tr>
                <>
                  {columns?.map((col: Column, index) => (
                    <Fragment key={index}>
                      {col?.type === "action" ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {col?.actions?.map(({onClick, name}, index) => (
                            <Fragment key={index}>
                              <TableButton
                                onClick={(e: any) => onClick(e, row)}
                                type={name}
                                key={index}
                              />
                            </Fragment>
                          ))}
                        </td>
                      ) : (
                        <Fragment key={index}>
                          <td
                            className={`${
                              col?.capitalize && "capitalize"
                            } whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 `}
                          >
                            <div className="flex flex-col">
                              {col?.keys?.value?.map((key: string, index) => {
                                const newkey = key?.split(".");

                                if (col?.keys?.type === "date") {
                                  return (
                                    <span
                                      className={
                                        index !== 0 ? "text-gray-400" : ""
                                      }
                                    >
                                      {moment(getKey(row, newkey))?.format(
                                        col?.format || "MMM DD, YYYY"
                                      ) || "N/A"}
                                    </span>
                                  );
                                }

                                if (col?.keys?.type === "currency") {
                                  return (
                                    <span
                                      className={
                                        index !== 0 ? "text-gray-400" : ""
                                      }
                                    >
                                      {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "GHS",
                                      }).format(getKey(row, newkey)) || "N/A"}
                                    </span>
                                  );
                                }

                                return (
                                  <span
                                    className={` ${
                                      index !== 0 ? "text-gray-400" : ""
                                    }`}
                                  >
                                    {getKey(row, newkey) || "N/A"}
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                        </Fragment>
                      )}
                    </Fragment>
                  ))}
                </>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>

      {data === undefined ? (
        <div className="flex flex-col items-center justify-center gap-3 py-28">
          <DocumentIcon stroke="green" strokeWidth={0.5} className="w-36" />
          <MagnifyingGlassIcon stroke="green" className="w-14 -mt-24 mb-4" />
          <h3 className="text-3xl font-semibold ">No data found</h3>
          <p className="-mt-2">There seems to be no data in the collection</p>
          <a
            href={currentUrl}
            className="bg-green-600 px-8 py-3 text-white font-medium mt-4 rounded-md hover:bg-green-700 transition-all duration-300"
          >
            Reload
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const TableButton = ({
  type,
  onClick,
  onEdit,
  onView,
}: {
  type: string;
  onClick?: any;
  onEdit?: any;
  onView?: any;
}) => {
  switch (type) {
    case "view":
      return (
        <button
          type="button"
          onClick={onClick}
          className=" ml-1 inline-flex items-center rounded-full border border-transparent  text-white shadow-sm focus:outline-none  focus:ring-offset-2"
        >
          <EyeIcon
            className="h-5 w-5 text-gray-400 hover:text-green-700"
            aria-hidden="true"
          />
        </button>
      );
    case "edit":
      return (
        <button
          type="button"
          onClick={onClick}
          className=" ml-1 inline-flex items-center rounded-full border border-transparent  text-white shadow-sm focus:outline-none  focus:ring-offset-2"
        >
          <PencilSquareIcon
            className="h-5 w-5 text-gray-400 hover:text-green-700"
            aria-hidden="true"
          />
        </button>
      );
    case "suspend":
      return (
        <button
          type="button"
          onClick={onClick}
          className=" ml-1 inline-flex items-center rounded-full border border-transparent  text-white shadow-sm focus:outline-none  focus:ring-offset-2"
        >
          <ShieldExclamationIcon
            className="h-5 w-5 text-gray-400 hover:text-green-700"
            aria-hidden="true"
          />
        </button>
      );

    default:
      return (
        <button
          type="button"
          onClick={onClick}
          className=" ml-1 inline-flex items-center rounded-full border border-transparent  text-white shadow-sm focus:outline-none  focus:ring-offset-2"
        >
          <EyeIcon
            className="h-5 w-5 text-gray-400 hover:text-green-700"
            aria-hidden="true"
          />
        </button>
      );
  }
};
