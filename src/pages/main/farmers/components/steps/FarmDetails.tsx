import { useContext } from "react";
import Input from "./../../../../../components/Input";

import { FarmerContext } from "./../../../../../contexts/FarmerContext";

const FarmDetails = () => {
  const { farmerData, setFarmerData }: any = useContext(FarmerContext);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFarmerData({ ...farmerData, [name]: value });
  };

  const regionOptions = [
    { value: "", label: "Select region" },
    { value: "Ahafo", label: "Ahafo" },
    { value: "Ashanti", label: "Ashanti" },
    { value: "Bono East", label: "Bono East" },
    { value: "Brong Ahafo", label: "Brong Ahafo" },
    { value: "Central", label: "Central" },
    { value: "Eastern", label: "Eastern" },
    { value: "Greater Accra", label: "Greater Accra" },
    { value: "North East", label: "North East" },
    { value: "Northern", label: "Northern" },
    { value: "Oti", label: "Oti" },
    { value: "Savannah", label: "Savannah" },
    { value: "Upper East", label: "Upper East" },
    { value: "Upper West", label: "Upper West" },
    { value: "Western", label: "Western" },
    { value: "Western North", label: "Western North" },
    { value: "Ho", label: "Ho" },
  ];

  const cropTypeOptions = [
    { value: "", label: "Select farming type" },
    { value: "Crop", label: "Crop" },
    { value: "Livestock", label: "Livestock" },
    { value: "Mixed", label: "Mixed" },
  ];

  const landStatusOptions = [
    { value: "", label: "Select land status" },
    { value: "Rented", label: "Rented" },
    { value: "Owned", label: "Owned" },
    { value: "Family owned", label: "Family owned" },
    { value: "Both owned and rented", label: "Both owned and rented" },
  ];

  const yesNoOptions = [
    { value: "", label: "Yes or No?" },
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const typeOfWorkersOptions = [
    { value: "", label: "Select type of workers" },
    { value: "Causal", label: "Causal" },
    { value: "Seasonal", label: "Seasonal" },
    { value: "Permanent", label: "Permanent" },
    { value: "Mixed", label: "Mixed" },
  ];

  const associationTypeOptions = [
    { value: "", label: "Select association type" },
    { value: "Formal", label: "Formal" },
    { value: "Informal", label: "Informal" },
  ];

  const typeOfCropOptions = [
    { value: "", label: "Select crop type" },
    { value: "Food crops", label: "Food crops" },
    { value: "Feed crops", label: "Feed crops" },
    { value: "Fiber crops", label: "Fiber crops" },
    { value: "Oil crops", label: "Oil crops" },
    { value: "Ornamental crops", label: "Ornamental crops" },
    { value: "Industrial crops", label: "Industrial crops" },
  ];

  const typeOfLivestockOptions = [
    { value: "", label: "Select type of livestock" },
    { value: "Chickens", label: "Chickens" },
    { value: "Cattle", label: "Cattle" },
    { value: "Goats", label: "Goats" },
    { value: "Dairy farming", label: "Dairy farming" },
    { value: "Pigs", label: "Pigs" },
    { value: "Sheep", label: "Sheep" },
    { value: "Grasscutter", label: "Grasscutter" },
    { value: "Fish farming", label: "Fish farming" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Bee farming", label: "Bee farming" },
    { value: "Duck", label: "Duck" },
  ];

  // console.log(farmerData)
  return (
    <>
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <Input
            label="Type of farming"
            name="farmingType"
            inputLength="small"
            placeholder=""
            value={farmerData["farmingType"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={cropTypeOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          {farmerData["farmingType"] === "Crop" ? (
            <>
              <Input
                label="What crop type do you cultivate?"
                name="typeOfCrop"
                inputLength="small"
                placeholder=""
                value={farmerData["typeOfCrop"] || ""}
                onChange={handleChange}
                type="select"
                selectOptions={typeOfCropOptions}
                optionalLabel={true}
                hasShowPassword="disable"
                field="select"
              />

              <Input
                label="Size of land cultivated (in acres)"
                name="farmSize"
                inputLength="small"
                placeholder=""
                value={farmerData["farmSize"] || ""}
                onChange={handleChange}
                type="number"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />
            </>
          ) : farmerData["farmingType"] === "Mixed" ? (
            <>
              <Input
                label="What crop type do you cultivate?"
                name="typeOfCrop"
                inputLength="small"
                placeholder=""
                value={farmerData["typeOfCrop"] || ""}
                onChange={handleChange}
                type="select"
                selectOptions={typeOfCropOptions}
                optionalLabel={true}
                hasShowPassword="disable"
                field="select"
              />

              <Input
                label="Size of land cultivated (in acres)"
                name="farmSize"
                inputLength="small"
                placeholder=""
                value={farmerData["farmSize"] || ""}
                onChange={handleChange}
                type="number"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />

              <Input
                label="What type of livestock?"
                name="typeOfLivestock"
                inputLength="small"
                placeholder=""
                value={farmerData["typeOfLivestock"] || ""}
                onChange={handleChange}
                type="select"
                selectOptions={typeOfLivestockOptions}
                optionalLabel={true}
                hasShowPassword="disable"
                field="select"
              />

              <Input
                label="Number of livestock"
                name="numberOfLivestock"
                inputLength="small"
                placeholder=""
                value={farmerData["numberOfLivestock"] || ""}
                onChange={handleChange}
                type="number"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />
            </>
          ) : (
            <>
              <Input
                label="What type of livestock?"
                name="typeOfLivestock"
                inputLength="small"
                placeholder=""
                value={farmerData["typeOfLivestock"] || ""}
                onChange={handleChange}
                type="select"
                selectOptions={typeOfLivestockOptions}
                optionalLabel={true}
                hasShowPassword="disable"
                field="select"
              />

              <Input
                label="Number of livestock"
                name="numberOfLivestock"
                inputLength="small"
                placeholder=""
                value={farmerData["numberOfLivestock"] || ""}
                onChange={handleChange}
                type="number"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />
            </>
          )}

          <Input
            label="Land located region"
            name="landRegion"
            inputLength="small"
            placeholder=""
            value={farmerData["landRegion"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={regionOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          <Input
            label="Village/Town"
            name="town"
            inputLength="small"
            placeholder=""
            value={farmerData["town"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Nearest town"
            name="nearestTown"
            inputLength="small"
            placeholder=""
            value={farmerData["nearestTown"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Geo-coordinates of your land"
            name="longitude"
            inputLength="small"
            placeholder="Longitude"
            value={farmerData["longitude"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label=" ."
            name="latitude"
            inputLength="small"
            placeholder="Latitude"
            value={farmerData["latitude"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Land status"
            name="farmLandOwnershipStructure"
            inputLength="small"
            placeholder=""
            value={farmerData["farmLandOwnershipStructure"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={landStatusOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          {farmerData["farmLandOwnershipStructure"] === "Rented" ||
          farmerData["farmLandOwnershipStructure"] ===
            "Both owned and rented" ? (
            <>
              <Input
                label="How many farms rented per year?"
                name="farmRentPerYear"
                inputLength="small"
                placeholder=""
                value={farmerData["farmRentPerYear"] || ""}
                onChange={handleChange}
                type="number"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />

              <Input
                label="How much do you pay per year (GHS)?"
                name="amountPerYear"
                inputLength="small"
                placeholder=""
                value={farmerData["amountPerYear"] || ""}
                onChange={handleChange}
                type="number"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />
            </>
          ) : (
            ""
          )}

          <Input
            label="Have other business?"
            name="haveOtherBusinesses"
            inputLength="small"
            placeholder=""
            value={farmerData["haveOtherBusinesses"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          {farmerData["haveOtherBusinesses"] === "true" ? (
            <>
              <Input
                label="Name of other business"
                name="nameOfOtherBusiness"
                inputLength="small"
                placeholder="eg. Faith Farms LTD"
                value={farmerData["nameOfOtherBusiness"] || ""}
                onChange={handleChange}
                type="text"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />
            </>
          ) : (
            ""
          )}

          <Input
            label="Type of workers"
            name="typeOfWorkers"
            inputLength="small"
            placeholder=""
            value={farmerData["typeOfWorkers"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={typeOfWorkersOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          <Input
            label="Number of workers"
            name="numberOfWorkers"
            inputLength="small"
            placeholder=""
            value={farmerData["numberOfWorkers"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Do you belong to any association(s)?"
            name="belongsToAssociation"
            inputLength="small"
            placeholder=""
            value={farmerData["belongsToAssociation"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          {farmerData["belongsToAssociation"] === "true" ? (
            <>
              <Input
                label="Association name(s)"
                name="associationName"
                inputLength="small"
                placeholder="eg. Calvale Farmer's Association"
                value={farmerData["associationName"] || ""}
                onChange={handleChange}
                type="text"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />

              <Input
                label="Association type?"
                name="associationType"
                inputLength="small"
                placeholder=""
                value={farmerData["associationType"] || ""}
                onChange={handleChange}
                type="select"
                selectOptions={associationTypeOptions}
                optionalLabel={true}
                hasShowPassword="disable"
                field="select"
              />

              <Input
                label="Purpose of the association"
                name="assocPurpose"
                inputLength="small"
                placeholder="eg. Finance"
                value={farmerData["assocPurpose"] || ""}
                onChange={handleChange}
                type="text"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />
            </>
          ) : (
            ""
          )}

          <Input
            label="Average cost of input"
            name="avgCostOfInput"
            inputLength="small"
            placeholder=""
            value={farmerData["avgCostOfInput"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Number of harvest"
            name="numberOfHarvestPerYear"
            inputLength="small"
            placeholder=""
            value={farmerData["numberOfHarvestPerYear"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Average income per harvest"
            name="avgIncomePerHarvest"
            inputLength="small"
            placeholder=""
            value={farmerData["avgIncomePerHarvest"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Planting season"
            name="plantSeason"
            inputLength="small"
            placeholder="eg. Mid-March to mid-April"
            value={farmerData["plantSeason"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Harvest season"
            name="harvestSeason"
            inputLength="small"
            placeholder="eg. May 1 to June 1—late spring"
            value={farmerData["harvestSeason"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Have access to protective equipment?"
            name="haveAccessToProtectiveEquipment"
            inputLength="small"
            placeholder=""
            value={farmerData["haveAccessToProtectiveEquipment"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          {farmerData["haveAccessToProtectiveEquipment"] === "true" ? (
            <>
              <Input
                label="Equipment"
                name="equipment"
                inputLength="small"
                placeholder="eg. Gloves"
                value={farmerData["equipment"] || ""}
                onChange={handleChange}
                type="text"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default FarmDetails;
