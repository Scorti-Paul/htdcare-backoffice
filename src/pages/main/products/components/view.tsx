import {
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
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
              </section>

              <section className="py-4 h-96">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <span>
                      Service Rate:{" "}
                      <span className="text-gray-800 text-base">
                        GHS {selected?.price}
                      </span>
                    </span>
                    <span>
                      Description:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.description}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span>
                      Duration:{" "}
                      <span className="text-gray-800 text-base">
                        {selected?.duration} minutes
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
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
