
import { StopCircleIcon, MapPinIcon, BanknotesIcon } from "@heroicons/react/24/outline"

const Occupational1 = ({ state }: any) => {
  return (
    <>
      <div className="mx-auto p-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Farm type
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.farmingType}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Land size
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.landSize} acres
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              No. of livestocks
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.numberOfLivestocks}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <MapPinIcon className="w-5" />Country
            </dt>
            <dd className="mt-1 text-base text-gray-900">{state?.country}</dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <MapPinIcon className="w-5" />
              Land located region
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.landRegion}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <MapPinIcon className="w-5" />
              Village/Town
            </dt>
            <dd className="mt-1 text-base text-gray-900"> {state?.town} </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <MapPinIcon className="w-5" />
              Geo-cordinates of your land Town
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              Longitude: {state?.longitude} <br />
              Latitude:{" "}
              {state?.latitude}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Land status
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.landStatus}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <MapPinIcon className="w-5" />
              Place of birth
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.placeOfBirth}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <BanknotesIcon className="w-5" />
              Rental amount
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.amountPerYear}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Type of workers
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.typeOfWorkers}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              No. of workders
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.numberOfWorkers}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Belong to any Association?
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.association}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Association Type
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.farmAssociationType}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Association name
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.farmAssociationName}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Association Support
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.farmerAssociationSupport}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default Occupational1