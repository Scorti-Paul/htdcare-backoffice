import { FC, useCallback } from 'react'
import { EyeIcon } from '@heroicons/react/24/solid'
import Button from '../../../../components/buttons/Button'
import Input from '../../../../components/Input'
import Header from '../../../../components/Header'
import DoubleButton from '../../../../components/buttons/doubleButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMutation } from 'react-query'
import { scheduleAppointment } from '../../../../api/mutations/appointment'
import { toast } from 'react-toastify'

const CreateAppointment: FC<{}> = () => {
  const [appointmentData, setAppointmentData] = useState<any>('')
  const [showPassword, setShowPassword] = useState(true)

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword)
  }

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

      if (appointmentData.name === undefined) {
        return toast?.error("Company name can't be empty")
      }

      if (appointmentData.type === undefined) {
        return toast?.error('Select appointment type')
      }

      if (appointmentData.email === undefined) {
        return toast?.error("Email can't be empty")
      }

      if (appointmentData.phone === undefined) {
        return toast?.error("Phone number can't be empty")
      }

      if (appointmentData.address === undefined) {
        return toast?.error("Address can't be empty")
      }

      if (appointmentData.location === undefined) {
        return toast?.error("Location can't be empty")
      }

      if (appointmentData.digitalAddress === undefined) {
        return toast?.error("Digital address can't be empty")
      }

      if (appointmentData.password === undefined) {
        return toast?.error("Password can't be empty")
      }

      if (appointmentData.confirmPassword === undefined) {
        return toast?.error("Confirm password can't be empty")
      }

      if (
        appointmentData.email.split('').filter((x: any) => x === '@').length !==
          -1 &&
        appointmentData.email.indexOf('.') === -1
      ) {
        return toast?.error('Email is invalid')
      }

      if (appointmentData.password !== appointmentData.confirmPassword) {
        return toast?.error('password and confirm password are not the same')
      }

      mutateAsync({
        ...appointmentData,
      })

      navigate('/appointments')
    },
    [appointmentData, mutateAsync, navigate],
  )

  const venderTypeOptions = [
    { value: 'Service', label: 'Service' },
    { value: 'Product', label: 'Product' },
  ]

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Create Appointments"
            description="Fill out the details to sign up a new appointment."
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
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <Input
                        label="Company name"
                        name="name"
                        inputLength="small"
                        placeholder="eg. Farmercom LTD"
                        value={appointmentData['name'] || ''}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        optionalLabel={true}
                        hasShowPassword="disable"
                        autoComplete="true"
                      />
                      <Input
                        label="Appointment Type"
                        name="type"
                        inputLength="small"
                        placeholder=""
                        value={appointmentData['type'] || ''}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        selectOptions={venderTypeOptions}
                        optionalLabel={true}
                        type="select"
                        field="select"
                      />

                      <Input
                        label="Email address"
                        optionalLabel={true}
                        name="email"
                        inputLength="small"
                        placeholder="you@example.com"
                        value={appointmentData['email'] || ''}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        type="email"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Phone number"
                        name="phone"
                        inputLength="medium"
                        placeholder="(+233) xx xxx xxxx"
                        value={appointmentData['phone'] || ''}
                        onChange={handleChange}
                        type="tel"
                        hasShowPassword="disable"
                        optionalLabel={true}
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Other Phone number"
                        name="alternativePhoneNumber"
                        inputLength="medium"
                        placeholder="(+233) xx xxx xxxx"
                        value={appointmentData['alternativePhoneNumber'] || ''}
                        onChange={handleChange}
                        type="tel"
                        hasShowPassword="disable"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Registered address"
                        name="address"
                        inputLength="medium"
                        placeholder=""
                        value={appointmentData['address'] || ''}
                        onChange={handleChange}
                        hasShowPassword="disable"
                        type="text"
                        optionalLabel={true}
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Registered location"
                        name="location"
                        inputLength="medium"
                        placeholder=""
                        value={appointmentData['location'] || ''}
                        onChange={handleChange}
                        type="text"
                        hasShowPassword="disable"
                        optionalLabel={true}
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Registered Date"
                        name="dateOfReg"
                        inputLength="medium"
                        placeholder=""
                        value={appointmentData['dateOfReg'] || ''}
                        onChange={handleChange}
                        type="date"
                        hasShowPassword="disable"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Digital address / Land mark"
                        name="digitalAddress"
                        inputLength="medium"
                        placeholder="GA-543-0125"
                        value={appointmentData['digitalAddress'] || ''}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        hasShowPassword="disable"
                        optionalLabel={true}
                        autoComplete="true"
                      />

                      {/* <Input
                        label="Number of outlets"
                        name="numberOfOutlets"
                        inputLength="small"
                        value={appointmentData['numberOfOutlets'] || ''}
                        onChange={handleChange}
                        placeholder=""
                        type="number"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Name of outlets (Separated by a comma)"
                        name="outlets"
                        inputLength="large"
                        placeholder="Akim Oda/ Kusi, ..."
                        onChange={handleChange}
                        value={appointmentData['outlets']}
                        type="text"
                        field="textarea"
                        autoComplete="true"
                        optionalLabel={false}
                      /> */}

                      <Input
                        label="Password"
                        name="password"
                        inputLength="medium"
                        placeholder="*************"
                        value={appointmentData['password'] || ''}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        optionalLabel={true}
                        hasShowPassword={showPassword}
                        handleShowHidePassword={handleShowHidePassword}
                        autoComplete="true"
                      />

                      <Input
                        label="Confirm password"
                        name="confirmPassword"
                        inputLength="medium"
                        placeholder="*************"
                        value={appointmentData['confirmPassword'] || ''}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        hasShowPassword={showPassword}
                        handleShowHidePassword={handleShowHidePassword}
                        optionalLabel={true}
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
