import { StopCircleIcon, BanknotesIcon } from "@heroicons/react/24/outline"
import { FarmerContext } from "contexts/FarmerContext";
import { useContext } from "react";


const Occupational2 = () => {
  const { farmerData }: any = useContext(FarmerContext)

  return (
    <>
      <>
        <div className="mx-auto p-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Avg. cost of input
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                GH¢ {farmerData?.avgCostOfInput}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Number of harvest
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.numberOfHarvestPerYear}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Avg. income per harvest
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                GH¢ {farmerData?.avgIncomePerHarvest}
                {/* {Object.keys(farmerData?.)} */}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Keep farm records
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.farmRecords ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Access to storage facilities
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.storageFacility ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Access to buyers
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.buyers ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Access to extension officers
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.accessToExtensionOfficers ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Modern farming techniques training
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.training ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Access to machinery service
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.accessToMachinery ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                What kind of machinery service?
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.machineryService}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Cost of machinery service
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                GH¢ {farmerData?.machineryServiceAmount}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Other income source
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                GH¢ {farmerData?.otherIncomeSource}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Road network
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.roadNetwork}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Means of transport to farms
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.transport?.mode}
              </dd>
            </div>
          </dl>
        </div>
      </>
    </>
  );
};

export default Occupational2