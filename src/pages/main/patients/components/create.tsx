import { FC, useCallback, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import { useState } from "react";
import DoubleButton from "components/buttons/doubleButton";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { createPatient } from "api/mutations/patients";
import { toast } from "react-toastify";
import useUploadImage from "components/hooks/useUploadImage";
import UploadImage from "components/uploadimage";
import DynamicInputComponent from "components/Input/dynamicinputs";
import { IDynamicInput } from "../types";

const CreatePatient: FC = () => {
  const [patientData, setPatientData] = useState<any>("");
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<IDynamicInput[]>([
    { unit: "", price: "" },
  ]);

  const { uploadImage, loading } = useUploadImage();

  const handleChange = useCallback(
    (e: any) => {
      setPatientData({
        ...patientData,
        [e.target.name]: e.target.value,
      });
    },
    [patientData]
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return createPatient(body);
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Product created successfully");
      navigate("/patients");
    },
  });

  const handleSubmission = useCallback(
    async (e: any) => {
      //
      e?.preventDefault();

      if (patientData.name === undefined) {
        return toast?.error("Name can't be empty");
      }

      if (patientData.stock === undefined) {
        return toast?.error("Enter current stock of product");
      }

      uploadImage(image)
        ?.then((link: string) => {
          mutateAsync({
            ...patientData,
            image: link,
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
      patientData,
      mutateAsync,
      image,
      uploadImage,
      inputs,
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
            title="Create New Patient"
            description="Create a profile for a new patient."
          >
            <Button
              Icon={<EyeIcon className="w-6" />}
              text={"Patients"}
              type={"primary-link"}
              path={"/patients"}
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
                      <div className="col-span-2">
                        <Input
                          label="Surname"
                          name="name"
                          inputLength="small"
                          placeholder="eg. Doe"
                          value={patientData["name"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="text"
                          field="input"
                          autoComplete="true"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          label="First name"
                          name="name"
                          inputLength="small"
                          placeholder="eg. John"
                          value={patientData["name"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="text"
                          field="input"
                          autoComplete="true"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          label="Other name"
                          name="name"
                          inputLength="small"
                          placeholder="Enter any other name"
                          value={patientData["name"] || ""}
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
                          value={patientData["stock"] || ""}
                          inputLength="medium"
                          placeholder="Eg. 20"
                          hasShowPassword="disable"
                          type="number"
                          field="input"
                          autoComplete="true"
                          optionalLabel={true}
                        />
                      </div>

                      <Input
                        label="Additional information"
                        name="description"
                        inputLength="large"
                        placeholder="Extra information about product goes here"
                        value={patientData["description"] || ""}
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
