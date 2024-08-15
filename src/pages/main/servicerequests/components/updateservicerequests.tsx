import { FC, useCallback, useEffect, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "components/buttons/Button";
import Header from "components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { updateServiceRequest } from "api/mutations/servicerequests";
import { toast } from "react-toastify";
import PersonalDetails from "./personalDetails";
import regions from "components/constants/regions.json";
import ServiceRequestedDetails from "./serviceRequestedDetails";
import { UserIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const UpdateServiceRequests: FC<{}> = () => {
  const [requestService, setRequestService] = useState<any>("");
  const [tempTown, setTempTown] = useState<any>("");
  const [cities, setCities] = useState<string[]>([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState("tab1");

  const handleChange = (e: any) => {
    setRequestService({
      ...requestService,
      [e.target.name]: e.target.value,
    });
  };

  const handleTab1 = () => {
    setTabs("tab1");
  };

  const handleTab2 = () => {
    setTabs("tab2");
  };

  const getCitiesOnRegionChange = useCallback(() => {
    const selectedRegion = regions.find(
      (region) => region?.region === requestService["region"]
    );

    if (selectedRegion) {
      setCities(selectedRegion?.cities || []);
    }
  }, [requestService]);


  useEffect(() => {
    getCitiesOnRegionChange();
  }, [getCitiesOnRegionChange]);

  useEffect(() => {
    if (requestService["region"] && requestService["region"] !== tempTown) {
      setTempTown(requestService["region"]);
      getCitiesOnRegionChange();
    }
  }, [requestService, getCitiesOnRegionChange, tempTown]);


  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updateServiceRequest({ ...body, id: state?._id });
    },
    onError: (e) => {
      toast?.error("Unable to request service");
    },
    onSuccess: () => {
      toast?.success("Service requested successfully");
      navigate("/service-requests");
    },
  });

  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault();
      if (requestService.firstName === undefined) {
        return toast?.error("First name can't be empty");
      }
      if (requestService.lastName === undefined) {
        return toast?.error("First name can't be empty");
      }

      if (requestService.email === undefined) {
        return toast?.error("Email can't be empty");
      }

      if (requestService.phone === undefined) {
        return toast?.error("Phone number can't be empty");
      }

      mutateAsync({
        name: requestService.firstName + " " + requestService.lastName,
        email: requestService.email,
        phone: requestService.phone,
        status: requestService.status,
        startDate: requestService.startDate,
        completionDate: requestService.completionDate,
        paymentStatus: requestService.paymentStatus,
        requestDetails: requestService.description,
      });
    },
    [requestService, mutateAsync]
  );

  const approveRequest = useCallback(
    (e: any) => {
      e?.preventDefault();
      const { status, ...rest } = requestService;
      let notFull = false;

      rest.items.map((item: any) => {
        let toastMsg;
        if (
          item.agreedPrice === 0 ||
          item.agreedPrice === "" ||
          item.agreedPrice === undefined
        ) {
          toastMsg = "Enter value for agreed price";
          notFull = true;
          return toast.error(toastMsg);
        }
        return null;
      });

      if (!notFull) {
        mutateAsync({
          ...rest,
          status: "approved",
        });
      }
    },
    [mutateAsync, requestService]
  );


  const initialCheck = useCallback(() => {
    const firstName = state?.user?.name.split(" ")[0];
    const lastName = state?.user?.name.split(" ")[1];

    if (state) {
      setRequestService({
        firstName: firstName,
        lastName: lastName,
        email: state?.user?.email,
        phone: state?.user?.phone,
        image: state?.user?.image,
        serviceName: state?.service.name,
        serviceImage: state?.service.image,
        serviceDescription: state?.service.description,
        serviceVenderName: state?.service.vendors.name,
        serviceVenderEmail: state?.service.vendors.email,
        serviceID: state?.service._id,
        createdAt: state?.user?.createdAt,
        dateOfService: state?.dateOfService,
        startDate: state?.startDate,
        completionDate: state?.completionDate,
        status: state?.status,
        paymentStatus: state?.paymentStatus,
        description: state?.description,
      });
    }
  }, [state]);


  useEffect(() => {
    initialCheck();
  }, [initialCheck]);

  useEffect(() => {
    getCitiesOnRegionChange();
  }, [getCitiesOnRegionChange]);

  useEffect(() => {
    if (requestService["region"] && requestService["region"] !== tempTown) {
      setTempTown(requestService["region"]);
      getCitiesOnRegionChange();
    }
  }, [requestService, getCitiesOnRegionChange, tempTown]);

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Update Request"
            description="Edit details to update request."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Service Requests"}
              type={"link"}
              path={"/service-requests"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>

          <ul className="w-full mx-auto flex justify-center">
            <li
              className={`transition-all gap-3 duration-300 border-b-2  flex ${
                tabs === "tab1"
                  ? "border-b-green-500 text-green-600 px-9 pb-3 font-bold cursor-pointer w-96"
                  : "font-normal cursor-pointer px-9 pb-3 w-96"
              }`}
              onClick={handleTab1}
            >
              <div className="flex items-start mt-1">
                <UserIcon className="w-6" />
              </div>
              <div className="flex text-left flex-col">
                <span>Request & Customer Information</span>
                <span
                  className={`text-left ${
                    tabs === "tab1"
                      ? "text-sm text-green-500  font-normal "
                      : "text-sm text-gray-500  font-normal"
                  }`}
                >
                  Customer details and related data
                </span>
              </div>
            </li>
            <li
              className={
                tabs === "tab2"
                  ? "transition-all duration-300 border-b-2 border-b-green-500 text-green-600 px-9 pb-3 font-bold cursor-pointer w-96"
                  : "transition-all duration-300 font-normal border-b-2 cursor-pointer px-9 pb-3 w-96"
              }
              onClick={handleTab2}
            >
              <div className="flex gap-2 items-center justify-center ">
                <ShoppingBagIcon className="w-6" /> <span>Request Items</span>
              </div>
              <p
                className={
                  tabs === "tab2"
                    ? "text-sm text-green-500 text-center font-normal pt-1"
                    : "text-sm text-gray-500 text-center font-normal pt-1"
                }
              >
                Selected service to request
              </p>
            </li>
          </ul>

          <>
            <div className="mt-5 md:col-span-2 md:mt-0">
              {tabs === "tab1" ? (
                <>
                  <PersonalDetails requestService={requestService} />
                </>
              ) : (
                <>
                  <ServiceRequestedDetails
                    requestService={requestService}
                    handleSubmission={handleSubmission}
                    setRequestService={setRequestService}
                    handleChange={handleChange}
                    regions={regions}
                    tempTown={tempTown}
                    setTempTown={setTempTown}
                    cities={cities}
                    isLoading={isLoading}
                    approveOrder={approveRequest}
                  />
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default UpdateServiceRequests;
