import { FC, useCallback, useEffect } from 'react'
import { EyeIcon } from '@heroicons/react/24/solid'
import Button from '../../../../components/buttons/Button'
import Input from '../../../../components/Input'
import Header from '../../../../components/Header'
import DoubleButton from '../../../../components/buttons/doubleButton'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { updateVendor } from '../../../../api/mutations/vendors'
import { toast } from 'react-toastify'

const UpdateEducationalContent: FC<{}> = () => {
  const [vendorData, setVendorData] = useState<any>('')
  const [showPassword, setShowPassword] = useState(true)

  const { state } = useLocation()
  const navigate = useNavigate()

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e: any) => {
    setVendorData({
      ...vendorData,
      [e.target.name]: e.target.value,
    })
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updateVendor({ ...body, id: state?._id })
    },
    onError: (e) => {
      toast?.error('There was an error updating')
    },
    onSuccess: () => {
      toast?.success('Vendor updated successfully')
      navigate('/vendors')
    },
  })

  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault()

      if (vendorData.name === undefined) {
        return toast?.error("Company name can't be empty")
      }

      if (vendorData.type === undefined) {
        return toast?.error('Select vendor type')
      }

      if (vendorData.email === undefined) {
        return toast?.error("Email can't be empty")
      }

      if (vendorData.phone === undefined) {
        return toast?.error("Phone number can't be empty")
      }

      if (vendorData.address === undefined) {
        return toast?.error("Address can't be empty")
      }

      if (vendorData.location === undefined) {
        return toast?.error("Location can't be empty")
      }

      if (vendorData.digitalAddress === undefined) {
        return toast?.error("Digital address can't be empty")
      }

      if (vendorData.password === undefined) {
        return toast?.error("Password can't be empty")
      }

      if (vendorData.confirmPassword === undefined) {
        return toast?.error("Confirm password can't be empty")
      }

      if (
        vendorData.email.split('').filter((x: any) => x === '@').length !==
          -1 &&
        vendorData.email.indexOf('.') === -1
      ) {
        return toast?.error('Email is invalid')
      }

      if (vendorData.password !== vendorData.confirmPassword) {
        return toast?.error('password and confirm password are not the same')
      }

      mutateAsync({
        ...vendorData,
      })
    },
    [vendorData, mutateAsync],
  )

  const venderTypeOptions = [
    { value: 'Service', text: 'Service' },
    { value: 'Product', text: 'Product' },
  ]

  const initialCheck = useCallback(() => {
    if (state) {
      setVendorData({
        name: state?.name,
        type: state?.type,
        email: state?.email,
        phone: state?.phone,
        alternativePhoneNumber: state?.alternativePhoneNumber,
        address: state?.address,
        location: state?.location,
        dateOfReg: state?.dateOfReg,
        digitalAddress: state?.digitalAddress,
        password: state?.password,
      })
    }
  }, [state])

  useEffect(() => {
    initialCheck()
  }, [initialCheck])

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Update Vendors"
            description="Fill out the details to sign up a new vendor."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={'Vendors'}
              type={'link'}
              path={'/vendors'}
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
                        value={vendorData['name'] || ''}
                        onChange={handleChange}
                        type="text"
                        field="input"
                        optionalLabel={true}
                        hasShowPassword="disable"
                        autoComplete="true"
                      />
                      <Input
                        label="Vendor Type"
                        name="type"
                        inputLength="small"
                        placeholder=""
                        value={vendorData['type'] || ''}
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
                        value={vendorData['email'] || ''}
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
                        value={vendorData['phone'] || ''}
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
                        value={vendorData['alternativePhoneNumber'] || ''}
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
                        value={vendorData['address'] || ''}
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
                        value={vendorData['location'] || ''}
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
                        value={vendorData['dateOfReg'] || ''}
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
                        value={vendorData['digitalAddress'] || ''}
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
                        value={vendorData['numberOfOutlets'] || ''}
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
                        value={vendorData['outlets']}
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
                        value={vendorData['password'] || ''}
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
                        value={vendorData['confirmPassword'] || ''}
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
                    buttonText="Update vendor"
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

export default UpdateEducationalContent
