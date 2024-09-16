import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../../../components/Modal";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonLoader from "components/loaders/buttonloader";
import { createMedicalHistory } from "api/mutations/medicalHistory";
import Select from 'react-select'
import { useQuery } from "react-query";
import { get } from "api";

type Inputs = {
  allergies: string;
  diagnosis: string;
  clinicalFindings: string;
};

export default function CreateMedicalHistory({
  selected,
  show,
  setShow,
  refetch,
  patientID
}: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);
  const [, setSearchString] = useState<string>("");
  const [selectedDentist, setSelectedDentist] = useState<string[]>([]);

  const { data: dentistData, isFetching: isFetchingDentist } = useQuery(
    ["dentists"],
    () => get("/dentists", { params: { populate: ['user'] } })
  );


  const invokeCreateMedicalHistory: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    createMedicalHistory({ dentist: selectedDentist,  patient: patientID, ...data })
      ?.then((response) => {
        console.log(response);
        setLoading(false);
        setShow(false);
        refetch();
        reset();
        toast?.success(response?.data?.message);
      })
      ?.catch((response) => {
        toast?.error(response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <Modal
      show={show}
      setShow={setShow}
      modalTitle="New Medical History"
      modalDesc="Add new medical history patient profile"
      size={2}
    >
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col ">
          <div className="relative z-0 flex flex-1 ">
            <form
              onSubmit={handleSubmit(invokeCreateMedicalHistory)}
              className="relative w-full lg:w-[30vw] z-0 flex-1  focus:outline-none xl:order-last"
            >
              {/* Breadcrumb */}
              <div className="mt-1">
                <label htmlFor="dentist" className="block text-sm font-medium text-gray-700">
                  Dentist
                </label>
                <Select
                  onInputChange={(e) => setSearchString(e)}
                  className="basic-single"
                  classNamePrefix="select"
                  isLoading={isFetchingDentist}
                  isClearable={true}
                  isSearchable={true}
                  onChange={(e: any) => setSelectedDentist(e?.value)}
                  isMulti={false}
                  name="dentists"
                  options={dentistData?.data?.map((item: any) => {
                    return {
                      value: item._id,
                      label: item?.user?.fullName,
                    };
                  })}
                />
              </div>

              <div className="mt-3">
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                  Allergies
                </label>
                <input
                  id="allergies"
                  {...register("allergies")}
                  placeholder="Enter patient allergies"
                  className={` ${errors?.allergies
                    ? "focus:border-rose-500 focus:ring-rose-500"
                    : "focus:border-green-500 focus:ring-green-500"
                    } mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm py-3 placeholder:text-gray-400  sm:text-sm`}
                  type="text"
                />
                {errors?.allergies && (
                  <span
                    data-testid={"nameError"}
                    className="ml-1 bg-transparent text-xs font-medium text-red-500 "
                  >
                    Category name is required
                  </span>
                )}
              </div>

              <div className="mt-3">
                <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
                  Diagnosis
                </label>
                <input
                  id="diagnosis"
                  {...register("diagnosis", { required: true })}
                  placeholder="Eg. Vegetables"
                  className={` ${errors?.diagnosis
                    ? "focus:border-rose-500 focus:ring-rose-500"
                    : "focus:border-green-500 focus:ring-green-500"
                    } mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm py-3 placeholder:text-gray-400  sm:text-sm`}
                  type="text"
                />
                {errors?.diagnosis && (
                  <span
                    data-testid={"nameError"}
                    className="ml-1 bg-transparent text-xs font-medium text-red-500 "
                  >
                    Diagnosis is required
                  </span>
                )}
              </div>

              <div className="mt-3">
                <label htmlFor="clinicalFindings" className="block text-sm font-medium text-gray-700">
                  Clinical Findings
                </label>
                <textarea
                  {...register("clinicalFindings")}
                  id="clinicalFindings"
                  className={`focus:border-green-500 focus:ring-green-500
                  mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm py-3 placeholder:text-gray-400  sm:text-sm`}></textarea>
              </div>

              <div className=" pt-4 flex flex-row-reverse mt-2">
                <button
                  type="submit"
                  className="text-white flex items-center gap-2 bg-green-600 px-4 py-3 rounded-lg"
                >
                  <span>Submit</span>
                  {loading ? (
                    <ButtonLoader />
                  ) : (
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
