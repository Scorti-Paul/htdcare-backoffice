import login_bg from "../../../assets/images/register_bg.png";
import Button from "../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { resetPassword } from "api/mutations/users";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [resetData, setResetData] = useState<any>("");
  const [showPassword, setShowPassword] = useState(true);

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: any) => {
      setResetData({
        ...resetData,
        [e.target.name]: e.target.value,
      });
    },
    [resetData]
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => resetPassword(body),
    onSuccess: () => {
      toast?.success("Password changed successfully");
      navigate("/login");
    },
    onError: (e: any) => {
      console.log(e);
      toast?.error("An error occurred changing your password");
    },
  });

  const handleSubmission = useCallback(
    async (e: any) => {
      e?.preventDefault();

      if (resetData.password === undefined) {
        return toast?.error("Password can't be empty");
      }

      if (resetData.confirmPassword === undefined) {
        return toast?.error("Confirm password can't be empty");
      }

      if (resetData.password !== resetData.confirmPassword) {
        return toast?.error("password and confirm password are not the same");
      }
      mutateAsync({ ...resetData });
    },
    [mutateAsync, resetData]
  );

  return (
    <div className="h-screen bg-white">
      <div className="flex min-h-full">
        <div className="relative hidden w-2/5 flex-1 lg:block">
          <div className="absolute w-full bg-primary-green/25 h-full z-40">
            <div className="w-100 flex px-8 h-full items-end pb-24">
              <div className="px-8 py-6 rounded-lg shadow-sm bg-black/50">
                <h1 className="text-white text-3xl font-semibold">
                  An integrated solution for <br /> enhanced agricultural
                  activity.
                </h1>
                <p className="text-gray-300 mt-2 font-light">
                  The largest and most preferred integration solution provider
                  for agricultural players in Africa with a global reach.
                </p>
              </div>
            </div>
          </div>
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={login_bg}
            alt=""
          />
        </div>
        <div className="flex flex-1 flex-col justify-center w-3/5 py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Reset your password
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Please enter and confirm your new password.
              </p>
            </div>
            <div className="mt-6">
              <form
                onSubmit={handleSubmission}
                className=" flex flex-col gap-6"
              >
                <Input
                  label="New password"
                  name="password"
                  inputLength="large"
                  placeholder="***********"
                  value={resetData["password"] || ""}
                  onChange={handleChange}
                  type="password"
                  field="input"
                  hasShowPassword={showPassword}
                  handleShowHidePassword={handleShowHidePassword}
                  optionalLabel={true}
                  required={true}
                />

                <Input
                  label="Confirm new password"
                  name="confirmPassword"
                  inputLength="large"
                  placeholder="***********"
                  value={resetData["confirmPassword"] || ""}
                  onChange={handleChange}
                  type="password"
                  field="input"
                  required={true}
                  hasShowPassword={showPassword}
                  handleShowHidePassword={handleShowHidePassword}
                  optionalLabel={true}
                />

                <div>
                  <Button
                    onClick={handleSubmission}
                    text="Request password reset"
                    hasIcon={false}
                    path=""
                    loading={isLoading}
                    type="primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
