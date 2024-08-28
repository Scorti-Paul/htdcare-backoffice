import {
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { UserIcon, CalendarIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, BriefcaseIcon, UsersIcon, WalletIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Link, useLocation } from 'react-router-dom'
import Table from "components/Table";
import { Column } from "components/Table/types";
import usePagination from "hooks/usePagination";
import { useQuery } from "react-query";
import { MoonLoader } from "react-spinners";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Suspense, useCallback, useState } from "react";
import TopLoader from "components/loaders/top";
import CreateMedicalHistory from "pages/main/medicalHistory/components/create";
import { getPatientMedicalHistories } from "api/mutations/dentist";


export default function ViewPatient() {
  const { state } = useLocation()
  const [showAdd, setShowAdd] = useState(false);

  const birthDate = new Date(state.birthDate)
  const currentYear = new Date()
  const age = currentYear.getFullYear() - birthDate.getFullYear()

  const toggleShowAdd = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      setShowAdd(!showAdd);
    },
    [showAdd]
  );

  const patientDetails = [
    { icon: UserIcon, label: 'Gender', state: state.gender },
    { icon: CalendarIcon, label: 'Date of Birth', state: moment(state.birthDate)?.format("MMM DD, YYYY") },
    { icon: PhoneIcon, label: 'Phone', state: state.phone },
    { icon: MapPinIcon, label: 'Address', state: state.location.address },
    { icon: EnvelopeIcon, label: 'Email', state: state.email },
    { icon: WalletIcon, label: state.identification.cardType, state: state.identification.cardNumber },
    { icon: UsersIcon, label: 'Marital Status', state: state.maritalStatus },
    { icon: BriefcaseIcon, label: 'Occupation', state: state.occupation },
    {
      icon: BriefcaseIcon, label: 'Joined On', state: moment(state?.createdAt)?.format(
        "MMM DD, YYYY"
      )
    },
  ]

  const { Pagination, page, limit } = usePagination(1, 10);

  const { data, isFetching, refetch } = useQuery(["medicalHistoryList", page], () =>
    getPatientMedicalHistories({
      params: { page, limit, populate: ["dentist"], patient: state?._id },
    })
  );

  const columns: Column[] = [
    {
      headerText: "Clinic",
      keys: { type: "text", value: ["dentist.clinic.name", "dentist.clinic.phone"] },
      type: "text",
    },
    {
      headerText: "Allergies",
      keys: { type: "text", value: ["allergies"] },
      type: "text",
    },
    {
      headerText: "Diagnosis",
      keys: { type: "text", value: ["diagnosis"] },
      type: "text",
    },
    {
      headerText: "Procedure",
      keys: { type: "text", value: ["procedure"] },
      type: "text",
    },
    {
      headerText: "Created On",
      type: "date",
      keys: { type: "date", value: ["createdAt"] },
      format: "MMM DD, YYYY",
    }
  ];

  return (
    <>
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-16">
          <section className="pb-8 px-0">
            <div className="flex mt-4 flex-col">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-medium leading-6 text-black">
                    Patient Profile
                  </h3>
                  <p className="text-darkBlue/70 font-medium text-sm">
                    {state?.patientCode}
                  </p>
                </div>
                <nav
                  className="flex items-start space-x-3"
                  aria-label="Breadcrumb"
                >
                  <Link
                    to="/"
                    className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
                  >
                    <span className="text-gray-600">Home</span>
                  </Link>
                  <Link
                    to="/patients"
                    className="inline-flex items-center font-medium space-x-3 text-sm text-gray-900"
                  >
                    <ChevronRightIcon
                      className="-ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-600">Patients</span>
                  </Link>
                  <span
                    className="inline-flex items-center space-x-3 text-sm font-light text-gray-900"
                  >
                    <ChevronRightIcon
                      className="-ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-600">Profile</span>
                  </span>
                </nav>
              </div>
            </div>
          </section>
          <div className="flex gap-8">
            <div className="border shadow-sm rounded-3xl max-w-xs">
              <div className="text-center bg-gradient-to-br from-primary-400 to-primary-200 rounded-tl-3xl py-12 rounded-tr-3xl shadow-sm">
              </div>
              <div className=" text-center">
                <img src='https://firebasestorage.googleapis.com/v0/b/backoffice-staging-c8a4a.appspot.com/o/images%2F1694076769549.jpeg?alt=media&token=3ad47252-312e-4e12-8c64-25664a389cf8' alt="" className={`rounded-full w-20 h-20 inline-block border-2 border-white -mt-12`} />
              </div>
              <p className="text-xl font-medium text-darkBlue mt-3 mb-1  text-center">
                {`${state.firstName} ${state.surname} ${state?.otherName !== undefined ? state?.otherName : ''}`}
              </p>
              <p className="text-darkBlue/60  text-center">{age} Years old</p>
              <div className="w-full h-0.5 bg-gray-100 my-6"></div>
              {
                patientDetails.map((item: any, idx: any) => {
                  return (
                    <div key={idx} className="flex flex-row items-center px-6 py-2">
                      <div className="flex gap-3 w-44">
                        <item.icon className='w-5 text-primary-400' strokeWidth={2} />
                        <span className="text-darkBlue text-sm font-medium">{item.label}</span>
                      </div>
                      <span className="text-darkBlue/70 text-sm">{item.state}</span>
                    </div>
                  )
                })
              }
              <div className="px-6 py-6">
                <div className="flex gap-3 w-44">
                  <span className="text-darkBlue font-medium">Short Bio</span>
                </div>
                <span className="text-darkBlue/70 text-left text-sm">{state.description}</span>
              </div>
            </div>
            <div className="relative z-0 flex flex-1 overflow-hidden">
              <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-darkBlue/90">Medical History</h3>
                  <Link to='medical-history/create' onClick={toggleShowAdd}>
                    <PlusCircleIcon className="w-10 text-secondary-600" />
                  </Link>
                </div>
                {/* Breadcrumb */}
                {isFetching ? (
                  <div className="h-[30rem] flex justify-center items-center">
                    <MoonLoader
                      color="#22C55E"
                      loading={isFetching}
                      size={50}
                      aria-label="loading spinner"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col">
                      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <Table columns={columns} data={data?.data} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Pagination hasMore={true} total={data?.data?.length} />
                  </>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<TopLoader />}>
        <div className="flex justify-center ml-10">
          <CreateMedicalHistory show={showAdd} setShow={setShowAdd} refetch={refetch} patientID={state?._id} />
        </div>
      </Suspense>
    </>
  );
}
