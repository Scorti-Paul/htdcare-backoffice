import { FC, useCallback, useEffect, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Input from "components/Input";
import Header from "components/Header";
import DoubleButton from "components/buttons/doubleButton";
import { useMutation, } from "react-query";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { updateService } from "api/mutations/services";

const UpdateService: FC<{}> = ({ onclick }: any) => {
  const [serviceData, setServiceData] = useState<any>("");
  const { state } = useLocation();

  const navigate = useNavigate();

  const statusOptions = [
    { text: 'Select status', value: '' },
    { text: 'Active', value: 'Active' },
    { text: 'Inactive', value: 'Inactive' },
  ]
  const handleChange = (e: any) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updateService({ ...body, id: state?._id });
    },
    onError: () => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Service updated successfully");
      navigate("/services");
    },
  });

  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault();

      if (serviceData.name === undefined) {
        return toast?.error("Service name can't be empty");
      }

      if (serviceData.duration === undefined) {
        return toast?.error("Duration is required");
      }

      if (serviceData.price === undefined) {
        return toast?.error("Service rate is required");
      }

      mutateAsync({
        ...serviceData,
      });

    },
    [serviceData, mutateAsync]
  );


  const initialCheck = useCallback(() => {
    if (state) {
      setServiceData({
        name: state?.name,
        price: state?.price,
        description: state?.description,
        duration: state?.duration,
        status: state?.status
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
            title="Update Service"
            description="Fill out the details to update service record."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Services"}
              type={"secondary-link"}
              path={"/services"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>

          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden">
                  <div className="sm:block md:flex md:justify-between md:gap-4 px-1">
                    <div className="w-full grid grid-cols-6 gap-6">
                      <Input
                        label="Service name"
                        name="name"
                        inputLength="medium"
                        placeholder="e.g. Teeth Replacement"
                        value={serviceData["name"]}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        autoComplete="true"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Service Rate"
                        name="price"
                        type="number"
                        value={serviceData["price"] || ""}
                        onChange={handleChange}
                        required
                        inputLength="medium"
                        field="input"
                        placeholder="GHC"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="How long does the procedure take (in mins)"
                        name="duration"
                        type="number"
                        value={serviceData["duration"] || ""}
                        onChange={handleChange}
                        inputLength="medium"
                        field="input"
                        required
                        placeholder="0"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Status"
                        name="status"
                        value={serviceData["status"] || ""}
                        onChange={handleChange}
                        inputLength="medium"
                        field="select"
                        type="select"
                        required
                        placeholder="0"
                        selectOptions={statusOptions}
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Additional information"
                        name="description"
                        inputLength="large"
                        placeholder="Extra information about service"
                        value={serviceData["description"] || ""}
                        onChange={handleChange}
                        type="text"
                        field="textarea"
                        autoComplete="true"
                      />
                    </div>
                  </div>
                  <DoubleButton
                    buttonText="Update service"
                    loading={isLoading}
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

export default UpdateService;
