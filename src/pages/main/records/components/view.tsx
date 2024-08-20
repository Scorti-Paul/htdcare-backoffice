import {
  ChevronRightIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import {
  UserIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";

export default function ViewRecord({ selected }: any) {
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
                    href="/vendors"
                    className="inline-flex items-center space-x-3 text-sm font-light text-gray-900"
                  >
                    <ChevronRightIcon
                      className="-ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-600">Vendors</span>
                  </a>
                </nav>

                <div className="flex mt-4 flex-col">
                  <div className="flex justify-between items-center mr-4">
                    <h3 className="text-2xl font-medium leading-6 text-black">
                      {selected?.name}
                    </h3>
                    <div className="flex space-x-6">
                      <a href={`mailto:${selected?.email}`}>
                        <button
                          className={`inline-flex gap-1 w-full justify-center font-medium rounded-lg border text-black border-gray-100 px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm `}
                        >
                          <EnvelopeIcon
                            className="-ml-2 h-5 w-5 text-black"
                            aria-hidden="true"
                          />
                          <span>Message</span>
                        </button>
                      </a>
                      <a className="" href={`tel:${selected?.phone}`}>
                        <button
                          className={`inline-flex gap-1 w-full justify-center font-medium rounded-lg border-0 border-transparent bg-green-500 px-4 py-2 text-base text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm`}
                        >
                          <PhoneIcon
                            className="-ml-2 h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                          <span>Call</span>
                        </button>
                      </a>
                    </div>
                  </div>
                  <div className="my-3">
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
                      <UserIcon className="w-6" />
                      <span>Vendor</span>
                    </div>
                    <span>
                      Email:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.email}
                      </span>
                    </span>
                    <span>
                      Phone:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.phone}
                      </span>
                    </span>
                    {selected?.alternativePhoneNumber && (
                      <span>
                        Other Phone Number:{" "}
                        <span className="text-gray-800 text-base">
                          {selected?.alternativePhoneNumber}
                        </span>
                      </span>
                    )}
                    <span>
                      Address:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.address}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center text-gray-600">
                      <BuildingOfficeIcon className="w-6" />
                      <span>Company Details</span>
                    </div>
                    <span>
                      Registered Location:{" "}
                      <span className="text-gray-700 text-base">
                        {selected?.location}
                      </span>
                    </span>

                    <span>
                      Registered Date:{" "}
                      <span className="text-gray-700 text-base">
                        {moment(selected?.dateOfReg)?.format("MMM DD, YYYY")}
                      </span>
                    </span>
                    <span>
                      Digital Address/Landmark:{" "}
                      <span className="text-gray-700 text-base">
                        {selected?.digitalAddress}
                      </span>
                    </span>
                    <span>
                      Vendor Type:{" "}
                      <span className="text-gray-700 text-base">
                        {selected?.type}
                      </span>
                    </span>
                    <span>
                      Number of Outlets:{" "}
                      <span className="text-gray-700 text-base">
                        {selected?.numberOfOutlets}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 mt-2 items-center text-gray-600">
                      <BuildingStorefrontIcon className="w-6" />
                      <span>Vendor Outlets</span>
                    </div>
                    <span>
                      <span className="text-gray-800 text-base">
                        {/* {startCase(selected?.paymentMethod)} */}
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
