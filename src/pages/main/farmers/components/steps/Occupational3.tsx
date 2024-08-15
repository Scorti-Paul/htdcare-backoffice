import { StopCircleIcon, BanknotesIcon } from "@heroicons/react/24/outline"
import { FarmerContext } from "contexts/FarmerContext";
import { useContext } from "react";

const Occupational3 = () => {
  const { farmerData }: any = useContext(FarmerContext)

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
                {farmerData?.avgPriceOfWeedicides}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Avg. cost for pesticide in a crop season
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.avgPriceOfWeedicides}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Avg. cost for fertilizer in a crop season
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.avgPriceOfPesticides}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Distance from farmt to the market
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.distance} kms
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Do you insure your crops?
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {farmerData?.insureCrop ? "Yes" : "No"}
              </dd>
            </div>
          </dl>
        </div>
      </>
    </>
  );
};

export default Occupational3