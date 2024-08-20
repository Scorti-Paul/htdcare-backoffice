import { FC, useCallback, useEffect, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import DoubleButton from "components/buttons/doubleButton";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createService } from "api/mutations/services";
import { get } from "api";
import useUploadImage from "components/hooks/useUploadImage";
import UploadImage from "components/uploadimage";

const CreateServices: FC<{}> = ({ onclick }: any) => {
  const [serviceData, setServiceData] = useState<any>("");
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");

  const navigate = useNavigate();
  const { uploadImage, loading } = useUploadImage();

  const handleChange = useCallback(
    (e: any) => {
      setServiceData({
        ...serviceData,
        [e.target.name]: e.target.value,
      });
    },
    [serviceData]
  );

  const statusOption = [
    { value: "", label: "Select status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];
  const workingHoursOptions = [{ value: "Monday", label: "Monday" }];

  const rateOptions = [
    { value: "", label: "Select rate" },
    { value: "Days", label: "Days" },
    { value: "Weeks", label: "Weeks" },
    { value: "Months", label: "Months" },
  ];

  const { data, isFetching } = useQuery(["entireVendors"], () =>
    get("/vendors")
  );

  const { data: categoryData, isFetching: isFetchingCategory } = useQuery(
    ["allCategories"],
    () => get("/category")
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return createService(body);
    },
    onError: () => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Service created successfully");
      navigate("/services");
    },
  });
  const handleSubmission = useCallback(
    async (e: any) => {
      //
      e?.preventDefault();

      if (serviceData.name === undefined) {
        return toast?.error("Name can't be empty");
      }

      // if (serviceData.category === undefined) {
      //   return toast?.error('Select produce category')
      // }

      if (serviceData.workingHours === undefined) {
        return toast?.error("Working Hours can't be empty");
      }

      if (serviceData.rateUnit === undefined) {
        return toast?.error("Rate can't be empty");
      }

      if (serviceData.duration === undefined) {
        return toast?.error("Duration can't be empty");
      }

      if (serviceData.costPrice === undefined) {
        return toast?.error("Cost rate can't be empty");
      }

      if (serviceData.sellersPrice === undefined) {
        return toast?.error("Seller's rate can't be empty");
      }

      if (serviceData.vendor === undefined) {
        return toast?.error("Select vendor");
      }

      if (serviceData.status === undefined) {
        return toast?.error("Select status");
      }

      uploadImage(image)
        ?.then((link: string) => {
          mutateAsync({
            ...serviceData,
            image: link,
            type: "service",
          });
          navigate("/services");
        })
        ?.catch((e) => {
          toast?.warning(e?.message);
        });
    },
    [serviceData, mutateAsync, image, uploadImage, navigate]
  );

  const createTemp = useCallback(() => {
    if (image) {
      const temp = URL.createObjectURL(image);
      setTempUrl(temp);
    }
  }, [image]);

  useEffect(() => {
    createTemp();
  }, [createTemp]);

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Create Services"
            description="Fill out the details to sign up a new service."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Services"}
              type={"link"}
              path={"/services"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>

          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6 sm:block md:flex md:justify-between md:gap-4">
                    <div className="md:w-5/12">
                      <UploadImage tempUrl={tempUrl} />
                      <Input
                        label=""
                        name="image"
                        inputLength="medium"
                        onChange={(e) => {
                          setImage(e?.target?.files[0]);
                        }}
                        type="file"
                        field="upload"
                        autoComplete="true"
                      />
                    </div>

                    <div className="w-full grid grid-cols-6 gap-6">
                      <Input
                        label="Service name"
                        name="name"
                        inputLength="medium"
                        placeholder="eg. Ware housing"
                        value={serviceData["name"]}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        autoComplete="true"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <div className={"col-span-6 sm:col-span-3"}>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          name="category"
                          onChange={handleChange}
                          value={serviceData["category"] || ""}
                          className={
                            "mt-1 block w-full rounded-md text-gray-400 border-gray-300 shadow-sm resize-none placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          }
                        >
                          <option>Select Category</option>
                          {isFetchingCategory ? (
                            <option>Loading...</option>
                          ) : (
                            categoryData?.data?.map((category: any) => (
                              <option key={category?._id} value={category?._id}>
                                {category?.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      <div className={"col-span-6 sm:col-span-3"}>
                        <label
                          htmlFor="vendor"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Vendor
                        </label>
                        <select
                          name="vendor"
                          onChange={handleChange}
                          value={serviceData["vendor"] || ""}
                          className={
                            "mt-1 block w-full rounded-md text-gray-400 border-gray-300 shadow-sm resize-none placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          }
                        >
                          <option>Select Vendor</option>
                          {isFetching ? (
                            <option>Loading...</option>
                          ) : (
                            data?.data?.map((ven: any) => (
                              <option key={ven?._id}>{ven?.name}</option>
                            ))
                          )}
                        </select>
                      </div>

                      <Input
                        label="Working hours"
                        name="workingHours"
                        inputLength="medium"
                        placeholder="eg. Monday to Friday"
                        value={serviceData["workingHours"] || ""}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        autoComplete="true"
                        selectOptions={workingHoursOptions}
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Period"
                        name="rateUnit"
                        inputLength="medium"
                        placeholder=""
                        type="text"
                        value={serviceData["rateUnit"] || ""}
                        onChange={handleChange}
                        field="select"
                        autoComplete="true"
                        selectOptions={rateOptions}
                      />

                      <Input
                        type="number"
                        name="duration"
                        label="Duration"
                        value={serviceData["duration"] || ""}
                        onChange={handleChange}
                        inputLength="medium"
                        field="input"
                        required
                        placeholder="0"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        type="number"
                        name="sellersPrice"
                        label="Seller's rate"
                        value={serviceData["sellersPrice"] || ""}
                        onChange={handleChange}
                        required
                        inputLength="small"
                        field="input"
                        placeholder="GHC"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        type="number"
                        name="costPrice"
                        label="Cost rate"
                        value={serviceData["costPrice"] || ""}
                        onChange={handleChange}
                        required
                        inputLength="small"
                        field="input"
                        placeholder="GHC"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Status"
                        name="status"
                        onChange={handleChange}
                        value={serviceData["status"] || ""}
                        inputLength="small"
                        placeholder=""
                        hasShowPassword="disable"
                        type="text"
                        field="select"
                        autoComplete="true"
                        optionalLabel={true}
                        selectOptions={statusOption}
                      />

                      <Input
                        label="Terms"
                        name="terms"
                        inputLength="large"
                        placeholder=""
                        value={serviceData["terms"] || ""}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        autoComplete="true"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Additional information"
                        name="description"
                        inputLength="large"
                        placeholder="Extra information about service"
                        value={serviceData["description"] || ""}
                        onChange={handleChange}
                        type="text"
                        field="textarea"
                        autoComplete="true"
                      />
                    </div>
                  </div>
                  <DoubleButton
                    buttonText="Save service"
                    loading={isLoading || loading}
                    onClick={handleSubmission}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateServices;
