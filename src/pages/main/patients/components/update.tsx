import { FC, useCallback, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import { useState } from "react";
import DoubleButton from "components/buttons/doubleButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { updateProduct } from "api/mutations/products";
import { toast } from "react-toastify";
import { get } from "api";
import useUploadImage from "components/hooks/useUploadImage";
import UploadImage from "components/uploadimage";

const UpdatePatient: FC<{}> = () => {
  const [productData, setProductData] = useState<any>("");
  const { state } = useLocation();
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");

  const navigate = useNavigate();
  const { uploadImage, loading } = useUploadImage();

  const handleChange = (e: any) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const statusOption = [
    { value: "", text: "Select status" },
    { value: "Active", text: "Active" },
    { value: "Inactive", text: "Inactive" },
  ];

  const { data, isFetching } = useQuery(["allVendors"], () => get("/vendors"));

  const { data: categoryData, isFetching: isFetchingCategory } = useQuery(
    ["allCategories"],
    () => get("/category")
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updateProduct({ ...body, id: state?._id });
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Product updated successfully");
      navigate("/products");
    },
  });

  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault();

      if (productData.name === undefined) {
        return toast?.error("Name can't be empty");
      }

      // if (productData.category === undefined) {
      //   return toast?.error('Select produce category')
      // }

      if (productData.stock === undefined) {
        return toast?.error("Select produce type");
      }

      if (productData.sellersPrice === undefined) {
        return toast?.error("Seller's price can't be empty");
      }

      if (productData.sellersPrice === undefined) {
        return toast?.error("Seller's price can't be empty");
      }

      if (productData.status === undefined) {
        return toast?.error("Select status");
      }

      uploadImage(image)
        ?.then((link: string) => {
          mutateAsync({
            ...productData,
            image: link,
            type: "product",
          });
          navigate("/products");
        })
        ?.catch((e) => {
          toast?.warning(e?.message);
        });
    },
    [productData, mutateAsync, image, uploadImage, navigate]
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

  const initialCheck = useCallback(() => {
    if (state) {
      setProductData({
        image: state?.image,
        name: state?.name,
        category: state?.category,
        vendor: state?.vendor,
        measuringUnit: state?.measuringUnit,
        stock: state?.stock,
        sellersPrice: state?.sellersPrice,
        costPrice: state?.costPrice,
        status: state?.status,
        description: state?.description,
      });
    }
  }, [state]);
  useEffect(() => {
    initialCheck();
  }, [initialCheck]);

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Update Product"
            description="Fill out the details to sign up a new product."
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
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6 sm:block md:flex md:justify-between md:gap-4">
                    <div className="md:w-5/12">
                      <UploadImage tempUrl={tempUrl} defaultImage={image} />
                      <Input
                        label=""
                        name="image"
                        inputLength="medium"
                        value={productData["image"] || ""}
                        onChange={(e) => {
                          setImage(e?.target?.files[0]);
                        }}
                        placeholder=""
                        type="file"
                        field="upload"
                        optionalLabel={true}
                      />
                    </div>
                    <div className="w-full grid grid-cols-6 gap-6">
                      <Input
                        label="Product name"
                        name="name"
                        inputLength="medium"
                        placeholder="eg. Spraying machine"
                        value={productData["name"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
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
                          value={productData["category"] || ""}
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
                          value={productData["vendor"] || ""}
                          className={
                            "mt-1 block w-full rounded-md text-gray-400 border-gray-300 shadow-sm resize-none placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          }
                        >
                          <option>Select Vendor</option>
                          {isFetching ? (
                            <option>Loading...</option>
                          ) : (
                            data?.data?.map((ven: any) => (
                              <option key={ven?._id} value={ven?._id}>
                                {ven?.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      <Input
                        label="Quantity"
                        name="stock"
                        onChange={handleChange}
                        value={productData["stock"] || ""}
                        inputLength="medium"
                        placeholder="please enter number of products available"
                        hasShowPassword="disable"
                        type="number"
                        field="input"
                        autoComplete="true"
                        optionalLabel={true}
                      />

                      <Input
                        label="Measuring unit"
                        name="measuringUnit"
                        onChange={handleChange}
                        value={productData["measuringUnit"] || ""}
                        inputLength="medium"
                        placeholder="eg. 340kg"
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                        optionalLabel={true}
                      />
                      <Input
                        label="Cost price"
                        name="costPrice"
                        inputLength="medium"
                        placeholder="GHC"
                        value={productData["costPrice"] || ""}
                        onChange={handleChange}
                        type="number"
                        field="input"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Seller's price"
                        name="sellersPrice"
                        inputLength="medium"
                        placeholder="GHC "
                        onChange={handleChange}
                        value={productData["sellersPrice"] || ""}
                        hasShowPassword="disable"
                        type="number"
                        field="input"
                        autoComplete="true"
                        optionalLabel={true}
                      />

                      <Input
                        label="Status"
                        name="status"
                        onChange={handleChange}
                        value={productData["status"] || ""}
                        inputLength="medium"
                        placeholder=""
                        hasShowPassword="disable"
                        type="text"
                        field="select"
                        autoComplete="true"
                        optionalLabel={true}
                        selectOptions={statusOption}
                      />

                      <Input
                        label="Additional information"
                        name="description"
                        inputLength="large"
                        placeholder="Extra info about product goes here"
                        value={productData["description"] || ""}
                        onChange={handleChange}
                        type=""
                        field="textarea"
                        autoComplete="true"
                      />
                    </div>
                  </div>
                  <DoubleButton
                    loading={isLoading || loading}
                    buttonText="Update product"
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

export default UpdatePatient;
