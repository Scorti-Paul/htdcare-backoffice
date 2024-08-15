import {
  CalendarIcon,
  PhoneIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";
import moment from "moment";


export default function ViewUser({ selected }: any) {
  return (
    <>
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <div className="overflow-hidden shadow border sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6 sm:block md:flex md:justify-between md:gap-4">
                  <div className="w-full flex flex-col">
                    <div className="flex justify-between border-b pb-4">
                      <div className="mt-3 flex flex-col">
                        <img
                          src={selected?.image}
                          alt={selected?.name}
                          className="w-28 h-28 object-cover rounded-full"
                        />
                        <div className="mt-2 ms-2">
                          <p className="text-gray-80  font-medium text-lg">
                            {selected?.name}
                          </p>
                          <p className="text-gray-600  text-sm">
                            {selected?.email}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full capitalize  px-2 py-1 text-sm font-medium ${selected?.verified ? 'bg-green-100 text-green-600 bold' : 'bg-yellow-50 text-yellow-800'}ring-1 ring-inset ring-yellow-600/20`}>
                          {selected?.verified  ? 'Verified' : 'Not Verified'}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-2 mt-4">
                      <div className="flex text-sm gap-1 items-center">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">Role</span>
                      </div>

                      <div className="mt-1">
                        <p className="text-gray-800 text-base">
                          {selected?.role}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex text-sm gap-1">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">Contact Details</span>
                      </div>

                      <div className=" flex flex-col gap-2 mt-1">
                        <p className="text-gray-800 text-base">
                          {selected?.phone}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex text-sm gap-1">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">Joined On</span>
                      </div>

                      <div className=" flex flex-col gap-2 mt-1">
                        <p className="text-gray-800 text-base">
                          {moment(selected?.createdAt)?.format("MMM Do, YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
