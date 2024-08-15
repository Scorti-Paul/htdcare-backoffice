import { StopCircleIcon, BanknotesIcon } from "@heroicons/react/24/outline"

const Occupational2 = ({ state }: any) => {
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
                GH¢ {state?.avgCostOfInput}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Number of harvest
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.numberOfHarvestPerYear}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Avg. income per harvest
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                GH¢ {state?.avgIncomePerHarvest}
                {/* {Object.keys(state?.)} */}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Keep farm records
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.farmRecords ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Access to storage facilities
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.storageFacility ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Access to buyers
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.buyers ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Access to extension officers
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.accessToExtensionOfficers ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Modern farming techniques training
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.training ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Access to machinery service
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.accessToMachinery ? "Yes" : "No"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                What kind of machinery service?
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.machineryService}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Cost of machinery service
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                GH¢ {state?.machineryServiceAmount}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Other income source
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                GH¢ {state?.otherIncomeSource}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Road network
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.roadNetwork}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Means of transport to farms
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.transport?.mode}
              </dd>
            </div>
          </dl>
        </div>
      </>
    </>
  );
};

export default Occupational2