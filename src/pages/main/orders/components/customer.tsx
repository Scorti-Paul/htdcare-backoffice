import {
  CreditCardIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { startCase } from "components/utils";

export default function Customer({ selected }:  any ) {
  return (
    <section className="py-4 h-96">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center text-gray-600">
            <UserIcon className="w-6" />
            <span>Customer</span>
          </div>
          <span>
            Name:{" "}
            <span className="text-gray-800 text-base">
              {startCase(selected?.user?.name?.toLowerCase())}
            </span>
          </span>
          <span>
            Email:{" "}
            <span className="text-gray-800 text-base">{selected?.user?.email}</span>
          </span>
          <span>
            Phone:{" "}
            <span className="text-gray-800 text-base">{selected?.user?.phone}</span>
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center text-gray-600">
            <TruckIcon className="w-6" />
            <span>Delivery Address</span>
          </div>
          <span>
            Region:{" "}
            <span className="text-gray-700 text-base">
              {selected?.location?.region}
            </span>
          </span>
          <span>
            City:{" "}
            <span className="text-gray-700 text-base">
              {selected?.location?.city}
            </span>
          </span>
          <span>
            Address:{" "}
            <span className="text-gray-700 text-base">
              {selected?.location?.address}
            </span>
          </span>
          <span>
            Delivery Method:{" "}
            <span className="text-gray-700 text-base">By Truck</span>
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 mt-2 items-center text-gray-600">
            <CreditCardIcon className="w-6" />
            <span>Payment Status</span>
          </div>
          <span>
            <span className="text-gray-800 text-base">
              {startCase(selected?.paymentStatus)}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
