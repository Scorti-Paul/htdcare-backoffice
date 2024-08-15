import { FC, useCallback, useEffect } from 'react'
import { EyeIcon } from '@heroicons/react/24/solid'
import Button from 'components/buttons/Button'
import Input from 'components/Input'
import Header from 'components/Header'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { updateUser } from 'api/mutations/users'
import { toast } from 'react-toastify'
import UploadImage from 'components/uploadimage'
import useUploadImage from 'components/hooks/useUploadImage'
import DoubleButton from 'components/buttons/doubleButton'
// import { useCookies } from 'react-cookie'

const Settings: FC<{}> = () => {
  const [userData, setUserData] = useState<any>('')
  const { state } = useLocation()
  const [showPassword, setShowPassword] = useState(true)
  const [image, setImage] = useState<any>(null)
  const [tempUrl, setTempUrl] = useState<string>('')
  const [radioCheck, setRadioCheck] = useState(false)
  // const [{ user }] = useCookies(["user"])

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate()

  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }
  const { uploadImage, loading } = useUploadImage()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updateUser({ ...body, id: state?._id })
    },
    onError: (e) => {
      toast?.error('There was an error')
    },
    onSuccess: () => {
      toast?.success('Account password updated successfully')
      navigate('/')
    },
  })

  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault()

      uploadImage(image)
        ?.then((link: string) => {
          mutateAsync({
            ...userData,
            image: link,
          })
        })
        ?.catch((e) => {
          toast?.warning(e?.message)
        })
    },
    [userData, mutateAsync, image, uploadImage],
  )

  const createTemp = useCallback(() => {
    if (image) {
      const temp = URL.createObjectURL(image)
      setTempUrl(temp)
    }
  }, [image])

  useEffect(() => {
    createTemp()
  }, [createTemp])

  const initialCheck = useCallback(() => {
    if (state) {
      setTempUrl(state?.image)
      setUserData({
        firstName: state?.name.split(" ")[0],
        lastName: state?.name.split(" ")[1],
        email: state?.email,
        phone: state?.phone,
        role: state?.role,
        image: state?.image,
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
          <Header title="Settings" description="Change your account details.">
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={'Profile'}
              type={'link'}
              path={'/users/user/profile'}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>

          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6 sm:block md:flex md:justify-between md:gap-4">
                    <div className="md:w-5/12">
                      <UploadImage tempUrl={tempUrl} />

                      <Input
                        label=""
                        name="image"
                        inputLength="large"
                        onChange={(e) => {
                          setImage(e?.target?.files[0])
                        }}
                        type="file"
                        field="upload"
                        optionalLabel={true}
                      />
                    </div>
                    <div className="w-full grid grid-cols-6 gap-6">
                      <Input
                        label="First name"
                        name="firstName"
                        inputLength="large"
                        placeholder="eg. John Doe"
                        value={userData['firstName'] || ''}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Last name"
                        name="lastName"
                        inputLength="large"
                        placeholder="eg. John Doe"
                        value={userData['lastName'] || ''}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />

                      <Input
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={userData['email'] || ''}
                        inputLength="large"
                        placeholder="you@example.com"
                        hasShowPassword="disable"
                        type="email"
                        field="input"
                        autoComplete="true"
                        optionalLabel={true}
                      />

                      <Input
                        label="Phone number"
                        name="phone"
                        onChange={handleChange}
                        value={userData['phone'] || ''}
                        inputLength="large"
                        placeholder="eg. xxx xxx xxxx"
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                        optionalLabel={true}
                      />

                      <div className="col-span-6">
                        <button
                          onClick={() => setRadioCheck(!radioCheck)}
                          className="inline-flex items-center gap-2 rounded-md border-transparent border border-green-300
              py-2 px-4 text-sm  text-green-700 font-medium shadow-sm hover:bg-green-500 focus:outline-none sm:w-auto hover:text-gray-100
                   h-10  transition-colors duration-150 "
                        >
                          <div className="flex gap-2 items-center justify-center">
                            <span>Change password</span>
                          </div>
                        </button>
                      </div>

                      {radioCheck && (
                        <>
                          <Input
                            label="Old password"
                            name="oldPassword"
                            inputLength="small"
                            placeholder="*************"
                            value={userData['oldPassword'] || ''}
                            onChange={handleChange}
                            type="text"
                            field="input"
                            optionalLabel={true}
                            hasShowPassword={showPassword}
                            handleShowHidePassword={handleShowHidePassword}
                            autoComplete="true"
                          />

                          <Input
                            label="Password"
                            name="password"
                            inputLength="small"
                            placeholder="*************"
                            value={userData['password'] || ''}
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
                            inputLength="small"
                            placeholder="*************"
                            value={userData['confirmPassword'] || ''}
                            onChange={handleChange}
                            type="text"
                            field="input"
                            hasShowPassword={showPassword}
                            handleShowHidePassword={handleShowHidePassword}
                            optionalLabel={true}
                            autoComplete="true"
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <DoubleButton
                    loading={isLoading || loading}
                    buttonText="Update user"
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

export default Settings
