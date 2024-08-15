import forgot_bg from "../../../assets/images/register_bg.png";
import Button from "../../../components/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { forgotPassword } from "api/mutations/users";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [forgotData, setForgotData] = useState<any>("");

  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: any) => {
      setForgotData({
        ...forgotData,
        [e.target.name]: e.target.value,
      });
    },
    [forgotData]
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => forgotPassword(body),
    onSuccess: () => {
      toast?.success("Check your email to reset password");
      navigate("/forgot");
    },
    onError: (e: any) => {
      console.log(e);
      toast?.error("There was an error");
    },
  });

  const handleSubmission = useCallback(
    async (e: any) => {
      e?.preventDefault();

      if (forgotData.email === undefined) {
        return toast?.error("Email can't be empty");
      }

      if (
        forgotData.email.split("").filter((x: any) => x === "@").length !==
          -1 &&
        forgotData.email.indexOf(".") === -1
      ) {
        return toast?.error("Email is invalid");
      }

      mutateAsync({ ...forgotData });
    },
    [mutateAsync, forgotData]
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
            src={forgot_bg}
            alt=""
          />
        </div>
        <div className="flex flex-1 flex-col justify-center w-3/5 py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Forgot your password?
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Please enter the email you use to sign in.
              </p>
            </div>
            <div className="mt-6">
              <form
                onSubmit={handleSubmission}
                className=" flex flex-col gap-6"
              >
                <Input
                  label="Email address"
                  type="email"
                  field="input"
                  value={forgotData["email"] || ""}
                  onChange={handleChange}
                  inputLength="medium"
                  placeholder="you@example.com"
                  required={true}
                  name="email"
                  hasShowPassword="disable"
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
            <div className="mt-2">
              <p className="text-gray-500">
                Remember password?{" "}
                <Link to="/login" className="text-green-700">
                  sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
