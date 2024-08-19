import { FC, useCallback, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import { useState } from "react";
import DoubleButton from "components/buttons/doubleButton";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { createProduct } from "api/mutations/products";
import { toast } from "react-toastify";
import { get } from "api";
import useUploadImage from "components/hooks/useUploadImage";
import UploadImage from "components/uploadimage";
// import Select from "react-select";
import ReactSelect from 'react-select';
import DynamicInputComponent from "components/Input/dynamicinputs";
import { IDynamicInput } from "../types";

const CreatePatient: FC = () => {
  const [productData, setProductData] = useState<any>("");
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string[]>([]);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<IDynamicInput[]>([
    { unit: "", price: "" },
  ]);

  const { uploadImage, loading } = useUploadImage();

  const handleChange = useCallback(
    (e: any) => {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      });
    },
    [productData]
  );

  const { data: categoryData, isFetching: isFetchingCategory } = useQuery(
    ["allCategories"],
    () => get("/categories")
  );
  const { data: vendors, isFetching: loadingVendors } = useQuery(
    ["allvendors", searchString],
    () =>
      get("/vendors", {
        params: {
          search: { key: "name", value: searchString },
        },
      })
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return createProduct(body);
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Product created successfully");
      navigate("/products");
    },
  });

  const handleSubmission = useCallback(
    async (e: any) => {
      //
      e?.preventDefault();

      if (productData.name === undefined) {
        return toast?.error("Name can't be empty");
      }

      if (productData.stock === undefined) {
        return toast?.error("Enter current stock of product");
      }

      if (selectedCategories.length === 0) {
        return toast?.error("Select a category");
      }

      if (selectedVendor.length === 0) {
        return toast?.error("Select at least 1 vendor");
      }

      uploadImage(image)
        ?.then((link: string) => {
          mutateAsync({
            ...productData,
            image: link,
            vendors: selectedVendor,
            categories: selectedCategories,
            variants: inputs?.map((item) => {
              return {
                unit: item.unit,
                price: parseInt(item.price),
              };
            }),
          });
        })
        ?.catch((e) => {
          toast?.warning(e?.message);
        });
    },
    [
      productData,
      mutateAsync,
      image,
      uploadImage,
      selectedCategories,
      inputs,
      selectedVendor,
    ]
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
            title="Create Product"
            description="Fill out the details to create new product."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Products"}
              type={"link"}
              path={"/products"}
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
                      <div className="col-span-5">
                        <Input
                          label="Product name"
                          name="name"
                          inputLength="large"
                          placeholder="eg. Spraying machine"
                          value={productData["name"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="text"
                          field="input"
                          autoComplete="true"
                        />
                      </div>

                      <div className="col-span-1">
                        <Input
                          label="Stock"
                          name="stock"
                          onChange={handleChange}
                          value={productData["stock"] || ""}
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
                          <ReactSelect
                            onInputChange={(e: any) => setSearchString(e)}
                            className="basic-single"
                            classNamePrefix="select"
                            isLoading={isFetchingCategory}
                            isClearable={true}
                            isSearchable={true}
                            onChange={(e: any) =>
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
                          Select vendor
                        </label>
                        <div className="mt-1">
                          <ReactSelect
                            onInputChange={(e: any) => setSearchString(e)}
                            className="select"
                            isMulti={true}
                            classNamePrefix="select"
                            isLoading={loadingVendors}
                            isClearable={true}
                            onChange={(e: any) =>
                              setSelectedVendor(
                                e?.map((item: any) => item.value)
                              )
                            }
                            isSearchable={true}
                            name="name"
                            options={vendors?.data?.map((item: any) => {
                              return {
                                value: item._id,
                                label: item.name,
                              };
                            })}
                          />
                        </div>
                      </div>

                      <Input
                        label="Additional information"
                        name="description"
                        inputLength="large"
                        placeholder="Extra information about product goes here"
                        value={productData["description"] || ""}
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
                    buttonText="Save product"
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

export default CreatePatient;
