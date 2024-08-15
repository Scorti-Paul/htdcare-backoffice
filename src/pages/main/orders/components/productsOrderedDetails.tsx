import {
  BookmarkIcon,
  DocumentCheckIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Input from "components/Input";
import { Fragment } from "react";

const ProductsOrderedDetails = ({
  orderData,
  handleSubmission,
  setOrderData,
  isLoading,
  handleChange,
  regions,
  cities,
  setTempTown,
  tempTown,
  approveOrder,
}: any) => {
  const handleChangeItems = (e: any, index: number) => {
    setOrderData({
      ...orderData,
      items: orderData?.items?.map((item: any, i: number) =>
        i === index ? { ...item, [e.target.name]: e.target.value } : item
      ),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmission}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6 sm:block md:flex md:justify-center md:gap-4 ">
            <div className="w-full  mt-6 grid grid-cols-10 justify-center items-center mx-auto gap-6">
              {orderData?.items?.map((item: any, index: any) => (
                <Fragment key={index}>
                  <article className="col-span-3">
                    <div className="flex gap-4">
                      <div>
                        <img
                          className="w-28 rounded-sm h-28 object-cover"
                          width={128}
                          height={128}
                          src={item?.product?.image}
                          alt=""
                        />
                      </div>

                      <div>
                        <p className="text-gray-800 font-medium text-lg">
                          {item?.productName}{" "}
                        </p>
                        {/* <p className="my-1">Stock: {item?.stock} </p> */}
                        <p
                          className={
                            item?.productStatus === "Active"
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {item?.productStatus}
                        </p>
                      </div>
                    </div>
                  </article>

                  <Input
                    label="Quantity"
                    name={`quantity`}
                    inputLength="small"
                    type="number"
                    field="input"
                    value={item?.quantity}
                    onChange={(e) => handleChangeItems(e, index)}
                    hasShowPassword="disable"
                    required
                    optionalLabel={true}
                    placeholder=""
                    autoComplete="true"
                  />

                  <Input
                    label="Price / unit"
                    name="cost"
                    inputLength="small"
                    type="number"
                    field="input"
                    value={item?.cost || ""}
                    onChange={(e) => handleChangeItems(e, index)}
                    hasShowPassword="disable"
                    required
                    optionalLabel={true}
                    placeholder=""
                    autoComplete="true"
                  />

                  <Input
                    onChange={(e) => handleChangeItems(e, index)}
                    label="Agreed Price / Unit"
                    name="agreedPrice"
                    inputLength="small"
                    type="number"
                    field="input"
                    value={item?.agreedPrice}
                    hasShowPassword="disable"
                    required
                    optionalLabel={true}
                    placeholder="237.00"
                    autoComplete="true"
                  />

                  {/* </span> */}
                  <article className="col-span-1">
                    <div className="flex gap-4">
                      <div className="p-4 rounded-full bg-red-50 transition-all duration-300 hover:bg-red-100 hover:cursor-pointer mt-4 ">
                        <TrashIcon className="w-4 text-red-500" />
                      </div>
                    </div>
                  </article>
                  <hr className="col-span-10 my-2" />
                </Fragment>
              ))}

              <label
                htmlFor="geographicalInformation"
                className="block text-md font-medium col-span-8 text-gray-600"
              >
                Delivery Information
              </label>

              <div className="col-span-5">
                <Input
                  label="Anticipated delivery date"
                  name="anticipatedDeliveryDate"
                  inputLength="medium"
                  type="date"
                  field="input"
                  value={orderData["anticipatedDeliveryDate"] || ""}
                  onChange={handleChange}
                  hasShowPassword="disable"
                  // required
                  optionalLabel={true}
                  placeholder="xxx xxx xxxx"
                  autoComplete="true"
                />
              </div>

              <div className="col-span-5">
                <Input
                  name="deliveryCost"
                  label="Delivery Cost"
                  inputLength="medium"
                  type="text"
                  field="input"
                  value={orderData["deliveryCost"] || ""}
                  onChange={handleChange}
                  hasShowPassword="disable"
                  required
                  optionalLabel={true}
                  placeholder="eg. "
                  autoComplete="true"
                />
              </div>

              <label
                htmlFor="geographicalInformation"
                className="block text-md font-medium col-span-8 text-gray-600"
              >
                Geographical Information
              </label>
              <div className="col-span-5">
                <Input
                  name="region"
                  label="Region"
                  inputLength="medium"
                  type="text"
                  field="select"
                  selectOptions={[
                    ...regions?.map((region: any) => {
                      return {
                        value: region.region,
                        label: region.region,
                      };
                    }),
                  ]}
                  value={orderData["region"] || ""}
                  onChange={handleChange}
                  hasShowPassword="disable"
                  required
                  optionalLabel={true}
                  placeholder="Accra"
                  autoComplete="true"
                />
              </div>
              <div className="col-span-5">
                <Input
                  name="city"
                  label="Town / City"
                  inputLength="medium"
                  type="text"
                  field="select"
                  selectOptions={[
                    ...cities?.map((city: any) => {
                      return { value: city, label: city };
                    }),
                  ]}
                  value={orderData["city"] || ""}
                  onChange={(e) => {
                    if (e?.target?.value === "other") {
                      handleChange({
                        target: { name: "city", value: "" },
                      });
                      return setTempTown(e.target.value);
                    }
                    setTempTown("");
                    handleChange(e);
                  }}
                  hasShowPassword="disable"
                  optionalLabel={true}
                  placeholder="Accra"
                  autoComplete="true"
                />
              </div>

              <div className="col-span-5">
                <Input
                  name="address"
                  label="Address"
                  inputLength="medium"
                  type="text"
                  field="input"
                  value={orderData["address"] || ""}
                  onChange={handleChange}
                  hasShowPassword="disable"
                  required
                  optionalLabel={false}
                  placeholder="eg. "
                  autoComplete="true"
                />
              </div>
              <div className="col-span-5">
                <Input
                  name="closestLandMark"
                  label="Closest Landmark"
                  inputLength="medium"
                  type="text"
                  field="input"
                  value={orderData["closestLandMark"] || ""}
                  onChange={handleChange}
                  hasShowPassword="disable"
                  required
                  optionalLabel={false}
                  placeholder="eg. "
                  autoComplete="true"
                />
              </div>
              {orderData?.status === "pending" && (
                <div className="col-span-10   mt-3 pt-5 border-t flex gap-3 justify-end">
                  <button
                    onClick={approveOrder}
                    disabled={isLoading}
                    className="bg-white flex items-center hover:bg-gray-50 text-gray-800 border font-base py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    <DocumentCheckIcon className="w-5 h-5 mr-2" />
                    <span>Approve Order</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-700 flex items-center hover:bg-green-600 text-white border font-base py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    <BookmarkIcon className="w-5 h-5 mr-2" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductsOrderedDetails;
