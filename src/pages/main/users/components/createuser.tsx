import { FC, useCallback, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import { useState } from "react";
import DoubleButton from "components/buttons/doubleButton";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { registerUser } from "api/mutations/users";
import { toast } from "react-toastify";
import useUploadImage from "components/hooks/useUploadImage";
import UploadImage from "components/uploadimage";

const CreateUser: FC<{}> = () => {
  const [userData, setUserData] = useState<any>("");
  const [image, setImage] = useState<any>(null);
  const [tempUrl, setTempUrl] = useState<string>("");
  const [showPassword, setShowPassword] = useState(true);

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const { uploadImage, loading } = useUploadImage();

  const userRoleOptions = [
    { value: "", text: "Select user role" },
    { value: "admin", text: "Admin" },
    { value: "farmer", text: "Farmer" },
    { value: "buyer", text: "Buyer" },
  ];

  const handleChange = useCallback(
    (e: any) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    },
    [userData]
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return registerUser(body);
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("User created successfully");
      navigate("/users");
    },
  });

  const handleSubmission = useCallback(
    async (e: any) => {
      //
      e?.preventDefault();

      uploadImage(image)
        ?.then((link: string) => {
          mutateAsync({
            ...userData,
            image: link,
          });
        })
        ?.catch((e) => {
          toast?.warning(e?.message);
        });
    },
    [userData, mutateAsync, image, uploadImage]
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
            title="Create Users"
            description="Fill out the details to create new user."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Users"}
              type={"link"}
              path={"/users"}
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
                      <UploadImage tempUrl={tempUrl} />

                      <Input
                        label=""
                        name="userImage"
                        inputLength="medium"
                        // value={userData["productImage"] || ""}
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
                        label="User Role"
                        name="role"
                        inputLength="medium"
                        placeholder="GHC "
                        onChange={handleChange}
                        value={userData["role"] || ""}
                        hasShowPassword="disable"
                        type="text"
                        field="select"
                        autoComplete="true"
                        optionalLabel={true}
                        selectOptions={userRoleOptions}
                      />

                      <Input
                        label="Name"
                        name="name"
                        inputLength="medium"
                        placeholder="eg. John Doe"
                        value={userData["name"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={userData["email"] || ""}
                        inputLength="medium"
                        placeholder="you@example.com"
                        hasShowPassword="disable"
                        type="email"
                        field="input"
                        autoComplete="true"
                        optionalLabel={true}
                      />

                      <Input
                        label="Phone number"
                        name="phone"
                        onChange={handleChange}
                        value={userData["phone"] || ""}
                        inputLength="medium"
                        placeholder="eg. xxx xxx xxxx"
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                        optionalLabel={true}
                      />

                      <Input
                        label="Password"
                        name="password"
                        inputLength="medium"
                        placeholder="*************"
                        value={userData["password"] || ""}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        optionalLabel={true}
                        hasShowPassword={showPassword}
                        handleShowHidePassword={handleShowHidePassword}
                        autoComplete="true"
                      />

                      <Input
                        label="Confirm password"
                        name="confirmPassword"
                        inputLength="medium"
                        placeholder="*************"
                        value={userData["confirmPassword"] || ""}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        hasShowPassword={showPassword}
                        handleShowHidePassword={handleShowHidePassword}
                        optionalLabel={true}
                        autoComplete="true"
                      />
                    </div>
                  </div>
                  <DoubleButton
                    loading={isLoading || loading}
                    buttonText="Save user"
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

export default CreateUser;
