import { FC, useCallback, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import { useState } from "react";
import DoubleButton from "components/buttons/doubleButton";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useUploadImage from "components/hooks/useUploadImage";
import UploadImage from "components/uploadimage";
import { createDentist } from "api/mutations/dentist";

const CreateDentist: FC<{}> = () => {
  const [dentistData, setDentistData] = useState<any>("");
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");

  const navigate = useNavigate();
  const { uploadImage, loading } = useUploadImage();

  const handleChange = useCallback(
    (e: any) => {
      setDentistData({
        ...dentistData,
        [e.target.name]: e.target.value,
      });
    },
    [dentistData]
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return createDentist(body);
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Dentist created successfully");
      navigate("/dentists");
    },
  });

  const handleSubmission = (e: any) => {
    //
    e?.preventDefault();

    if (dentistData.name === undefined) {
      return toast?.error("Name can't be empty");
    }

    if (dentistData.email === undefined) {
      return toast?.error('Email is required')
    }

    if (
      dentistData.email.split('').filter((x: any) => x === '@').length !==
      -1 &&
      dentistData.email.indexOf('.') === -1
    ) {
      return toast?.error('Email is invalid')
    }

    if (dentistData.specialization === undefined) {
      return toast?.error("Name can't be empty");
    }

    if (dentistData.yearsOfExperience === undefined) {
      return toast?.error("Specify your years Of experience");
    }

    if (dentistData.licenseNumber === undefined) {
      return toast?.error("License number can't be empty");
    }

    if (dentistData.phone === undefined) {
      return toast?.error("Phone number is required");
    }

    if (dentistData.clinicName === undefined) {
      return toast?.error("Clinic name is required");
    }

    if (dentistData.clinicPhone === undefined) {
      return toast?.error("Clinic phone is required");
    }

    if (dentistData.clinicAddress === undefined) {
      return toast?.error("Clinic address is required");
    }

    if (dentistData.clinicEmail === undefined) {
      return toast?.error("Clinic email is required");
    }

    uploadImage(image)
      ?.then((link: string) => {
        mutateAsync({
          ...dentistData,
          profilePicture: link,
          role: "dentist",
          password: "0000000",
          clinic: {
            name: dentistData.clinicName,
            phone: dentistData.clinicPhone,
            address: dentistData.clinicAddress,
            email: dentistData.clinicEmail,
          },
          status: "Active",
        })
          ?.then(() => {
            setDentistData("");
            setImage(null);
            setTempUrl("");
          })
          ?.catch((e) => {
            toast?.warning(e?.message);
          })
      })
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


  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Create Dentist"
            description="Fill out the details to create new dentist."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Dentists"}
              type={"secondary-link"}
              path={"/dentists"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>

          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden">
                  <div className="bg-white px-4 py-5 sm:p-6 sm:block">
                    <div className="md:w-5/12 mb-6">
                      <UploadImage tempUrl={tempUrl} />
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

                    <div className="w-full grid grid-cols-6 gap-6">
                      <Input
                        label="First Name"
                        name="firstName"
                        inputLength="small"
                        placeholder="eg. Amartey James"
                        value={dentistData["firstName"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Surname"
                        name="surname"
                        inputLength="small"
                        placeholder="eg. Amartey James"
                        value={dentistData["surname"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Specialty"
                        name="specialization"
                        inputLength="small"
                        placeholder="eg. Endodontist"
                        value={dentistData["specialization"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Years of Experience"
                        name="yearsOfExperience"
                        onChange={handleChange}
                        value={dentistData["yearsOfExperience"] || ""}
                        inputLength="small"
                        placeholder="Eg. 20"
                        hasShowPassword="disable"
                        type="number"
                        field="input"
                        min={0}
                        autoComplete="true"
                        optionalLabel={true}
                      />


                      <Input
                        label="License Number"
                        name="licenseNumber"
                        inputLength="medium"
                        placeholder="eg. MDC/RN/9633"
                        value={dentistData["licenseNumber"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Phone"
                        name="phone"
                        inputLength="medium"
                        placeholder="eg. Enter dentist phone number"
                        value={dentistData["phone"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="tel"
                        field="input"
                        maxLength={10}
                        autoComplete="true"
                      />

                      <Input
                        label="Email"
                        name="email"
                        inputLength="large"
                        placeholder="eg. you@example.com"
                        value={dentistData["email"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="email"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Short Bio"
                        name="bio"
                        inputLength="large"
                        placeholder="Write a short bio about yourself here"
                        value={dentistData["bio"] || ""}
                        onChange={handleChange}
                        type=""
                        field="textarea"
                        autoComplete="true"
                      />

                      <hr className="col-span-6 border-gray-100" />

                      <h3 className="col-span-6 text-darkBlue font-medium">Dentist Clinic Information</h3>
                      <Input
                        label="Clinic Name"
                        name="clinicName"
                        inputLength="medium"
                        placeholder="Enter your clinic name"
                        value={dentistData["clinicName"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />

                      <div className="col-span-3">
                        <Input
                          label="Clinic Phone"
                          name="clinicPhone"
                          onChange={handleChange}
                          value={dentistData["clinicPhone"] || ""}
                          inputLength="medium"
                          placeholder="Enter your clinic office phone number"
                          hasShowPassword="disable"
                          type="tel"
                          field="input"
                          maxLength={10}
                          autoComplete="true"
                          optionalLabel={true}
                        />
                      </div>

                      <div className="col-span-3">
                        <Input
                          label="Clinic Email"
                          name="clinicEmail"
                          onChange={handleChange}
                          value={dentistData["clinicEmail"] || ""}
                          inputLength="medium"
                          placeholder="Enter your clinic office email address"
                          hasShowPassword="disable"
                          type="email"
                          field="input"
                          autoComplete="true"
                          optionalLabel={true}
                        />
                      </div>

                      <div className="col-span-3">
                        <Input
                          label="Clinic Address"
                          name="clinicAddress"
                          onChange={handleChange}
                          value={dentistData["clinicAddress"] || ""}
                          inputLength="medium"
                          placeholder="Enter clinic address"
                          hasShowPassword="disable"
                          type="text"
                          field="input"
                          autoComplete="true"
                          optionalLabel={true}
                        />
                      </div>

                      {/* <div className={"col-span-6 sm:col-span-3"}>
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
                      </div> */}
                    </div>
                  </div>
                  <DoubleButton
                    loading={isLoading || loading}
                    buttonText="Save dentist"
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
