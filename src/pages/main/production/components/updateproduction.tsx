import { FC, useCallback, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import DoubleButton from "components/buttons/doubleButton";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { updateRequestProduction } from "api/mutations/production";
import { toast } from "react-toastify";

const UpdateProduction: FC<{}> = () => {
  const [requestProduction, setRequestProduction] = useState<any>("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setRequestProduction({
      ...requestProduction,
      [e.target.name]: e.target.value,
    });
  };

  const statusOption = [
    { value: "", text: "Select status" },
    { value: "pending", text: "Pending" },
    { value: "approved", text: "Approved" },
    { value: "in progress", text: "In progress" },
    { value: "completed", text: "Completed" },
  ];

  const paymentStatusOption = [
    { value: "", text: "Select status" },
    { value: "pending", text: "Pending" },
    { value: "approved", text: "Approved" },
    { value: "transit", text: "Transit" },
    { value: "completed", text: "Completed" },
  ];

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updateRequestProduction({ ...body, id: state?._id });
    },
    onError: (e) => {
      toast?.error("Unable to request production");
    },
    onSuccess: () => {
      toast?.success("Production requested successfully");
      navigate("/production");
    },
  });

  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault();
      if (requestProduction.firstName === undefined) {
        return toast?.error("First name can't be empty");
      }
      if (requestProduction.lastName === undefined) {
        return toast?.error("First name can't be empty");
      }

      if (requestProduction.email === undefined) {
        return toast?.error("Email can't be empty");
      }

      if (requestProduction.phone === undefined) {
        return toast?.error("Phone number can't be empty");
      }

      if (
        requestProduction.email.split("").filter((x: any) => x === "@")
          .length !== -1 &&
        requestProduction.email.indexOf(".") === -1
      ) {
        return toast?.error("Email is invalid");
      }

      if (requestProduction.agricProduce === undefined) {
        return toast?.error("Agric Produce can't be empty");
      }

      if (requestProduction.variety === undefined) {
        return toast?.error("Variety can't be empty");
      }

      if (requestProduction.quantity === undefined) {
        return toast?.error("Quantity can't be empty");
      }

      if (requestProduction.estimatedBudget === undefined) {
        return toast?.error("Estimated Budget can't be empty");
      }

      mutateAsync({
        name: requestProduction.firstName + " " + requestProduction.lastName,
        email: requestProduction.email,
        phone: requestProduction.phone,
        agricProduce: requestProduction.agricProduce,
        variety: requestProduction.variety,
        quantity: requestProduction.quantity,
        estimatedBudget: requestProduction.estimatedBudget,
        status: requestProduction.status,
        paymentStatus: requestProduction.paymentStatus,
        anticipatedDeliveryDate: requestProduction.anticipatedDeliveryDate,
        requestDetails: requestProduction.requestDetails,
      });
    },
    [requestProduction, mutateAsync]
  );

  const initialCheck = useCallback(() => {
    const firstName = state?.name.split(" ")[0];
    const lastName = state?.name.split(" ")[1];

    if (state) {
      setRequestProduction({
        firstName: firstName,
        lastName: lastName,
        email: state?.email,
        phone: state?.phone,
        agricProduce: state?.agricProduce,
        variety: state?.variety,
        quantity: state?.quantity,
        estimatedBudget: state?.estimatedBudget,
        anticipatedDeliveryDate: state?.anticipatedDeliveryDate,
        status: state?.status,
        paymentStatus: state?.paymentStatus,
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
            title="Update Request"
            description="Fill out the details to request new crop production."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Production"}
              type={"link"}
              path={"/production"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>

          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <Input
                        label="First Name"
                        name="firstName"
                        inputLength="medium"
                        type="text"
                        field="input"
                        value={requestProduction["firstName"] || ""}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        required
                        optionalLabel={true}
                        placeholder="Jane"
                        autoComplete="true"
                      />
                      <Input
                        name="lastName"
                        label="Last Name"
                        inputLength="medium"
                        type="text"
                        field="input"
                        value={requestProduction["lastName"] || ""}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        required
                        optionalLabel={true}
                        placeholder="Doe"
                        autoComplete="true"
                      />
                      <Input
                        name="email"
                        label="Email address"
                        inputLength="medium"
                        type="email"
                        field="input"
                        value={requestProduction["email"] || ""}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        required
                        optionalLabel={true}
                        placeholder="you@example.com"
                        autoComplete="true"
                      />
                      <Input
                        name="phone"
                        label="Phone"
                        inputLength="medium"
                        type="text"
                        field="input"
                        value={requestProduction["phone"] || ""}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        required
                        optionalLabel={true}
                        placeholder="xxx xxx xxxx"
                        autoComplete="true"
                      />

                      <Input
                        label="Agric Produce"
                        name="agricProduce"
                        inputLength="medium"
                        type="text"
                        field="input"
                        value={requestProduction["agricProduce"] || ""}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        optionalLabel={true}
                        placeholder="eg. Maize"
                        autoComplete="true"
                      />

                      <Input
                        label="Variety"
                        name="variety"
                        inputLength="medium"
                        type="text"
                        field="input"
                        value={requestProduction["variety"] || ""}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        optionalLabel={true}
                        placeholder="eg. Yellow"
                        autoComplete="true"
                      />

                      <Input
                        label="Quantity"
                        name="quantity"
                        inputLength="small"
                        type="number"
                        field="input"
                        value={requestProduction["quantity"] || ""}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        optionalLabel={true}
                        placeholder="eg. 1000 MT"
                        autoComplete="true"
                      />

                      <Input
                        label="Estimated Budget"
                        name="estimatedBudget"
                        inputLength="small"
                        type="number"
                        field="input"
                        value={requestProduction["estimatedBudget"] || ""}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        optionalLabel={true}
                        placeholder="eg. GHS 32000.00"
                        autoComplete="true"
                      />

                      <Input
                        label="Anticipated Delivery Date"
                        name="anticipatedDeliveryDate"
                        inputLength="small"
                        placeholder=""
                        value={
                          requestProduction["anticipatedDeliveryDate"] || ""
                        }
                        onChange={handleChange}
                        type="date"
                        hasShowPassword="disable"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Status"
                        name="status"
                        onChange={handleChange}
                        value={requestProduction["status"] || ""}
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
                        label="Payment status"
                        name="paymentStatus"
                        onChange={handleChange}
                        value={requestProduction["paymentStatus"] || ""}
                        inputLength="medium"
                        placeholder=""
                        hasShowPassword="disable"
                        type="text"
                        field="select"
                        autoComplete="true"
                        optionalLabel={true}
                        selectOptions={paymentStatusOption}
                      />

                      <Input
                        name="requestDetails"
                        label="Request Details"
                        inputLength="large"
                        type=""
                        field="textarea"
                        onChange={handleChange}
                        hasShowPassword="disable"
                        placeholder="Type request details here"
                        autoComplete="true"
                      />
                    </div>
                  </div>

                  <DoubleButton
                    loading={isLoading}
                    buttonText="Update request"
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

export default UpdateProduction;
