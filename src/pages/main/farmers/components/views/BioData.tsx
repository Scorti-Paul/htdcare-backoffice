
import { StopCircleIcon, EnvelopeIcon, PhoneIcon, CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline"
const BioData = ({ state }: any) => {
  const dateOfBirth = new Date(state?.dateOfBirth);
  const birthDate = `${dateOfBirth.getFullYear()}-${dateOfBirth.getMonth()}-${dateOfBirth.getDate()}`;

  return (
    <>
      <div className="mx-auto p-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Fullname</dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.firstName} {state?.surname}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Gender</dt>
            <dd className="mt-1 text-base text-gray-900">{state?.gender}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Educational level
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.levelOfEducation}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <EnvelopeIcon className="w-5" />
              Email</dt>
            <dd className="mt-1 text-base text-gray-900"> {state?.email} </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <PhoneIcon className="w-5" />
              Phone number</dt>
            <dd className="mt-1 text-base text-gray-900"> {state?.phone} </dd>
          </div>
          {state?.alternativePhoneNumber && (
            <div className="sm:col-span-1">
              <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <PhoneIcon className="w-5" />
                Other phone number
              </dt>
              <dd className="mt-1 text-base text-gray-900">
                {state?.alternativePhoneNumber}
              </dd>
            </div>
          )}
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <CalendarIcon className="w-5" />Date of birth</dt>
            <dd className="mt-1 text-base text-gray-900"> {birthDate}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />Hometown</dt>
            <dd className="mt-1 text-base text-gray-900">{state?.hometown}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" /> Place of birth
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.placeOfBirth}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">  <StopCircleIcon className="w-5" />
              Region</dt>
            <dd className="mt-1 text-base text-gray-900"> {state?.region}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Marital status
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.marritalStutus}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Spouse's name</dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.spouseName}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <PhoneIcon   className="w-5" />
              Spouse's phone
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.spouseContact}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              No. of children
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.numberOfChildren}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <MapPinIcon className="w-5" />
              Registered address
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.residenceAddress}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <MapPinIcon className="w-5" />
              Digital address/Landmark
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {state?.digitalAddress}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <StopCircleIcon className="w-5" />
              Registered name
            </dt>
            <dd className="mt-1 text-base text-gray-900"> {state?.name} </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default BioData