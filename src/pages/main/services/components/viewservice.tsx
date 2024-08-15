import { Fragment } from "react";
import defaultImg from "assets/images/defaultImage.jpg";
import {
  ChevronRightIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import { UserIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import moment from "moment";

export default function ViewService({ selected }: any) {
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
                    href="/services"
                    className="inline-flex items-center space-x-3 text-sm font-light text-gray-900"
                  >
                    <ChevronRightIcon
                      className="-ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-600">Services</span>
                  </a>
                </nav>

                <div className="flex mt-4 flex-col">
                  <div className="flex justify-between items-center mr-4">
                    <h3 className="text-2xl font-medium leading-6 text-black">
                      {selected?.name}
                    </h3>
                    <div className="flex space-x-6">
                      <a href={`mailto:${selected?.vendor?.email}`}>
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
                      <a className="" href={`tel:${selected?.vendor?.phone}`}>
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
                    <span>
                      <span className="text-gray-800 text-base">
                        <img
                          className=""
                          src={selected?.image ? selected?.image : defaultImg}
                          alt=""
                        />
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center text-gray-600">
                      <WrenchScrewdriverIcon className="w-6" />
                      <span>Service Details</span>
                    </div>

                    <span>
                      Category:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.category?.name}
                      </span>
                    </span>
                    <span>
                      Seller's Price:{" "}
                      <span className="text-gray-800 text-base">
                        GHS {selected?.sellersPrice?.toFixed(2)}
                      </span>
                    </span>
                    <span>
                      Cost Price:{" "}
                      <span className="text-gray-800 text-base">
                        GHS {selected?.costPrice?.toFixed(2)}
                      </span>
                    </span>
                    <span>
                      Quantity:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.stock}
                      </span>
                    </span>
                    <span>
                      Working Hours:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.workingHours}
                      </span>
                    </span>
                    <span>
                      Rate Unit:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.rateUnit}
                      </span>
                    </span>
                    <span>
                      Measuring Unit:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.measuringUnit}
                      </span>
                    </span>
                    <span>
                      Terms:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.terms}
                      </span>
                    </span>
                    <span>
                      Status:{" "}
                      <span
                        className={
                          selected?.status === "Active"
                            ? "text-green-600 text-base"
                            : "text-red-500 text-base"
                        }
                      >
                        {selected?.status}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 mt-2 items-center text-gray-600">
                      <UserIcon className="w-6" />
                      <span>Vendor</span>
                    </div>
                    <span>
                      Name:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.vendor?.name}
                      </span>
                    </span>
                    <span>
                      Email:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.vendor?.email}
                      </span>
                    </span>
                    <span>
                      Phone:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.vendor?.phone}
                      </span>
                    </span>
                    <span>
                      Address:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.vendor?.address}
                      </span>
                    </span>
                    <span>
                      <span className="text-gray-800 text-base"></span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span>
                      Description:{" "}
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
