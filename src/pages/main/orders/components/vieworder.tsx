import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  CheckBadgeIcon,
  DocumentArrowDownIcon,
  ShoppingBagIcon,
  TruckIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { Fragment, useState } from "react";
import ProductRow from "./productRow";

import Customer from "./customer";
import {currencyFormat} from "components/utils";
import {useMutation} from "react-query";
import {updateOrder} from "api/mutations/orders";
import {toast} from "react-toastify";

export default function ViewOrder({selected}: any) {
  const [tab, setTab] = useState(1);
  const {mutateAsync} = useMutation(updateOrder);
const [data, setData] = useState<any>(selected);
const declineOrder = () => {
  console.log(selected?.products);

  mutateAsync({id: selected?._id, ...data, status: "declined"});
};
const acceptOrder = () => {
  mutateAsync({id: selected?._id, ...data, status: "approved"})?.then(() => {
    toast?.success(
      "Order approved successfully, Contact client if payment is not made within 24 hours",
      {toastId: "order-approve"}
    );
  });
};

const handleOnAgreedPriceChange = (e: any, index: number) => {
  let value = parseFloat(e.target.value);

  let items = data?.items;
  items[index] = {...items[index], agreedPrice: value};
  setData({...data, items: items});
};

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
                  {/* <span className="text-gray-600">Home</span> */}
                </a>
                <a
                  href="/orders"
                  className="inline-flex items-center space-x-3 text-sm font-light text-gray-900"
                >
                  <ChevronRightIcon
                    className="-ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-gray-600">Orders</span>
                </a>
                <a
                  href="/"
                  className="inline-flex items-center space-x-3 text-sm font-light text-gray-900"
                >
                  <ChevronRightIcon
                    className="-ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-gray-400">{selected?.orderNumber}</span>
                </a>
              </nav>

              <div className="flex mt-4 flex-col">
                {selected?.status === "pending" ? (
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-medium leading-6 text-black">
                      {selected?.orderNumber}
                    </h3>
                    <div className="flex space-x-4">
                      <button
                        onClick={declineOrder}
                        className={`inline-flex gap-1 w-full justify-center font-medium rounded-lg border text-black border-gray-100 px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm `}
                      >
                        <XCircleIcon
                          className="-ml-2 h-5 w-5 text-black"
                          aria-hidden="true"
                        />
                        <span>Decline</span>
                      </button>
                      <button
                        onClick={acceptOrder}
                        className={`inline-flex gap-1 w-full justify-center font-medium rounded-lg border-0 border-transparent bg-green-500 px-4 py-2 text-base text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm `}
                      >
                        <CheckBadgeIcon
                          className="-ml-2 h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                        <span>Accept</span>
                      </button>
                    </div>
                  </div>
                ) : null}
                <div className="my-3">
                  <div>
                    <div className="flex space-x-5">
                      <div>
                        <label className="text-gray-400 font-light">
                          Order date:{" "}
                        </label>
                        <span className="text-gray-600 font-light">
                          {moment(selected?.createdAt)?.format("MMM DD, YYYY")}
                        </span>
                      </div>
                      <span className="text-gray-200">|</span>
                      <div className="flex items-center gap-2">
                        <TruckIcon
                          className="-ml-2 h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                        <span className="text-green-500">
                          Estimated delivery: {moment()?.format("MMM DD, YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <ul className="w-full my-3 flex justify-center">
              <li
                className={
                  tab === 1
                    ? "transition-all duration-300 border-b  border-b-green-500 text-green-600 px-0 pb-4 font-bold cursor-pointer w-full"
                    : "transition-all duration-300 font-normal border-b  cursor-pointer px-0 pb-4  w-full"
                }
                onClick={() => setTab(1)}
              >
                <div className="flex items-start gap-3">
                  <ShoppingBagIcon className="w-6" />
                  <div className="flex flex-col">
                    <span>Order Items</span>
                    <span
                      className={
                        tab === 1
                          ? "text-sm text-green-500  font-normal pt-1"
                          : "text-sm text-gray-500  font-normal pt-1"
                      }
                    >
                      Selected to products to purchase
                    </span>
                  </div>
                </div>
              </li>
              <li
                className={
                  tab === 2
                    ? "transition-all duration-300 border-b  border-b-green-500 text-green-600 px-0 pb-3 font-bold cursor-pointer w-full"
                    : "transition-all duration-300 font-normal border-b  cursor-pointer px-0 pb-3 w-full"
                }
                onClick={() => setTab(2)}
              >
                <div className="flex items-start gap-3">
                  <UserIcon className="w-6" />
                  <div className="flex flex-col">
                    <span>Customer Information</span>
                    <span
                      className={
                        tab === 2
                          ? "text-sm text-green-500 font-normal pt-1"
                          : "text-sm text-gray-500 font-normal pt-1"
                      }
                    >
                      Customer details and related data
                    </span>
                  </div>
                </div>
              </li>
            </ul>

            {/* Product Information */}
            {tab === 1 && (
              <section className="py-2">
                <div className="flex w-full overflow-scroll lg:max-h-80 3xl:max-h-96 flex-col space-y-1">
                  {selected?.items?.map((item: any, index: number) => (
                    <Fragment key={item?._id}>
                      <ProductRow
                        item={item}
                        order={selected}
                        handleOnAgreedPriceChange={handleOnAgreedPriceChange}
                        index={index}
                      />
                    </Fragment>
                  ))}
                </div>
                <div className="grid border-t grid-cols-2">
                  <div />

                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex w-2/3 flex-col items-start space-y-2">
                      <div className="flex border-b border-dashed w-full py-2 gap-2 items-end text-gray-600">
                        <DocumentArrowDownIcon className="w-6" />
                        <span>Order Summary</span>
                      </div>
                      <div className="flex w-full justify-between">
                        <span>Subtotal</span>
                        <span className="text-black">
                          GHS {currencyFormat(selected?.totalCost)}
                        </span>
                      </div>

                      <div className="flex w-full justify-between">
                        <span>Delivery</span>
                        <span className="text-black">
                          GHS {currencyFormat(selected?.deliveryCost)}
                        </span>
                      </div>
                      <div className="flex border-t border-dashed pt-2 w-full justify-between">
                        <span>Total</span>
                        <span className="text-black">
                          GHS {currencyFormat(selected?.totalCost)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Customer Information */}
            {tab === 2 && <Customer selected={selected} />}
          </main>
        </div>
      </div>
    </div>
  </>
);
}
