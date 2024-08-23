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

  const genderOptions = [
    { text: 'Select gender', value: '' },
    { text: 'Male', value: 'Male' },
    { text: 'Female', value: 'Female' },
  ]

  const maritalStatusOptions = [
    { text: 'Select marital status', value: '' },
    { text: 'Single', value: 'Single' },
    { text: 'Married', value: 'Married' },
    { text: 'Divorced', value: 'Divorced' },
    { text: 'Windowed', value: 'Windowed' },
  ]

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
                  <div className="bg-white py-5  sm:block md:flex md:justify-between md:gap-8">
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
                          name="surname"
                          inputLength="large"
                          placeholder="eg. Doe"
                          value={patientData["surname"] || ""}
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
                          name="firstName"
                          inputLength="small"
                          placeholder="eg. John"
                          value={patientData["firstName"] || ""}
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
                          name="otherName"
                          inputLength="small"
                          placeholder="Enter any other name"
                          value={patientData["otherName"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="text"
                          field="input"
                          autoComplete="true"
                        />
                      </div>

                      <div className="col-span-3">
                        <Input
                          label="Phone"
                          name="phone"
                          inputLength="small"
                          placeholder="Enter any other name"
                          value={patientData["phone"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="tel"
                          field="input"
                          autoComplete="true"
                        />
                      </div>

                      <div className="col-span-3">
                        <Input
                          label="Alternative Phone"
                          name="alternativePhone"
                          inputLength="small"
                          placeholder="Enter any other name"
                          value={patientData["alternativePhone"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="tel"
                          field="input"
                          autoComplete="true"
                        />
                      </div>

                      <div className="col-span-2">
                        <Input
                          label="Gender"
                          name="gender"
                          inputLength="small"
                          placeholder="Select gender"
                          value={patientData["gender"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="select"
                          field="select"
                          selectOptions={genderOptions}
                          autoComplete="true"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Input
                          label="Marital Status"
                          name="maritalStatus"
                          inputLength="small"
                          placeholder="Select gender"
                          value={patientData["maritalStatus"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="select"
                          field="select"
                          selectOptions={maritalStatusOptions}
                          autoComplete="true"
                        />
                      </div>

                      <div className="col-span-2">
                        <Input
                          label="Occupation"
                          name="occupation"
                          inputLength="small"
                          placeholder="Select gender"
                          value={patientData["occupation"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="text"
                          field="input"
                          autoComplete="true"
                        />
                      </div>

                      <div className="col-span-6">
                        <Input
                          label="Email"
                          name="email"
                          inputLength="large"
                          placeholder="e.g. you@example.com"
                          value={patientData["email"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="email"
                          field="input"
                          autoComplete="true"
                        />
                      </div>

                      <div className="col-span-3">
                        <Input
                          label="Emergency Phone"
                          name="emergencyPhone"
                          inputLength="small"
                          placeholder="Enter any other name"
                          value={patientData["emergencyPhone"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="tel"
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
