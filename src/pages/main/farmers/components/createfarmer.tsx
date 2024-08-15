import { FC, useCallback } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Button from "../../../../components/buttons/Button";
import Header from "../../../../components/Header";
import { useState } from "react";
import StepperControl from "../../../../components/Stepper/StepperControl";
import Stepper from "../../../../components/Stepper/Stepper";

import FarmerAccountDetails from "./steps/FarmerAccountDetails";
import FarmDetails from "./steps/FarmDetails";
import FarmDetails2 from "./steps/FarmDetails2";
import FarmDetails3 from "./steps/FarmDetails3";
import Final from "./steps/Final";

import { FarmerContext } from "../../../../contexts/FarmerContext";
import PreviewDetails from "./steps/PreviewDetails";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { createFarmer } from "../../../../api/mutations/farmers";
import { toast } from "react-toastify";

const CreateFarmers: FC<{}> = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [farmerData, setFarmerData] = useState<any>("");
  const [finalData, setFinalData] = useState();
  const [selectedTypeOfFertilizer, setSelectedTypeOfFertilizer] = useState<any>();
  const [selectedTypeOfPesticides, setSelectedTypeOfPesticides] = useState<any>();
  const [selectedTypeOfWeedicides, setSelectedTypeOfWeedicides] = useState<any>();
  const [selectedTypeOfHealthInsurance, setSelectedTypeOfHealthInsurance] = useState<any>();


  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: (body: any) => {
      return createFarmer(body);
    },
    onError: (e: any) => {
      toast?.error(`${e.message}`);
    },
    onSuccess: () => {
      toast?.success("Farmer created successfully");
      navigate("/farmers");
    },
  });
  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault();

      mutateAsync({
        ...farmerData,
        farmRegistration: {
          isFarmRegistered: farmerData.isFarmRegistered,
          nameOfBusiness: farmerData.nameOfBusiness,
        },
        maritalStatus: {
          status: farmerData.maritalStatus,
          spouseName: farmerData.spouseName,
          numberOfChildren: farmerData.numberOfChildren,
          spouseContact: farmerData.spouseContact,
        },
        farmLocation: {
          region: farmerData.region,
          town: farmerData.town,
          district: farmerData.district,
          nearestTown: farmerData.nearestTown,
          closestLandmarks: farmerData.closestLandmarks
        },
        farmAssociation: {
          belongsToAssociation: farmerData.belongsToAssociation,
          associationName: farmerData.associationName,
          associationType: farmerData.associationType,
          assocPurpose: farmerData.assocPurpose,
        },
        farmRecords: {
          haveRecords: farmerData.haveRecords,
          typeOfRecords: farmerData.typeOfRecords,
        },
        storageFacility: {
          typeOfStorage: farmerData.typeOfStorage,
          haveStorageFacility: farmerData.haveStorageFacility,
          costOfStorage: farmerData.costOfStorage,
        },
        extensionOfficer: {
          haveExtensionOfficers: farmerData.haveExtensionOfficers,
          haveAccessToAggregators: farmerData.haveAccessToAggregators,
          extensionOfficerCharge: farmerData.extensionOfficerCharge,
          serviceFromExtensionOfficers: farmerData.serviceFromExtensionOfficers,
        },
        transport: {
          mode: farmerData.mode,
          cost: farmerData.cost,
          distance: farmerData.distance,
        },
        accessToMachinery: {
          value: farmerData.value,
          cost: farmerData.cost,
        },
        technology: {
          usedTechnology: farmerData.usedTechnology,
          technologyType: farmerData.technologyType,
          technologyPurpose: farmerData.technologyPurpose,
        },
        fertilizer: {
          typeOfFertilizer: selectedTypeOfFertilizer,
          fertilizerCostPerSeason: farmerData.fertilizerCostPerSeason,
        },
        pesticides: {
          typeOfPesticides: selectedTypeOfPesticides,
          pesticidesCostPerSeason: farmerData.pesticidesCostPerSeason,
        },
        weedicides: {
          typeOfWeedicide: selectedTypeOfWeedicides,
          weedicidesCostPerSeason: farmerData.weedicidesCostPerSeason,
        },
        financialService: {
          haveFinancialService: farmerData.haveFinancialService,
          typeOfFinancialService: farmerData.typeOfFinancialService,
        },
        insurance: {
          haveHealthInsurance: farmerData.haveHealthInsurance,
          typeOfHealthInsurance: selectedTypeOfHealthInsurance,
        },

      });
    },
    [farmerData, mutateAsync, selectedTypeOfFertilizer, selectedTypeOfPesticides, selectedTypeOfWeedicides, selectedTypeOfHealthInsurance]
  );

  // click on the button make asee
  const handleClick = (e: any, direction: any) => {
    e.preventDefault();

    let newStep = currentStep;

    direction === "continue" ? newStep++ : newStep--;

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  //Steps
  const steps = [
    "Bio Data",
    "Occupational Data",
    "Occupational Data",
    "Occupational Data",
    "Preview",
    "Complete",
  ];

  const displayStep = (step: any) => {
    switch (step) {
      case 1:
        return <FarmerAccountDetails />;
      case 2:
        return <FarmDetails />;
      case 3:
        return <FarmDetails2 />;
      case 4:
        return <FarmDetails3 />;
      case 5:
        return <PreviewDetails />;
      case 6:
        return <Final />;
      default:
    }
  };

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Create Farmer"
            description="Fill out the details to sign up a new farmer."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Farmers"}
              type={"link"}
              path={"/farmers"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>
          <div className="">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <FarmerContext.Provider
                    value={{
                      farmerData,
                      setFarmerData,
                      selectedTypeOfFertilizer,
                      setSelectedTypeOfFertilizer,
                      selectedTypeOfPesticides,
                      setSelectedTypeOfPesticides,
                      selectedTypeOfWeedicides,
                      setSelectedTypeOfWeedicides,
                      selectedTypeOfHealthInsurance,
                      setSelectedTypeOfHealthInsurance,
                      finalData,
                      setFinalData,
                    }}
                  >
                    {displayStep(currentStep)}
                  </FarmerContext.Provider>
                  {currentStep !== steps.length && (
                    <StepperControl
                      handleClick={handleClick}
                      currentStep={currentStep}
                      steps={steps}
                      handleSubmission={handleSubmission}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFarmers;
