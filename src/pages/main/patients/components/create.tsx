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

const CreatePatient: FC = () => {
  const [patientData, setPatientData] = useState<any>("");
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");
  const navigate = useNavigate();

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

  const cardTypeOptions = [
    { text: 'Select card type', value: '' },
    { text: 'Ghana Card', value: 'Ghana Card' },
    { text: 'Voter ID', value: 'Voter ID' },
    { text: 'Passport', value: 'Passport' },
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

      if (patientData.firstName === undefined) {
        return toast?.error("First name can't be empty");
      }

      if (patientData.surname === undefined) {
        return toast?.error("Surname must be provided");
      }

      uploadImage(image)
        ?.then((link: string) => {
          mutateAsync({
            ...patientData,
            image: link,
            emergencyContact: {
              name: patientData.emergencyContactName,
              phone: patientData.emergencyContactPhone,
              relation: patientData.emergencyContactRelation,
            },
            location: {
              address: patientData.address,
              digital: patientData.digital,
              landmark: patientData.landmark
            },
            identification: {
              cardType: patientData.cardType,
              cardNumber: patientData.cardNumber
            },
            status: 'Active'
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
                  <div className="bg-white py-5 px-1 sm:block">
                    <div className="flex items-center">
                      <div className="mb-6">
                        <UploadImage tempUrl={tempUrl} />
                      </div>
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

                      <div className="col-span-2">
                        <Input
                          label="Phone"
                          name="phone"
                          inputLength="small"
                          placeholder="Enter any other name"
                          value={patientData["phone"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          max={10}
                          type="tel"
                          field="input"
                          autoComplete="true"
                        />
                      </div>

                      <div className="col-span-2">
                        <Input
                          label="Emergency Phone"
                          name="emergencyContactPhone"
                          inputLength="small"
                          placeholder="Enter any other name"
                          value={patientData["emergencyContactPhone"] || ""}
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
                          label="Date of Birth"
                          name="birthDate"
                          inputLength="small"
                          placeholder="Enter any other name"
                          value={patientData["birthDate"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="date"
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

                      <div className="col-span-3">
                        <Input
                          label="Card Type"
                          name="cardType"
                          inputLength="small"
                          placeholder=""
                          value={patientData["cardType"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="select"
                          field="select"
                          selectOptions={cardTypeOptions}
                          autoComplete="true"
                        />
                      </div>

                      <div className="col-span-3">
                        <Input
                          label="Card Number"
                          name="cardNumber"
                          inputLength="large"
                          placeholder="Enter the selected card number"
                          value={patientData["cardNumber"] || ""}
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
                          label="Digital Address"
                          name="digital"
                          inputLength="large"
                          placeholder="e.g. AK-32878-23"
                          value={patientData["digital"] || ""}
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
                          label="Landmark"
                          name="landmark"
                          inputLength="large"
                          placeholder="What is you nearest landmark?"
                          value={patientData["landmark"] || ""}
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
                          label="Address"
                          name="address"
                          inputLength="large"
                          placeholder="Enter your address here"
                          value={patientData["address"] || ""}
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

                      <Input
                        label="Bio Data Here"
                        name="description"
                        inputLength="large"
                        placeholder="Bio:"
                        value={patientData["description"] || ""}
                        onChange={handleChange}
                        type=""
                        field="textarea"
                        autoComplete="true"
                      />
                    </div>
                  </div>
                  <DoubleButton
                    loading={isLoading || loading}
                    buttonText="Add Patient"
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
