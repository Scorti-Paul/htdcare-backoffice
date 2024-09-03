import { FC, useCallback, useEffect } from 'react'
import { EyeIcon } from '@heroicons/react/24/solid'
import Button from '../../../../components/buttons/Button'
import Input from '../../../../components/Input'
import Header from '../../../../components/Header'
import DoubleButton from '../../../../components/buttons/doubleButton'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { updateAppointment } from '../../../../api/mutations/appointment'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { get } from 'api'


const UpdateAppointment: FC<{}> = () => {
  const [appointmentData, setAppointmentData] = useState<any>('')
  const [, setSearchString] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string[]>([]);
  const [selectedDentist, setSelectedDentist] = useState<string[]>([]);
  const { state } = useLocation()
  const navigate = useNavigate()

  
  const initialCheck = useCallback(() => {
    if (state) {
      setAppointmentData({
        id: state._id,
        patient: state?.patient?.user._id,
        dentist: state?.patient?.user._id,
        service: state?._id,
        date: state?.date,
        reason: state?.reason,
        status: state?.status
      })
    }
  }, [state])

  useEffect(() => {
    initialCheck()
  }, [initialCheck])

  
  console.log(selectedPatient)
  console.log(appointmentData)


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

  const handleChange = (e: any) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    })
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updateAppointment({ ...body, id: state?._id })
    },
    onError: (e) => {
      toast?.error('There was an error updating')
    },
    onSuccess: () => {
      toast?.success('Appointment updated successfully')
      navigate('/appointments')
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
console.log("SP: ", selectedPatient)
      mutateAsync({
        id: appointmentData.id,
        patient: selectedPatient,
        dentist: selectedDentist,
        service: selectedService,
        date: appointmentData.date,
        status: appointmentData.status,
        reason: appointmentData.reason
      })

    },
    [appointmentData, mutateAsync, selectedDentist, selectedPatient, selectedService],
  )

  // console.log(appointmentData.reason)

  const statusOptions = [
    { text: 'Select status', value: '' },
    { text: 'Schedule', value: 'Schedule' },
    { text: 'Approval', value: 'Approval' },
    { text: 'Completed', value: 'Completed' },
    { text: 'Cancelled', value: 'Cancelled' },
  ]

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Update Appointments"
            description="Fill out the details to sign up a new appointment."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={'Appointments'}
              type={'secondary-link'}
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
                        <label htmlFor="patient" className="block text-sm font-medium text-gray-700 mb-1.5">
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
                              value: item?._id,
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
                              value: item?._id,
                              label: item?.user.fullName,
                            };
                          })}
                        />
                      </div>

                      <div className='col-span-2 mt-1'>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">
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
                              value: item?._id,
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
                        inputLength="medium"
                        type="date"
                        field="input"
                        optionalLabel={false}
                        autoComplete="true"
                      />

                      <Input
                        label="Status"
                        name="status"
                        value={appointmentData["status"] || ""}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        required
                        inputLength="medium"
                        type="select"
                        field="select"
                        optionalLabel={false}
                        selectOptions={statusOptions}
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
                        value={appointmentData.reason}
                        hasShowPassword="disable"
                        optionalLabel={false}
                        autoComplete="true"
                      />
                    </div>
                  </div>
                  <DoubleButton
                    loading={isLoading}
                    buttonText="Update appointment"
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

export default UpdateAppointment
