import { FC, useCallback, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import { useState } from "react";
import DoubleButton from "components/buttons/doubleButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { updatePatient } from "api/mutations/patients";
import { toast } from "react-toastify";
import useUploadImage from "components/hooks/useUploadImage";
import UploadImage from "components/uploadimage";

const UpdatePatient: FC<{}> = () => {
  const [patientData, setPatientData] = useState<any>("");
  const { state } = useLocation();
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");

  const navigate = useNavigate();
  const { uploadImage, loading } = useUploadImage();

  const handleChange = (e: any) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const createTemp = useCallback(() => {
    if (image) {
      const temp = URL.createObjectURL(image);
      setTempUrl(temp);
    }
  }, [image]);

  useEffect(() => {
    createTemp();
  }, [createTemp]);

  const statusOption = [
    { value: "", text: "Select status" },
    { value: "Active", text: "Active" },
    { value: "Inactive", text: "Inactive" },
  ];

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

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updatePatient({ ...body, id: state?._id });
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Patient updated successfully");
      navigate("/patients");
    },
  });

  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault();

      if (patientData.firstName === undefined) {
        return toast?.error("First name can't be empty");
      }

      if (patientData.surname === undefined) {
        return toast?.error("Surname must be provided");
      }

      if (patientData.phone === undefined) {
        return toast?.error("Phone number is required");
      }

      if (patientData.birthDate === undefined) {
        return toast?.error("Choose patient's date of birth");
      }

      if (patientData.gender === undefined) {
        return toast?.error("Select gender");
      }

      if (patientData.maritalStatus === undefined) {
        return toast?.error("Select marital status");
      }

      if (patientData.cardType === undefined) {
        return toast?.error("Select card type");
      }

      if (patientData.cardNumber === undefined) {
        return toast?.error("Card number is  is required");
      }

      if (patientData.address === undefined) {
        return toast?.error("Address  is required");
      }

      uploadImage(image)
        ?.then((link: string) => {
          mutateAsync({
            ...patientData,
            image: link,
            emergencyContact: {
              name: patientData.emergencyContactName,
              phone: patientData.emergencyPhone,
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
            }
          });
          navigate("/patients");
        })
        ?.catch((e) => {
          toast?.warning(e?.message);
        });
    },
    [patientData, mutateAsync, image, uploadImage, navigate]
  );


  const initialCheck = useCallback(() => {
    if (state) {
      setPatientData({
        image: state?.image,
        firstName: state?.user?.firstName,
        surname: state?.user?.surname,
        otherName: state?.user?.otherName,
        phone: state?.user?.phone,
        birthDate: state?.birthDate,
        emergencyPhone: state?.emergencyContact?.phone,
        email: state?.user?.email,
        gender: state?.gender,
        maritalStatus: state?.maritalStatus,
        occupation: state?.occupation,
        cardType: state?.identification?.cardType,
        cardNumber: state?.identification?.cardNumber,
        address: state?.location?.address,
        digital: state?.location?.digital,
        landmark: state?.location?.landmark,
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
            title="Update Patient"
            description="Fill out the details to sign up a new patient."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Patients"}
              type={"secondary-link"}
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
                    <div className="md:w-5/12">
                      <UploadImage tempUrl={tempUrl} uploadHeaderText="Update Patient Photo" defaultImage={image} />
                      <div className="-mt-[5.6rem]">
                        <Input
                          label=""
                          name="image"
                          inputLength="medium"
                          value={patientData["image"] || ""}
                          onChange={(e) => {
                            setImage(e?.target?.files[0]);
                          }}
                          placeholder=""
                          type="file"
                          field="upload"
                          optionalLabel={true}
                        />
                      </div>
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
                          maxLength={10}
                          max={10}
                          type="tel"
                          field="input"
                          autoComplete="true"
                        />
                      </div>

                      <div className="col-span-2">
                        <Input
                          label="Emergency Phone"
                          name="emergencyPhone"
                          inputLength="small"
                          placeholder="Enter any other name"
                          value={patientData["emergencyPhone"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          maxLength={10}
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

                      <div className="col-span-6">
                        <Input
                          label="Status"
                          name="status"
                          inputLength="large"
                          placeholder=""
                          value={patientData["status"] || ""}
                          onChange={handleChange}
                          optionalLabel={true}
                          hasShowPassword="disable"
                          type="select"
                          field="select"
                          selectOptions={statusOption}
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
                    buttonText="Update patient"
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
