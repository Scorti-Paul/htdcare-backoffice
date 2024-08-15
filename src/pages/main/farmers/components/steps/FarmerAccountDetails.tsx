import { useContext } from "react";
import Input from "../../../../../components/Input";

import { FarmerContext } from "../../../../../contexts/FarmerContext";

const FarmerAccountDetails = () => {
  const { farmerData, setFarmerData }: any = useContext(FarmerContext);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFarmerData({ ...farmerData, [name]: value });
  };

  const genderOptions = [
    { value: "", label: "Select gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const yesNoOptions = [
    { value: "", label: "Yes or No?" },
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const levelOfEducationOption = [
    { value: "", label: "Select level of education" },
    { value: "Uneducated", label: "Uneducated" },
    { value: "J.H.S Graduate", label: "J.H.S Graduate" },
    { value: "S.H.S Graduate", label: "S.H.S Graduate" },
    { value: "Degree Holder", label: "Degree Holder" },
    { value: "Diploma", label: "Diploma" },
    { value: "Masters Degree", label: "Masters Degree" },
    { value: "PhD", label: "PhD" },
  ];

  const maritalStatusOptions = [
    { value: "", label: "Select marital status" },
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
    { value: "Widowed", label: "Widowed" },
  ];

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

  
  const IDTypeOptions = [
    { value: "", label: "Select ID type" },
    { value: "Ghana card", label: "Ghana card" },
    { value: "Drivers license", label: "Drivers license" },
    { value: "Passport", label: "Passport" },
    { value: "Voters ID", label: "Voters ID" },
  ];

  return (
    <>
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <Input
            label="First name"
            name="firstName"
            inputLength="small"
            placeholder="eg. Jane"
            value={farmerData["firstName"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Surname"
            name="surname"
            inputLength="small"
            placeholder="eg. Doe"
            value={farmerData["surname"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Gender"
            name="gender"
            inputLength="small"
            placeholder=""
            value={farmerData["gender"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={genderOptions}
            field="select"
          />

          <Input
            label="Is farm registered?"
            name="isFarmRegistered"
            inputLength="small"
            placeholder=""
            value={farmerData["isFarmRegistered"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={yesNoOptions}
            field="select"
          />

          {farmerData["isFarmRegistered"] === "true" ? (
            <>
              <Input
                label="Business name"
                name="nameOfBusiness"
                inputLength="small"
                placeholder="eg. Farmercom LTD"
                value={farmerData["nameOfBusiness"] || ""}
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
            label="Educational level"
            name="levelOfEducation"
            inputLength="small"
            placeholder=""
            value={farmerData["levelOfEducation"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={levelOfEducationOption}
            field="select"
          />

          <Input
            label="Birth date"
            name="dateOfBirth"
            inputLength="small"
            placeholder=""
            value={farmerData["dateOfBirth"] || ""}
            onChange={handleChange}
            type="date"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Hometown"
            name="hometown"
            inputLength="small"
            placeholder="eg. Aboaso"
            value={farmerData["hometown"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Place of birth"
            name="placeOfBirth"
            inputLength="small"
            placeholder="eg. Doe"
            value={farmerData["placeOfBirth"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Region"
            name="region"
            inputLength="small"
            placeholder=""
            value={farmerData["region"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={regionOptions}
            field="select"
          />

          <Input
            label="Marital status"
            name="maritalStatus"
            inputLength="small"
            placeholder=""
            value={farmerData["maritalStatus"] || ""}
            onChange={handleChange}
            type="select"
            selectOptions={maritalStatusOptions}
            optionalLabel={true}
            hasShowPassword="disable"
            field="select"
          />

          {farmerData["maritalStatus"] === "Married" ? (
            <>
              <Input
                label="Spouse's name"
                name="spouseName"
                inputLength="small"
                placeholder="eg. John Doe"
                value={farmerData["spouseName"] || ""}
                onChange={handleChange}
                type="text"
                field="input"
                optionalLabel={true}
                hasShowPassword="disable"
                autoComplete="true"
              />
              <Input
                label="Spouse's phone number"
                name="spouseContact"
                inputLength="small"
                placeholder="eg. (+233) xx xxx xxxx "
                value={farmerData["spouseContact"] || ""}
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
            label="Number of children"
            name="numberOfChildren"
            inputLength="small"
            placeholder=""
            value={farmerData["numberOfChildren"] || ""}
            onChange={handleChange}
            type="number"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Residential address"
            name="residenceAddress"
            inputLength="small"
            placeholder="eg. 123 Main Street"
            value={farmerData["residenceAddress"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Digital address"
            name="digitalAddress"
            inputLength="small"
            placeholder="eg. GA-543-0125"
            value={farmerData["digitalAddress"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Closest Land mark"
            name="closestLandmarks"
            inputLength="small"
            placeholder="eg. Wizmah Hospital"
            value={farmerData["closestLandmarks"] || ""}
            onChange={handleChange}
            type="text"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Phone number"
            name="phone"
            inputLength="small"
            placeholder="(+233) xx xxx xxxx"
            value={farmerData["phone"] || ""}
            onChange={handleChange}
            type="tel"
            field="input"
            optionalLabel={true}
            hasShowPassword="disable"
            autoComplete="true"
          />

          <Input
            label="Other Phone number"
            name="alternativePhoneNumber"
            inputLength="small"
            placeholder="(+233) xx xxx xxxx"
            value={farmerData["alternativePhoneNumber"] || ""}
            onChange={handleChange}
            type="tel"
            field="input"
            autoComplete="true"
            hasShowPassword="disable"
          />

          <Input
            label="Email address"
            name="email"
            inputLength="small"
            placeholder="you@example.com"
            value={farmerData["email"] || ""}
            onChange={handleChange}
            type="email"
            field="input"
            autoComplete="true"
            optionalLabel={true}
            hasShowPassword="disable"
            required
          />
          
          <Input
                label="ID type?"
                name="IDType"
                inputLength="small"
                placeholder=""
                value={farmerData["IDType"] || ""}
                onChange={handleChange}
                type="select"
                selectOptions={IDTypeOptions}
                optionalLabel={true}
                hasShowPassword="disable"
                field="select"
              />

              <Input
                label="ID Number"
                name="IDNumber"
                inputLength="small"
                placeholder="eg. GHA-XXXXXXXXX-X"
                value={farmerData["IDNumber"] || ""}
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

export default FarmerAccountDetails;
