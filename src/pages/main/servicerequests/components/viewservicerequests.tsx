import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  UserIcon,
  XCircleIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { startCase } from "components/utils";

export default function ViewServiceRequests({ selected }: any) {
  console.log(selected);
  return (
    <>
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Breadcrumb */}
              <section className="pb-2 px-0">
                <nav
                  className="flex items-start space-x-3"
                  aria-label="Breadcrumb"
                >
                  <a
                    href="/"
                    className="inline-flex items-center space-x-3 text-sm font-light text-gray-900"
                  >
                    <span className="text-gray-600">Home</span>
                  </a>
                  <a
                    href="/service-requests"
                    className="inline-flex items-center space-x-3 text-sm font-light text-gray-900"
                  >
                    <ChevronRightIcon
                      className="-ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-600">Service Requests</span>
                  </a>
                </nav>

                <div className="flex mt-4 flex-col">
                  <div className="flex justify-between items-center mr-4">
                    <h3 className="text-2xl font-medium leading-6 text-black">
                      {startCase(selected?.service.name)}
                    </h3>
                    <div className="flex space-x-6">
                      <button
                        className={`inline-flex gap-1 w-full justify-center font-medium rounded-lg border text-black border-gray-100 px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm `}
                      >
                        <XCircleIcon
                          className="-ml-2 h-5 w-5 text-black"
                          aria-hidden="true"
                        />
                        <span>Decline</span>
                      </button>

                      <button
                        className={`inline-flex gap-1 w-full justify-center font-medium rounded-lg border-0 border-transparent bg-green-500 px-4 py-2 text-base text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm`}
                      >
                        <CheckBadgeIcon
                          className="-ml-2 h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                        <span>Accept</span>
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div>
                      <div className="flex space-x-5">
                        <div>
                          <label className="text-gray-400 font-light">
                            Created on:{" "}
                          </label>
                          <span className="text-gray-600 font-light">
                            {moment(selected?.createdAt)?.format(
                              "MMM DD, YYYY"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="py-4 h-96">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center text-gray-600">
                      <ShoppingCartIcon className="w-6" />
                      <span>Request Details</span>
                    </div>
                    <span>
                      Date of Service:{" "}
                      <span className="text-gray-800 text-base">
                        {moment(selected?.dateOfService)?.format(
                          "MMM DD, YYYY"
                        )}
                      </span>
                    </span>
                    <span>
                      Start Date:{" "}
                      <span className="text-gray-800 text-base">
                        {moment(selected?.startDate)?.format(
                          "MMM DD, YYYY"
                        )}
                      </span>
                    </span>
                    <span>
                      Completion Date:{" "}
                      <span className="text-gray-800 text-base">
                        {moment(selected?.completionDate)?.format(
                          "MMM DD, YYYY"
                        )}
                      </span>
                    </span>
                    <span>
                      Payment Status:{" "}
                      <span className="text-gray-800 text-base">
                        {startCase(selected?.paymentStatus)}
                      </span>
                    </span>
                    <span>
                      Status:{" "}
                      <span className="text-gray-800 text-base">
                        {startCase(selected?.status)}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center text-gray-600">
                      <UserIcon className="w-6" />
                      <span>Customer</span>
                    </div>
                    <span>
                      Name:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.user.name}
                      </span>
                    </span>
                    <span>
                      Email:{" "}
                      <span className="text-gray-800 text-base underline decoration-dotted">
                        <a className="underline decoration-dotted decoration-gray-400" href={`mailto:${selected?.user.email}`}>{selected?.user.email}</a>
                      </span>
                    </span>
                    <span>
                      Phone:{" "}
                      <span className="text-gray-800 text-base  underline decoration-dotted">
                      <span className="text-gray-800 text-base underline decoration-dotted">
                        <a className="underline decoration-dotted decoration-gray-400" href={`mailto:${selected?.user.phone}`}>{selected?.user.phone}</a>
                      </span>
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 mt-2 items-center text-gray-600">
                      <DocumentTextIcon className="w-6" />
                      <span>Request Details</span>
                    </div>
                    <span>
                      <span className="text-gray-800 text-base">
                        {selected?.description}
                      </span>
                    </span>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
