import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
const PersonalDetails = ({ orderData }: any) => {
  return (
    <>
      <div>
        <div className="overflow-hidden shadow border sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6 sm:block md:flex md:justify-between md:gap-4">
            <div className="w-full flex flex-col">
              <label
                htmlFor="geographicalInformation"
                className="block text-md font-semibold col-span-6 text-gray-700"
              >
                Order {orderData?.orderNumber}
              </label>

              <div className="flex justify-between border-b pb-4">
                <div className="mt-3 flex flex-col">
                  <img
                    src={orderData?.user?.image}
                    alt={orderData?.user?.name}
                    className="w-28 h-28 object-cover rounded-full"
                  />
                  <div className="mt-2 ms-2">
                    <p className="text-gray-80  font-medium text-lg">
                      {orderData?.user?.name}
                    </p>
                    <p className="text-gray-600  text-sm">
                      {orderData?.user?.email}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-full capitalize bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    {orderData?.status}
                  </span>
                </div>
              </div>

              <div className="col-span-2 mt-4">
                <div className="flex text-sm gap-1 items-center">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">location</span>
                </div>

                <div className="mt-1">
                  <p className="text-gray-800 text-base">
                    {orderData?.region +
                      " - " +
                      orderData?.city?.toLowerCase() +
                      ", " +
                      orderData?.address}
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
                    {orderData?.user?.email}
                  </p>
                  <p className="text-gray-800 text-base">
                    {orderData?.user?.phone}
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
                    {moment(orderData?.user?.createdAt)?.format("MMM Do, YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <DoubleButton
            loading={isLoading}
            buttonText="Update Order"
            onClick={handleSubmission}
          /> */}
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
