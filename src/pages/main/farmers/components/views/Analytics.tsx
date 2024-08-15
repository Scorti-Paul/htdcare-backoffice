import { getSingleFarmer } from 'api/mutations/farmers';
import {useState} from "react";
import {useQuery} from "react-query";
import {StopCircleIcon, BanknotesIcon} from "@heroicons/react/24/outline";

const Analytics = ({state}: any) => {
  const [singleItem, setSingleItem] = useState<any>(null);

  const {isFetching} = useQuery(
    ["singleFarmerId", state?._id],
    () =>
      getSingleFarmer({
        params: {id: state?._id},
      }),
    {
      onSuccess: (data) => setSingleItem(data?.analytics),
    }
  );

  return (
    <div className="mx-auto p-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        {!isFetching && (
          <>
            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Total Cost
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.totalCost || "N/A"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Estimated Revenue
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {singleItem?.estimatedRevenue || "N/A"}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <BanknotesIcon className="w-5" />
                Net Revenue
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {singleItem?.netRevenue || "N/A"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <StopCircleIcon className="w-5" />
                Excess Land{" "}
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {singleItem?.excessLand || "N/A"}
              </dd>
            </div>
          </>
        )}
      </dl>
    </div>
  );
};

export default Analytics;
