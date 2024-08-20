import { FC, useCallback, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import { useState } from "react";
import DoubleButton from "components/buttons/doubleButton";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { get } from "api";
import useUploadImage from "components/hooks/useUploadImage";
import UploadImage from "components/uploadimage";
import DynamicInputComponent from "components/Input/dynamicinputs";
import { IDynamicInput } from "pages/main/patients/types";
import Select from "react-select";
import { createProduce } from "api/mutations/produce";

const CreateDentist: FC<{}> = () => {
  const [produceData, setProduceData] = useState<any>("");
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [inputs, setInputs] = useState<IDynamicInput[]>([
    { unit: "", price: "" },
  ]);
  const [selectedFarmers, setSelectedFarmers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const navigate = useNavigate();
  const { uploadImage, loading } = useUploadImage();

  const handleChange = useCallback(
    (e: any) => {
      setProduceData({
        ...produceData,
        [e.target.name]: e.target.value,
      });
    },
    [produceData]
  );

  const { data: farmers, isFetching: loadingFamers } = useQuery(
    ["farmersSearchByName", searchString],
    () =>
      get("/farmers", {
        params: {
          search: { key: "firstName", value: searchString },
        },
      })
  );

  const typeOption = [
    { value: "", label: "Select type" },
    { value: "crop", label: "Crop" },
    { value: "livestock", label: "Livestock" },
  ];

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return createProduce(body);
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Produce created successfully");
      navigate("/produce");
    },
  });

  const handleSubmission = (e: any) => {
    //
    e?.preventDefault();

    if (produceData.name === undefined) {
      return toast?.error("Name can't be empty");
    }

    if (produceData.type === undefined) {
      return toast?.error("Select produce type");
    }

    if (selectedFarmers?.length < 1) {
      return toast?.error("Select at least 1 farmer");
    }

    if (produceData.stock === undefined) {
      return toast?.error("Quantity can't be empty");
    }

    if (inputs.length < 1) {
      return toast?.error("Add at least one selling variants");
    }

    // add status
    uploadImage(image)
      ?.then((link: string) => {
        mutateAsync({
          ...produceData,
          image: link,
          categories: selectedCategories,
          farmers: selectedFarmers,
          produceType: produceData.type,
          statuss: produceData.status,
          variants: inputs?.map((item) => {
            return {
              unit: item.unit,
              price: parseInt(item.price),
            };
          }),
        });
        // navigate("/produce");
      })
      ?.then(() => {
        setProduceData("");
        setImage(null);
        setTempUrl("");
      })
      ?.catch((e) => {
        toast?.warning(e?.message);
      });
  };

  const { data: categoryData, isFetching: isFetchingCategory } = useQuery(
    ["categoriesSearch"],
    () => get("/categories")
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

  const activeStateOption = [
    { value: "", label: "Select State" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Create Produce"
            description="Fill out the details to sign up a new produce."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Produce"}
              type={"link"}
              path={"/produce"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>

          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden">
                  <div className="bg-white px-4 py-5 sm:p-6 sm:block md:flex md:justify-between md:gap-8">
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
                        optionalLabel={true}
                      />
                    </div>
                    <div className="w-full grid grid-cols-6 gap-6">
                      <Input
                        label="Produce name"
                        name="name"
                        inputLength="medium"
                        placeholder="eg. Orange"
                        value={produceData["name"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />

                      <div className="col-span-3">
                        <Input
                          label="Propduce Type"
                          name="type"
                          onChange={handleChange}
                          value={produceData["type"] || ""}
                          inputLength="medium"
                          placeholder="Eg. 20"
                          hasShowPassword="disable"
                          type="number"
                          field="select"
                          selectOptions={typeOption}
                          autoComplete="true"
                          optionalLabel={true}
                        />
                      </div>
                      <div className="col-span-3">
                        <Input
                          label="Stock"
                          name="stock"
                          onChange={handleChange}
                          value={produceData["stock"] || ""}
                          inputLength="medium"
                          placeholder="Eg. 20"
                          hasShowPassword="disable"
                          type="number"
                          field="input"
                          autoComplete="true"
                          optionalLabel={true}
                        />
                      </div>

                      <div className={"col-span-6 sm:col-span-3"}>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <div className="mt-1">
                          <Select
                            onInputChange={(e) => setSearchString(e)}
                            className="basic-single"
                            classNamePrefix="select"
                            isLoading={isFetchingCategory}
                            isClearable={true}
                            isSearchable={true}
                            onChange={(e) =>
                              setSelectedCategories(
                                e?.map((item: any) => item.value)
                              )
                            }
                            isMulti={true}
                            name="category"
                            options={categoryData?.data?.map((item: any) => {
                              return {
                                value: item._id,
                                label: item.name,
                              };
                            })}
                          />
                        </div>
                      </div>

                      <div className={"col-span-6 sm:col-span-3"}>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Select Farmers
                        </label>
                        <div className="mt-1">
                          <Select
                            onInputChange={(e) => setSearchString(e)}
                            className="select"
                            isMulti={true}
                            classNamePrefix="select"
                            isLoading={loadingFamers}
                            isClearable={true}
                            onChange={(e) =>
                              setSelectedFarmers(
                                e?.map((item: any) => item.value)
                              )
                            }
                            isSearchable={true}
                            name="name"
                            options={farmers?.data?.map((item: any) => {
                              return {
                                value: item._id,
                                label: item.firstName + " " + item?.surname,
                              };
                            })}
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <Input
                          label="Active State"
                          name="status"
                          onChange={handleChange}
                          value={produceData["status"] || ""}
                          inputLength="medium"
                          placeholder=""
                          hasShowPassword="disable"
                          type="text"
                          field="select"
                          selectOptions={activeStateOption}
                          autoComplete="true"
                          optionalLabel={true}
                        />
                      </div>

                      <Input
                        label="Additional information"
                        name="description"
                        inputLength="large"
                        placeholder="Extra information about product goes here"
                        value={produceData["description"] || ""}
                        onChange={handleChange}
                        type=""
                        field="textarea"
                        autoComplete="true"
                      />

                      <hr className="col-span-6 border-gray-100" />

                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Variants
                        </label>
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <DynamicInputComponent
                          inputs={inputs}
                          setInputs={setInputs}
                        />
                      </div>
                    </div>
                  </div>
                  <DoubleButton
                    loading={isLoading || loading}
                    buttonText="Save produce"
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
export default CreateDentist;
