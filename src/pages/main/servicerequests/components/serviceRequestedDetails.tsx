import {
  BookmarkIcon,
  DocumentCheckIcon,
  TrashIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Input from "components/Input";
import { Fragment } from "react";

const ServiceRequestedDetails = ({
  requestService,
  handleSubmission,
  setRequestService,
  isLoading,
  handleChange,
  regions,
  cities,
  setTempTown,
  tempTown,
  approveRequest,
}: any) => {
  // const handleChangeItems = (e: any, index: number) => {
  //   setRequestService({
  //     ...requestService,
  //     items: requestService?.items?.map((item: any, i: number) =>
  //       i === index ? { ...item, [e.target.name]: e.target.value } : item
  //     ),
  //   });
  // };

  const statusOption = [
    {value: "", label: "Select status"},
    {value: "pending", label: "Pending"},
    {value: "approved", label: "Approved"},
    {value: "in progress", label: "In progress"},
    {value: "completed", label: "Completed"},
  ];

  const paymentStatusOption = [
    {value: "", label: "Select status"},
    {value: "pending", label: "Pending"},
    {value: "approved", label: "Approved"},
    {value: "transit", label: "Transit"},
    {value: "completed", label: "Completed"},
  ];

  return (
    <>
      <form onSubmit={handleSubmission}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6 sm:block md:flex md:justify-center md:gap-4 ">
            <div className="w-full mt-6 grid grid-cols-10 justify-center items-start mx-auto gap-6">
              <Fragment>
                <article className="col-span-5">
                  <div className="flex gap-4">
                    <div>
                      <img
                        className="rounded-lg object-cover"
                        width={428}
                        height={428}
                        src={requestService.serviceImage}
                        alt={requestService.serviceName}
                      />
                    </div>
                  </div>
                </article>
                <article className="col-span-5">
                  <div className="flex gap-4">
                    <div>
                      <p className="text-gray-800 font-bold text-xl mb-2">
                        {requestService?.serviceName}{" "}
                      </p>
                      <div className="flex text-sm gap-1 items-center mb-2 mt-3">
                        <ClipboardDocumentListIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">Description</span>
                      </div>{" "}
                      <span className="text-sm">
                        {requestService?.serviceDescription}
                      </span>
                      <p>{requestService?.serviceVenderName}</p>
                    </div>
                  </div>
                </article>

                <article className="col-span-1">
                  <div className="flex gap-4">
                    <div className="p-4 rounded-full bg-red-50 transition-all duration-300 hover:bg-red-100 hover:cursor-pointer mt-4 ">
                      <TrashIcon className="w-4 text-red-500" />
                    </div>
                  </div>
                </article>

                <hr className="col-span-10 my-2" />
              </Fragment>

              <label
                htmlFor="geographicalInformation"
                className="block text-md font-medium col-span-8 text-gray-600"
              >
                Request Information
              </label>

              <div className="col-span-5">
                <Input
                  label="Status"
                  name="status"
                  onChange={handleChange}
                  value={requestService["status"] || ""}
                  inputLength="medium"
                  placeholder=""
                  hasShowPassword="disable"
                  type="text"
                  field="select"
                  autoComplete="true"
                  optionalLabel={true}
                  selectOptions={statusOption}
                />
              </div>

              <div className="col-span-5">
                <Input
                  label="Payment status"
                  name="paymentStatus"
                  onChange={handleChange}
                  value={requestService["paymentStatus"] || ""}
                  inputLength="medium"
                  placeholder=""
                  hasShowPassword="disable"
                  type="text"
                  field="select"
                  autoComplete="true"
                  optionalLabel={true}
                  selectOptions={paymentStatusOption}
                />
              </div>

              <label
                htmlFor="geographicalInformation"
                className="block text-md font-medium col-span-8 text-gray-600"
              >
                Delivery Information
              </label>

              <div className="col-span-5">
                <Input
                  name="startDate"
                  label="Start Date"
                  inputLength="medium"
                  type="date"
                  field="input"
                  value={requestService["startDate"] || ""}
                  onChange={handleChange}
                  hasShowPassword="disable"
                  required
                  optionalLabel={true}
                  placeholder="eg. "
                  autoComplete="true"
                />
              </div>

              <div className="col-span-5">
                <Input
                  name="completionDate"
                  label="Completion Date"
                  inputLength="medium"
                  type="date"
                  field="input"
                  value={requestService["completionDate"] || ""}
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
                  value={requestService["region"] || ""}
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
                      return {value: city, label: city};
                    }),
                  ]}
                  value={requestService["city"] || ""}
                  onChange={(e) => {
                    if (e?.target?.value === "other") {
                      handleChange({
                        target: {name: "city", value: ""},
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
                  value={requestService["address"] || ""}
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
                  value={requestService["closestLandMark"] || ""}
                  onChange={handleChange}
                  hasShowPassword="disable"
                  required
                  optionalLabel={false}
                  placeholder="eg. "
                  autoComplete="true"
                />
              </div>
              <div className="col-span-10 mt-3 pt-5 border-t flex gap-3 justify-end">
                <button
                  onClick={approveRequest}
                  disabled={isLoading}
                  className="bg-white flex items-center hover:bg-gray-50 text-gray-800 border font-base py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  <DocumentCheckIcon className="w-5 h-5 mr-2" />
                  <span>Approve Request</span>
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
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ServiceRequestedDetails;
