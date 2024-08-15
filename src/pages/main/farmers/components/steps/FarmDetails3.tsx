import { useContext, useState } from "react";
import Input from "./../../../../../components/Input";

import { FarmerContext } from "./../../../../../contexts/FarmerContext";
import ReactSelect from "react-select";

const FarmDetails3 = () => {
  const {
    farmerData,
    setFarmerData,
    setSelectedTypeOfFertilizer,
    setSelectedTypeOfPesticides,
    setSelectedTypeOfWeedicides,
    setSelectedTypeOfHealthInsurance,
  }: any = useContext(FarmerContext);
  const [, setSearchString] = useState<string>("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFarmerData({ ...farmerData, [name]: value });
  };

  const yesNoOptions = [
    { value: "", label: "Yes or No?" },
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const typeOfFertilizerOptions = [
    { value: "", label: "Select type of fertilizers" },
    { value: "Organic fertilizers", label: "Organic fertilizers" },
    { value: "Potassium fertilizers", label: "Potassium fertilizers" },
    { value: "Phosphorus fertilizers", label: "Phosphorus fertilizers" },
    {
      value: "Controlled release fertilizers",
      label: "Controlled release fertilizers",
    },
    { value: "NPK", label: "NPK" },
    { value: "Micro nutrients", label: "Micro nutrients" },
    { value: "Livestock manure", label: "Livestock manure" },
    { value: "Inhibitors", label: "Inhibitors" },
    { value: "Phosphate rock", label: "Phosphate rock" },
  ];

  const typeOfPesticidesOptions = [
    { value: "", label: "Select type of pesticides" },
    { value: "Herbicides", label: "Herbicides" },
    { value: "Fungicides", label: "Fungicides" },
    { value: "Carbamate", label: "Carbamate" },
    { value: "Rodenticides", label: "Rodenticides" },
    { value: "Insecticides", label: "Insecticides" },
  ];

  const typeOfWeedicidesOptions = [
    { value: "", label: "Select type of weedicides" },
    { value: "Nikogram", label: "Nikogram" },
    { value: "Glyphosate", label: "Glyphosate" },
    { value: "Atrazine", label: "Atrazine" },
    { value: "Metribuzin", label: "Metribuzin" },
    { value: "Pretilachlor", label: "Pretilachlor" },
    { value: "Isoproturon", label: "Isoproturon" },
    { value: "Metsulfuron methyl", label: "Metsulfuron methyl" },
    { value: "Sempra Herbicide", label: "Sempra Herbicide" },
    { value: "Neem extract", label: "Neem extract" },
  ];

  const technologyTypeOptions = [
    { value: "", label: "Select type of technology used" },
    { value: "Livestock monitoring", label: "Livestock monitoring" },
    { value: "Agriculture sensors", label: "Agriculture sensors" },
    { value: "Soil sensor", label: "Soil sensor" },
    {
      value: "Drones and satellite imaging",
      label: "Drones and satellite imaging",
    },
    { value: "Robotics", label: "Robotics" },
    { value: "Minichromosome technology", label: "Minichromosome technology" },
    { value: "Biotechnology", label: "Biotechnology" },
    { value: "Automation", label: "Automation" },
    { value: "Weather tracking", label: "Weather tracking" },
    { value: "Big data", label: "Big data" },
    { value: "Hydroponics", label: "Hydroponics" },
    { value: "GIS", label: "GIS" },
    {
      value: "GPS technology in agriculture",
      label: "GPS technology in agriculture",
    },
    { value: "Artificial intelligence", label: "Artificial intelligence" },
    { value: "IoT in agriculture", label: "IoT in agriculture" },
  ];

  const typeOfFinancialServiceOptions = [
    { value: "", label: "Select type of finance service" },
    { value: "Lease", label: "Lease" },
    { value: "Asset Finance", label: "Asset Finance" },
    { value: "Contract farming", label: "Contract farming" },
    { value: "Trade credit", label: "Trade credit" },
    { value: "Agribusiness loans", label: "Agribusiness loans" },
    { value: "Warehouse receipt loans", label: "Warehouse receipt loans" },
    { value: "Livestock loans", label: "Livestock loans" },
    { value: "Business loans", label: "Business loans" },
    { value: "Digital finance", label: "Digital finance" },
  ];

  const typeOfHealthInsuranceOptions = [
    { value: "", label: "Select type of health insurance" },
    { value: "Crop insurance", label: "Crop insurance" },
    { value: "Livestock insurance", label: "Livestock insurance" },
    { value: "Crop revenue coverage", label: "Crop revenue coverage" },
    { value: "Agriculture insurance", label: "Agriculture insurance" },
    {
      value: "Multi peril crop insurance",
      label: "Multi peril crop insurance",
    },
    { value: "Poultry insurance", label: "Poultry insurance" },
    { value: "Plantation fire insurance", label: "Plantation fire insurance" },
    { value: "Drought insurance", label: "Drought insurance" },
    { value: "Index-based insurance", label: "Index-based insurance" },
  ];

  
  return (
    <>
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className={"col-span-2"}>
            <label
              htmlFor="typeOfRecords"
              className="block text-sm font-medium text-gray-700"
            >
              Type of fertilizer
            </label>
            <div className="mt-4">
              <ReactSelect
                onInputChange={(e) => setSearchString(e)}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                onChange={(e) =>
                  setSelectedTypeOfFertilizer(e?.map((item: any) => item.value))
                }
                isMulti={true}
                name="typeOfFertilizer"
                options={typeOfFertilizerOptions?.map((item: any) => {
                  return {
                    value: item.value,
                    label: item.label,
                  };
                })}
              />
            </div>
          </div>

          <Input
            label="Cost of fertilizer per season"
            name="fertilizerCostPerSeason"
            inputLength="small"
            placeholder="GHC 1234.00"
            value={farmerData["fertilizerCostPerSeason"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <div className={"col-span-2"}>
            <label
              htmlFor="typeOfRecords"
              className="block text-sm font-medium text-gray-700"
            >
              Type of pesticides
            </label>
            <div className="mt-4">
              <ReactSelect
                onInputChange={(e) => setSearchString(e)}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                isMulti={true}
                name="typeOfPesticides"
                onChange={(e) =>
                  setSelectedTypeOfPesticides(e?.map((item: any) => item.value))
                }
                options={typeOfPesticidesOptions?.map((item: any) => {
                  return {
                    value: item.value,
                    label: item.label,
                  };
                })}
              />
            </div>
          </div>

          <Input
            label="Cost of pesticides per season"
            name="pesticidesCostPerSeason"
            inputLength="small"
            placeholder="GHC 1234.00"
            value={farmerData["pesticidesCostPerSeason"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <div className={"col-span-2"}>
            <label
              htmlFor="typeOfRecords"
              className="block text-sm font-medium text-gray-700"
            >
              Type of weedicides
            </label>
            <div className="mt-4">
              <ReactSelect
                onInputChange={(e) => setSearchString(e)}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                isMulti={true}
                name="typeOfWeedicides"
                onChange={(e) =>
                  setSelectedTypeOfWeedicides(e?.map((item: any) => item.value))
                }
                options={typeOfWeedicidesOptions?.map((item: any) => {
                  return {
                    value: item.value,
                    label: item.label,
                  };
                })}
              />
            </div>
          </div>

          <Input
            label="Cost of weedicides per season"
            name="weedicidesCostPerSeason"
            inputLength="small"
            placeholder="GHC 1234.00"
            value={farmerData["weedicidesCostPerSeason"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Do you have access for aggregators?"
            name="haveAccessToAggregators"
            inputLength="small"
            placeholder="GHC 1234.00"
            value={farmerData["haveAccessToAggregators"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          <Input
            label="Your average revenue?"
            name="avgRevenue"
            inputLength="small"
            placeholder="GHC 1234.00"
            value={farmerData["avgRevenue"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Do you have access for aggregators?"
            name="haveAccessToAggregators"
            inputLength="small"
            placeholder="GHC 1234.00"
            value={farmerData["haveAccessToAggregators"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          <Input
            label="Do you insure your crops?"
            name="insureCrop"
            inputLength="small"
            placeholder=""
            value={farmerData["insureCrop"] || ""}
            onChange={handleChange}
            type="select"
            optionalLabel={true}
            hasShowPassword="disable"
            selectOptions={yesNoOptions}
            field="select"
          />

<Input
            label="Have any insurance?"
            name="haveHealthInsurance"
            inputLength="small"
            placeholder=""
            value={farmerData["haveHealthInsurance"] || ""}
            onChange={handleChange}
            type="select"
            optionalLabel={true}
            hasShowPassword="disable"
            selectOptions={yesNoOptions}
            field="select"
          />

          {farmerData["haveHealthInsurance"] === "true" ? (
            <>
              <div className={"col-span-2"}>
                <label
                  htmlFor="typeOfRecords"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type of insurance
                </label>
                <div className="mt-4">
                  <ReactSelect
                    onInputChange={(e) => setSearchString(e)}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    isMulti={true}
                    name="typeOfHealthInsurance"
                    onChange={(e) =>
                      setSelectedTypeOfHealthInsurance(
                        e?.map((item: any) => item.value)
                      )
                    }
                    options={typeOfHealthInsuranceOptions?.map((item: any) => {
                      return {
                        value: item.value,
                        label: item.label,
                      };
                    })}
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <Input
            label="Have used technology? "
            name="usedTechnology"
            inputLength="small"
            placeholder=""
            value={farmerData["usedTechnology"] || ""}
            onChange={handleChange}
            type="select"
            optionalLabel={true}
            hasShowPassword="disable"
            selectOptions={yesNoOptions}
            field="select"
          />

          {farmerData["usedTechnology"] === "true" ? (
            <>
              <Input
                label="Type of technology used"
                name="technologyType"
                inputLength="small"
                placeholder=""
                value={farmerData["technologyType"] || ""}
                onChange={handleChange}
                type="select"
                optionalLabel={true}
                hasShowPassword="disable"
                selectOptions={technologyTypeOptions}
                field="select"
              />

              <Input
                label="Purpose of the technology"
                name="technologyPurpose"
                inputLength="small"
                placeholder="eg. Watering produce"
                value={farmerData["technologyPurpose"] || ""}
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
            label="Have financial service?"
            name="haveFinancialService"
            inputLength="small"
            placeholder=""
            value={farmerData["haveFinancialService"] || ""}
            onChange={handleChange}
            type="select"
            optionalLabel={true}
            hasShowPassword="disable"
            selectOptions={yesNoOptions}
            field="select"
          />

          {farmerData["haveFinancialService"] === "true" ? (
            <>
              <Input
                label="Type of financial service"
                name="typeOfFinancialService"
                inputLength="small"
                placeholder=""
                value={farmerData["typeOfFinancialService"] || ""}
                onChange={handleChange}
                type="select"
                optionalLabel={true}
                hasShowPassword="disable"
                selectOptions={typeOfFinancialServiceOptions}
                field="select"
              />
            </>
          ) : (
            ""
          )}

          
          <Input
            label="Want to secure your crops?"
            name="wantToSecureCrops"
            inputLength="small"
            placeholder=""
            value={farmerData["wantToSecureCrops"] || ""}
            onChange={handleChange}
            type="select"
            optionalLabel={true}
            hasShowPassword="disable"
            selectOptions={yesNoOptions}
            field="select"
          />
        </div>
      </div>
    </>
  );
};

export default FarmDetails3;
