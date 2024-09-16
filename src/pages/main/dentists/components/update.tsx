import { FC, useCallback, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import { useState } from "react";
import DoubleButton from "components/buttons/doubleButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useUploadImage from "components/hooks/useUploadImage";
import UploadImage from "components/uploadimage";
import { updateDentist } from "api/mutations/dentist";

const UpdateDentist: FC<{}> = () => {
  const [dentistData, setDentistData] = useState<any>("");
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");

  const { uploadImage, loading } = useUploadImage();
  const navigate = useNavigate();

  const { state } = useLocation();

  const statusOption = [
    { value: "", text: "Select status" },
    { value: "Active", text: "Active" },
    { value: "Inactive", text: "Inactive" },
  ];

  const handleChange = (e: any) => {
    setDentistData({
      ...dentistData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updateDentist({ ...body, id: state?._id });
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Dentist updated successfully");
      navigate("/dentist");
    },
  });



  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault();

      if (dentistData.name === undefined) {
        return toast?.error("Name can't be empty");
      }

      if (dentistData?.length < 1) {
        return toast?.error("Select at least 1 farmer");
      }

      if (dentistData.stock === undefined) {
        return toast?.error("Quantity can't be empty");
      }


      if (!image) {
        mutateAsync({
          image: dentistData?.image,
          ...dentistData,
          status: dentistData.status,
        })
          ?.then(() => {
            toast?.success("Dentist updated successfully");
            setDentistData("");
            setTempUrl("");
            setImage(null);
            return navigate("/dentist");
          })
          ?.catch((e) => {
            return toast?.warning(e?.message);
          });
      } else {
        uploadImage(image)
          ?.then((link: string) => {
            mutateAsync({
              ...dentistData,
              image: link,
              status: dentistData.status,
              dentistType: dentistData.type,

            });
            navigate("/dentist");
          })
          ?.catch((e) => {
            toast?.warning(e?.message);
          });
      }
    },
    [
      dentistData,
      mutateAsync,
      image,
      uploadImage,
      navigate
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

  const initialCheck = useCallback(() => {
    if (state) {
      setTempUrl(state?.image);
      setDentistData({
        image: state?.image,
        name: state?.name,
        category: state?.category,
        type: state?.type,
        dentistType: state?.dentistType,
        stock: state?.stock,
        measuringUnit: state?.measuringUnit,
        costPrice: state?.costPrice,
        sellersPrice: state?.sellersPrice,
        farmer: state?.farmer,
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
            title="Create Dentist"
            description="Fill out the details to sign up a new dentist."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Dentist"}
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
                        placeholder="e.g. Amartey James"
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
                        placeholder="e.g. Amartey James"
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
                        placeholder="e.g. Endodontist"
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
                        placeholder="e.g. 20"
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
                        inputLength="small"
                        placeholder="e.g. MDC/RN/9633"
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
                        inputLength="small"
                        placeholder="Enter dentist phone number"
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
                        placeholder="e.g. you@example.com"
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
                          selectOptions={statusOption}
                          autoComplete="true"
                          optionalLabel={true}
                        />
                      </div>
                    </div>
                  </div>
                  <DoubleButton
                    loading={isLoading || loading}
                    buttonText="Update dentist"
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

export default UpdateDentist;
