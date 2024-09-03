import { FC, useCallback } from 'react'
import { EyeIcon } from '@heroicons/react/24/solid'
import Button from '../../../../components/buttons/Button'
import Input from '../../../../components/Input'
import Header from '../../../../components/Header'
import DoubleButton from '../../../../components/buttons/doubleButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { useMutation, useQuery } from 'react-query'
import { scheduleAppointment } from '../../../../api/mutations/appointment'
import { toast } from 'react-toastify'
import { get } from 'api'

const CreateAppointment: FC<{}> = () => {
  const [appointmentData, setAppointmentData] = useState<any>('')
  const [, setSearchString] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string[]>([]);
  const [selectedDentist, setSelectedDentist] = useState<string[]>([]);


  const { data: serviceData, isFetching: isFetchingService } = useQuery(
    ["services"],
    () => get("/services")
  );

  const { data: patientData, isFetching: isFetchingPatient } = useQuery(
    ["patients"],
    () => get("/patients", { params: { populate: ["user"] } })
  );

  const { data: dentistData, isFetching: isFetchingDentist } = useQuery(
    ["dentists"],
    () => get("/dentists", { params: { populate: ["user"] } })
  );

  const navigate = useNavigate()

  const handleChange = (e: any) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    })
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return scheduleAppointment(body)
    },
    onError: (e) => {
      toast?.error('There was an error registering')
    },
    onSuccess: () => {
      toast?.success('Appointment created successfully')
    },
  })

  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault()

      if (Object.keys(selectedPatient).length === 0) {
        return toast?.error("Select patient you want to book");
      }

      if (Object.keys(selectedService).length === 0) {
        return toast?.error("Select service you want to book");
      }

      if (Object.keys(selectedDentist).length === 0) {
        return toast?.error("Select dentist you want to book");
      }

      if (appointmentData.date === undefined) {
        return toast?.error("Choose appointment date");
      }

      if (appointmentData.reason === undefined) {
        return toast?.error("Write brief reason for your appointment");
      }

      mutateAsync({
        patient: selectedPatient,
        dentist: selectedDentist,
        service: selectedService,
        ...appointmentData,
        status: "Schedule"
      })

      navigate('/appointments')
    },
    [appointmentData, mutateAsync, navigate, selectedPatient, selectedDentist, selectedService],
  )

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Create Appointments"
            description="Fill out the details to create new appointment."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={'Appointments'}
              type={'link'}
              path={'/appointments'}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>

          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden">
                  <div className="py-5 px-1">
                    <div className="grid grid-cols-6 gap-6">
                      <div className='col-span-2 mt-1'>
                        <label htmlFor="dentist" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Patient
                        </label>
                        <Select
                          onInputChange={(e) => setSearchString(e)}
                          className="basic-single"
                          classNamePrefix="select"
                          isLoading={isFetchingPatient}
                          isClearable={true}
                          isSearchable={true}
                          onChange={(e: any) => setSelectedPatient(e?.value)}
                          isMulti={false}
                          name="patient"
                          options={patientData?.data?.map((item: any) => {
                            return {
                              value: item._id,
                              label: item?.user.fullName,
                            };
                          })}
                        />
                      </div>

                      <div className='col-span-2 mt-1'>
                        <label htmlFor="dentist" className="block text-sm font-medium text-gray-700 mb-1.5">
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
                          name="dentist"
                          options={dentistData?.data?.map((item: any) => {
                            return {
                              value: item._id,
                              label: item?.user.fullName,
                            };
                          })}
                        />
                      </div>

                      <div className='col-span-2 mt-1'>
                        <label htmlFor="dentist" className="block text-sm font-medium text-gray-700 mb-1.5">
                          What service do you want to book?
                        </label>
                        <Select
                          onInputChange={(e) => setSearchString(e)}
                          className="basic-single"
                          classNamePrefix="select"
                          isLoading={isFetchingService}
                          isClearable={true}
                          isSearchable={true}
                          onChange={(e: any) => setSelectedService(e?.value)}
                          isMulti={false}
                          name="service"
                          options={serviceData?.data?.map((item: any) => {
                            return {
                              value: item._id,
                              label: item?.name,
                            };
                          })}
                        />
                      </div>

                      <Input
                        label="Choose date for the appointment"
                        name="date"
                        value={appointmentData["date"] || ""}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        required
                        inputLength="large"
                        type="date"
                        field="input"
                        optionalLabel={false}
                        // placeholder="Doe"
                        autoComplete="true"
                      />

                      <Input
                        label="Reason for the appointment"
                        type="text"
                        field="textarea"
                        onChange={handleChange}
                        inputLength="large"
                        placeholder="Brief description about the reason for the visit."
                        name="reason"
                        hasShowPassword="disable"
                        optionalLabel={false}
                        autoComplete="true"
                      />
                    </div>
                  </div>

                  <DoubleButton
                    loading={isLoading}
                    buttonText="Save appointment"
                    onClick={handleSubmission}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateAppointment
