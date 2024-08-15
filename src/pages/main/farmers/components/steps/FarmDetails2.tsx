import { useContext, useState } from "react";
import Input from "./../../../../../components/Input";
import Select from "react-select";
import { FarmerContext } from "./../../../../../contexts/FarmerContext";

const FarmDetails2 = () => {
  const { farmerData, setFarmerData }: any = useContext(FarmerContext);
  const [, setSearchString] = useState<string>("");
  const [selectedHaveRecords] = useState<any>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFarmerData({ ...farmerData, [name]: value });
  };

  const yesNoOptions = [
    { value: "", label: "Yes or No?" },
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const typeOfRecordsOptions = [
    { value: "", label: "Select farm records?" },
    { value: "Production records", label: "Production records" },
    { value: "Sales", label: "Sales" },
    { value: "Worker's records", label: "Worker's records" },
    { value: "Agriculture input log", label: "Agriculture input log" },
    { value: "Animal feeds log", label: "Animal feeds log" },
    { value: "Finance", label: "Finance" },
    { value: "Cash and payments book", label: "Cash and payments book" },
    {
      value: "Farm equipment and inventory book",
      label: "Farm equipment and inventory book",
    },
    {
      value: "Yields and deadstock inventory",
      label: "Yields and deadstock inventory",
    },
    { value: "Profit and loss book", label: "Profit and loss book" },
  ];

  const transportOptions = [
    { value: "", label: "Select mode of transportation" },
    { value: "By foot", label: "By foot" },
    { value: "Bicycle", label: "Bicycle" },
    { value: "Motorcycle", label: "Motorcycle" },
    { value: "Public vehicle", label: "Public vehicle" },
    { value: "Private vehicle", label: "Private vehicle" },
  ];

  const typeOfStorageOptions = [
    { value: "", label: "Select storage" },
    { value: "Bulk", label: "Bulk" },
    { value: "Bag storage", label: "Bag storage" },
    { value: "Traditional storage", label: "Traditional storage" },
    { value: "Stacking", label: "Stacking" },
    { value: "Warehouse", label: "Warehouse" },
  ];

  return (
    <>
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <Input
            label="Do you keep farm records?"
            name="haveRecords"
            inputLength="small"
            placeholder=""
            value={farmerData["haveRecords"] || ""}
            onChange={handleChange}
            type="select"
            optionalLabel={true}
            hasShowPassword="disable"
            selectOptions={yesNoOptions}
            field="select"
          />

          {farmerData["haveRecords"] === "true" ? (
            <>
              <div className={"col-span-2"}>
                <label
                  htmlFor="typeOfRecords"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type of farm records?
                </label>
                <div className="mt-4">
                  <Select
                    onInputChange={(e) => setSearchString(e)}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    onChange={farmerData["typeOfRecords"] || ""}
                    defaultValue={selectedHaveRecords}
                    isMulti={true}
                    name="typeOfRecords"
                    options={typeOfRecordsOptions}
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <Input
            label="Do you have access to storage facilities?"
            name="haveStorageFacility"
            inputLength="small"
            placeholder=""
            value={farmerData["haveStorageFacility"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          {farmerData["haveStorageFacility"] === "true" ? (
            <>
              <Input
                label="Type of storage"
                name="typeOfStorage"
                inputLength="small"
                placeholder="eg. Warehousing"
                value={farmerData["typeOfStorage"] || ""}
                onChange={handleChange}
                type="select"
                selectOptions={typeOfStorageOptions}
                optionalLabel={true}
                hasShowPassword="disable"
                field="select"
              />

              <Input
                label="Storage cost"
                name="costOfStorage"
                inputLength="small"
                placeholder="GHC 1234.00"
                value={farmerData["costOfStorage"] || ""}
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
            label="Do you have access to buyers?"
            name="buyers"
            inputLength="small"
            placeholder=""
            value={farmerData["buyers"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          <Input
            label="Do you have access for extension officers?"
            name="haveExtensionOfficers"
            inputLength="small"
            placeholder=""
            value={farmerData["haveExtensionOfficers"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          <Input
            label="Do you have access for aggregators?"
            name="haveAccessToAggregators"
            inputLength="small"
            placeholder=""
            value={farmerData["haveAccessToAggregators"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          {farmerData["haveExtensionOfficers"] === "true" ? (
            <>
              <Input
                label="Extension officer charge"
                name="extensionOfficerCharge"
                inputLength="small"
                placeholder="GHC 1234.00"
                value={farmerData["extensionOfficerCharge"] || ""}
                onChange={handleChange}
                type="number"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />

              <Input
                label="Service from extension officers"
                name="serviceFromExtensionOfficers"
                inputLength="small"
                placeholder="eg. Propagate new farming methods"
                value={farmerData["serviceFromExtensionOfficers"] || ""}
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
            label="Training to modern farming techniques?"
            name="training"
            inputLength="small"
            placeholder=""
            value={farmerData["training"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          <Input
            label="Do you have access to machinery service?"
            name="accessToMachinery"
            inputLength="small"
            placeholder=""
            value={farmerData["accessToMachinery"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          <Input
            label="What kind of machinery service"
            name="machineryService"
            inputLength="small"
            placeholder="eg. Ploughing"
            value={farmerData["machineryService"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="How much do you pay for machinery service?"
            name="machineryServiceAmount"
            inputLength="small"
            placeholder="GHC 1234.00"
            value={farmerData["machineryServiceAmount"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Any other source of income?"
            name="otherIncomeSource"
            inputLength="small"
            placeholder=""
            value={farmerData["otherIncomeSource"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          <Input
            label="What is the road network?"
            name="statusOfRoadNetworkToFarm"
            inputLength="small"
            placeholder="eg. Cape Coast, CR – Twifo Praso, CR"
            value={farmerData["statusOfRoadNetworkToFarm"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Mode of transportation?"
            name="mode"
            inputLength="small"
            placeholder=""
            value={farmerData["mode"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={transportOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          <Input
            label="Cost of transportation"
            name="cost"
            inputLength="small"
            placeholder=""
            value={farmerData["cost"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Distance from farm to the market (in km)"
            name="distance"
            inputLength="small"
            placeholder=""
            value={farmerData["distance"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Distance to nearest health care(in km)"
            name="distanceToNearestHealthCare"
            inputLength="small"
            placeholder=""
            value={farmerData["distanceToNearestHealthCare"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Source of water to farm"
            name="sourceOfWaterToFarm"
            inputLength="small"
            placeholder="eg. Drainage pond"
            value={farmerData["sourceOfWaterToFarm"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Source of water"
            name="sourceOfWater"
            inputLength="small"
            placeholder="eg. Reservoirs"
            value={farmerData["sourceOfWater"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />
        </div>
      </div>
    </>
  );
};

export default FarmDetails2;
