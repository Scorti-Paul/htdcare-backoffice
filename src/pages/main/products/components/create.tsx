import { FC, useCallback, useEffect, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import DoubleButton from "components/buttons/doubleButton";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createProduct } from "api/mutations/products";
import { get } from "api";
import Select from "react-select";
import UploadImage from "components/uploadimage";
import useUploadImage from "hooks/useUploadImage";

const CreateProduct: FC<{}> = ({ onclick }: any) => {
  const [productData, setProductData] = useState<any>("");
  const [, setSearchString] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { uploadImage, loading } = useUploadImage();
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");



  const navigate = useNavigate();
  const handleChange = useCallback(
    (e: any) => {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      });
    },
    [productData]
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return createProduct(body);
    },
    onError: () => {
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
        return toast?.error("Product name can't be empty");
      }

      if (productData.quantity === undefined) {
        return toast?.error("Product quantity is required");
      }

      if (selectedCategories === undefined) {
        return toast?.error("Select at least one category");
      }

      if (productData.shortDescription === undefined) {
        return toast?.error("Write short description about product");
      }

      uploadImage(image)
        ?.then((link: string) => {
          mutateAsync({
            ...productData,
            categories: selectedCategories,
            image: link,
            status: "Active",
          })
            ?.then(() => {
              setProductData("");
              setImage(null);
              setTempUrl("");
            })
            ?.catch((e) => {
              toast?.warning(e?.message);
            })
        })
    },
    [productData, selectedCategories, uploadImage, image, mutateAsync]
  );

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

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Create Product"
            description="Fill out the details to sign up a new product."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Product"}
              type={"secondary-link"}
              path={"/products"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>

          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6 sm:block">
                    <div className="md:w-5/12 mb-6">
                      <UploadImage tempUrl={tempUrl} uploadHeaderText="Upload Product Image" />
                      <div className="-mt-[5.6rem]">
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
                    </div>

                    <div className="w-full grid grid-cols-6 gap-6 ">
                      <Input
                        label="Product name"
                        name="name"
                        inputLength="medium"
                        placeholder="e.g. Dental Curing Light"
                        value={productData["name"]}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        required
                        autoComplete="true"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Price"
                        name="price"
                        value={productData["price"] || ""}
                        onChange={handleChange}
                        required
                        inputLength="medium"
                        type="number"
                        field="input"
                        placeholder="GHC"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Quantity"
                        name="quantity"
                        value={productData["quantity"] || ""}
                        onChange={handleChange}
                        inputLength="small"
                        field="input"
                        type="number"
                        required
                        placeholder="0"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Threshold"
                        name="threshold"
                        value={productData["threshold"] || ""}
                        onChange={handleChange}
                        inputLength="small"
                        field="input"
                        type="number"
                        required
                        placeholder="0"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <div className={"col-span-6 sm:col-span-2"}>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <div className="mt-3">
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

                      <Input
                        label="Short Description"
                        name="shortDescription"
                        inputLength="large"
                        placeholder="Extra information about product"
                        value={productData["shortDescription"] || ""}
                        onChange={handleChange}
                        type="text"
                        field="textarea"
                        autoComplete="true"
                      />
                    </div>
                  </div>
                  <DoubleButton
                    buttonText="Save product"
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

export default CreateProduct;
