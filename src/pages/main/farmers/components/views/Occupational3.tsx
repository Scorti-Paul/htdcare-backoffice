import { StopCircleIcon, BanknotesIcon } from "@heroicons/react/24/outline"

const Occupational3 = ({ state }: any) => {
  return (
    <>
      <>
        <div className="mx-auto p-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Avg. cost for weedicide in a crop season
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.avgPriceOfWeedicides}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Avg. cost for pesticide in a crop season
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.avgPriceOfWeedicides}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Avg. cost for fertilizer in a crop season
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.avgPriceOfPesticides}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Distance from farmt to the market
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.distance} kms
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Do you insure your crops?
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.insureCrop ? "Yes" : "No"}
              </dd>
            </div>
          </dl>
        </div>
      </>
    </>
  );
};

export default Occupational3