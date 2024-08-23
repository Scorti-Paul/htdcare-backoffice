import { FC, useCallback, useEffect } from 'react'
import { EyeIcon } from '@heroicons/react/24/solid'
import Button from '../../../../components/buttons/Button'
import Input from '../../../../components/Input'
import Header from '../../../../components/Header'
import product from './../../../../assets/images/product.png'
import { useState } from 'react'
import DoubleButton from '../../../../components/buttons/doubleButton'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { createPatient } from '../../../../api/mutations/patients'
import { toast } from 'react-toastify'
import { get } from '../../../../api'
import useUploadImage from '../../../../components/hooks/useUploadImage'

const CreateOrder: FC<{}> = () => {
  const [productData, setProductData] = useState<any>('')
  const [image, setImage] = useState<any>(null)
  const [tempUrl, setTempUrl] = useState<string>('')

  const navigate = useNavigate()
  const { uploadImage, loading } = useUploadImage()

  const handleChange = useCallback(
    (e: any) => {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      })
    },
    [productData],
  )

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return createPatient(body)
    },
    onError: (e) => {
      toast?.error('There was an error')
    },
    onSuccess: () => {
      toast?.success('Product created successfully')
      navigate('/products')
    },
  })

  const handleSubmission = useCallback(
    async (e: any) => {
      //
      e?.preventDefault()

      uploadImage(image)
        ?.then((link: string) => {
          mutateAsync({
            ...productData,
            image: link,
          })
        })
        ?.catch((e) => {
          toast?.warning(e?.message)
        })
    },
    [productData, mutateAsync, image, uploadImage],
  )

  const { data, isFetching } = useQuery(['allVendors'], () => get('/vendors'))

  const createTemp = useCallback(() => {
    if (image) {
      const temp = URL.createObjectURL(image)
      setTempUrl(temp)
    }
  }, [image])

  useEffect(() => {
    createTemp()
  }, [createTemp])

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Create Products"
            description="Fill out the details to sign up a new product."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={'Products'}
              type={'link'}
              path={'/products'}
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
                      <div className="">
                        <img
                          className="border rounded-md p-4"
                          src={tempUrl || product}
                          alt=""
                        />
                      </div>
                      <Input
                        label=""
                        name="productImage"
                        inputLength="medium"
                        // value={productData["productImage"] || ""}
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
                        label="Product name"
                        name="name"
                        inputLength="medium"
                        placeholder="eg. Spraying machine"
                        value={productData['name'] || ''}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />

                      <div className={'col-span-6 sm:col-span-3'}>
                        <label
                          htmlFor="vendor"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Vendor
                        </label>
                        <select
                          name="vendor"
                          onChange={handleChange}
                          value={productData['vendor'] || ''}
                          className={
                            'mt-1 block w-full rounded-md text-gray-400 border-gray-300 shadow-sm resize-none placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm'
                          }
                        >
                          <option>Select Vendor</option>
                          {isFetching ? (
                            <option>Loading...</option>
                          ) : (
                            data?.data?.map((ven: any) => (
                              <option key={ven?._id} value={ven?._id}>
                                {ven?.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      <Input
                        label="Quantity"
                        name="stock"
                        onChange={handleChange}
                        value={productData['stock'] || ''}
                        inputLength="medium"
                        placeholder="please enter number of products available"
                        hasShowPassword="disable"
                        type="number"
                        field="input"
                        autoComplete="true"
                        optionalLabel={true}
                      />

                      <Input
                        label="Measuring unit"
                        name="measuringUnit"
                        onChange={handleChange}
                        value={productData['measuringUnit'] || ''}
                        inputLength="medium"
                        placeholder="eg. 340kg"
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                        optionalLabel={true}
                      />
                      <Input
                        label="Cost price"
                        name="costPrice"
                        inputLength="medium"
                        placeholder="GHC"
                        value={productData['costPrice'] || ''}
                        onChange={handleChange}
                        type="number"
                        field="input"
                        hasShowPassword="disable"
                        optionalLabel={true}
                      />

                      <Input
                        label="Seller's price"
                        name="sellersPrice"
                        inputLength="medium"
                        placeholder="GHC "
                        onChange={handleChange}
                        value={productData['sellersPrice'] || ''}
                        hasShowPassword="disable"
                        type="number"
                        field="input"
                        autoComplete="true"
                        optionalLabel={true}
                      />

                      <Input
                        label="Other specifications"
                        name="specifications"
                        inputLength="large"
                        placeholder="list other specifications... "
                        type="text"
                        value={productData['specifications'] || ''}
                        onChange={handleChange}
                        field="input"
                        hasShowPassword="disable"
                        autoComplete="true"
                      />

                      <Input
                        label="Description"
                        name="description"
                        inputLength="large"
                        placeholder="extra info about the product goes here "
                        value={productData['description'] || ''}
                        onChange={handleChange}
                        type=""
                        field="textarea"
                        autoComplete="true"
                      />
                    </div>
                  </div>
                  <DoubleButton
                    loading={isLoading || loading}
                    buttonText="Save product"
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

export default CreateOrder
