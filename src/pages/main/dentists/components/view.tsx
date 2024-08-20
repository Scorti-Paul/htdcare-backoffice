import defaultImg from "assets/images/defaultImage.jpg";
import {
  ChevronRightIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import { InboxIcon, UsersIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { get } from "api";
import FarmerCard from "components/card/farmercard";
import TopBarProgress from "react-topbar-progress-indicator";

export default function ViewDentist({ selected }: any) {
  const { data, isLoading } = useQuery(["view-produce", selected?.id], () =>
    get(`/produce`, {
      params: {
        populate: ["categories", "farmers"],
        id: selected?._id,
      },
    })
  );

  return (
    <>
      <div className="flex">
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
                    href="/farmers"
                    className="inline-flex items-center space-x-3 text-sm font-light text-gray-900"
                  >
                    <ChevronRightIcon
                      className="-ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-600">Produce</span>
                  </a>
                </nav>

                <div className="flex mt-4 flex-col">
                  <div className="flex justify-between items-center mr-4">
                    <h3 className="text-2xl font-medium leading-6 text-black">
                      {selected?.name}
                    </h3>
                    <div className="flex space-x-6">
                      <a href={`mailto:${selected?.farmer?.email}`}>
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
                      <a className="" href={`tel:${selected?.farmer?.phone}`}>
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
                          className="rounded-md p-4"
                          src={selected?.image ? selected?.image : defaultImg}
                          alt=""
                        />
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center text-gray-600">
                      <InboxIcon className="w-6" />
                      <span>Produce Details</span>
                    </div>
                    <span>
                      Stock:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.stock}
                      </span>
                    </span>{" "}
                    <span>
                      Type:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.produceType}
                      </span>
                    </span>
                    <div>
                      <span>Status: </span>
                      <span
                        className={
                          selected?.status === "Active"
                            ? "text-green-600 text-sm"
                            : "text-red-500 text-base"
                        }
                      >
                        {selected?.status}
                      </span>
                    </div>
                    <div>
                      <span>Variants </span>

                      <div className="grid grid-cols-2 gap-2 mt-2 text-black">
                        <span>Name</span>
                        <span>Price (GHS) </span>
                        <hr className="col-span-2" />
                        {data?.data?.variants?.map((variant: any) => (
                          <Fragment key={variant.unit}>
                            <span className="">{variant.unit}</span>
                            <span className="">{variant.price}</span>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                    <div>
                      Categories:{" "}
                      <div className="flex flex-wrap gap-4 mt-2">
                        {data?.data?.categories?.map((category: any) => (
                          <span
                            key={category._id}
                            className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
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
                </div>
                <hr className="my-4" />
                <div className="flex flex-col  gap-3">
                  <div className="flex gap-2 mt-2 items-center text-gray-600">
                    <UsersIcon className="w-6" />
                    <span>Farmers</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {isLoading ? (
                      <TopBarProgress />
                    ) : data ? (
                      data?.data?.farmers?.map((farmer: any) => (
                        <Fragment key={farmer._id}>
                          <FarmerCard farmer={farmer} />
                        </Fragment>
                      ))
                    ) : (
                      <span>No farmers</span>
                    )}
                  </div>
                  <span>
                    <span className="text-gray-800 text-base"></span>
                  </span>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
