import { FC, useCallback, useEffect, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Header from "components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { updateOrder } from "api/mutations/orders";
import { toast } from "react-toastify";
import regions from "components/constants/regions.json";
import PersonalDetails from "./personalDetails";
import ProductsOrderedDetails from "./productsOrderedDetails";

import { UserIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const UpdateOrder: FC<{}> = () => {
  const [orderData, setOrderData] = useState<any>("");
  const { state } = useLocation();
  const [tempTown, setTempTown] = useState<any>("");
  const [cities, setCities] = useState<string[]>([]);
  const [tabs, setTabs] = useState("tab1");

  const handleChange = (e: any) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTab1 = () => {
    setTabs("tab1");
  };

  const handleTab2 = () => {
    setTabs("tab2");
  };

  const navigate = useNavigate();

  const getCitiesOnRegionChange = useCallback(() => {
    const selectedRegion = regions.find(
      (region) => region?.region === orderData["region"]
    );

    if (selectedRegion) {
      setCities(selectedRegion?.cities || []);
    }
  }, [orderData]);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updateOrder({ ...body, id: state?._id });
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Order updated successfully");
      navigate("/orders");
    },
  });
  // console.log(state);
  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault();

      if (
        orderData.anticipatedDeliveryDate === "" ||
        orderData.anticipatedDeliveryDate === undefined
      ) {
        return toast.error("Enter value for anticipated delivery date");
      }

      const { location, ...rest } = orderData;

      mutateAsync({
        ...rest,
        location: {
          address: orderData.address,
          region: orderData.region,
          city: orderData.city,
          closestLandMark: orderData.closestLandMark,
        },
      });
    },
    [orderData, mutateAsync]
  );

  const approveOrder = useCallback(
    (e: any) => {
      e?.preventDefault();
      const { status, ...rest } = orderData;
      let notFull = false;

      rest.items.map((item: any) => {
        let toastMsg;
        if (
          item.agreedPrice === 0 ||
          item.agreedPrice === "" ||
          item.agreedPrice === undefined
        ) {
          toastMsg = "Enter value for agreed price";
          notFull = true;
          return toast.error(toastMsg);
        }
        return null;
      });

      if (!notFull) {
        mutateAsync({
          ...rest,
          status: "approved",
        });
      }
    },
    [mutateAsync, orderData]
  );

  const initialCheck = useCallback(() => {
    const { location, ...rest } = state;
    if (state) {
      setOrderData({
        ...rest,
        address: location.address,
        city: location.city,
        region: location.region,
        closestLandMark: location.closestLandMark,
      });
    }
  }, [state]);

  useEffect(() => {
    initialCheck();
  }, [initialCheck]);

  useEffect(() => {
    getCitiesOnRegionChange();
  }, [getCitiesOnRegionChange]);

  useEffect(() => {
    if (orderData["region"] && orderData["region"] !== tempTown) {
      setTempTown(orderData["region"]);
      getCitiesOnRegionChange();
    }
  }, [orderData, getCitiesOnRegionChange, tempTown]);

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Update Order"
            description="Edit details to update order."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Orders"}
              type={"link"}
              path={"/orders"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>

          <ul className="w-full mx-auto flex justify-center">
            <li
              className={`transition-all gap-3 duration-300 border-b-2  flex ${
                tabs === "tab1"
                  ? "border-b-green-500 text-green-600 px-9 pb-3 font-bold cursor-pointer w-96"
                  : "font-normal cursor-pointer px-9 pb-3 w-96"
              }`}
              onClick={handleTab1}
            >
              <div className="flex items-start mt-1">
                <UserIcon className="w-6" />
              </div>
              <div className="flex text-left flex-col">
                <span>Order & Customer Information</span>
                <span
                  className={`text-left ${
                    tabs === "tab1"
                      ? "text-sm text-green-500  font-normal "
                      : "text-sm text-gray-500  font-normal"
                  }`}
                >
                  Customer details and related data
                </span>
              </div>
            </li>
            <li
              className={
                tabs === "tab2"
                  ? "transition-all duration-300 border-b-2 border-b-green-500 text-green-600 px-9 pb-3 font-bold cursor-pointer w-96"
                  : "transition-all duration-300 font-normal border-b-2 cursor-pointer px-9 pb-3 w-96"
              }
              onClick={handleTab2}
            >
              <div className="flex gap-2 items-center justify-center ">
                <ShoppingBagIcon className="w-6" /> <span>Order Items</span>
              </div>
              <p
                className={
                  tabs === "tab2"
                    ? "text-sm text-green-500 text-center font-normal pt-1"
                    : "text-sm text-gray-500 text-center font-normal pt-1"
                }
              >
                Selected to products to purchase
              </p>
            </li>
          </ul>

          <>
            <div className="mt-5 md:col-span-2 md:mt-0">
              {tabs === "tab1" ? (
                <>
                  <PersonalDetails orderData={orderData} />
                </>
              ) : (
                <>
                  <ProductsOrderedDetails
                    orderData={orderData}
                    handleSubmission={handleSubmission}
                    setOrderData={setOrderData}
                    handleChange={handleChange}
                    regions={regions}
                    tempTown={tempTown}
                    setTempTown={setTempTown}
                    cities={cities}
                    isLoading={isLoading}
                    approveOrder={approveOrder}
                  />
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default UpdateOrder;
