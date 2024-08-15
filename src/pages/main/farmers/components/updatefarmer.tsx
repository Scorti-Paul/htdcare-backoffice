import { FC, useCallback, useEffect } from 'react'
import { EyeIcon } from '@heroicons/react/24/solid'
import Button from 'components/buttons/Button'
import Header from 'components/Header'
import { useState } from 'react'
import StepperControl from 'components/Stepper/StepperControl'
import Stepper from 'components/Stepper/Stepper'

import FarmerAccountDetails from './steps/FarmerAccountDetails'
import FarmDetails from './steps/FarmDetails'
import FarmDetails2 from './steps/FarmDetails2'
import FarmDetails3 from './steps/FarmDetails3'
import Final from './steps/Final'

import { FarmerContext } from 'contexts/FarmerContext'
import PreviewDetails from './steps/PreviewDetails'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { updateFarmer } from 'api/mutations/farmers'
import { toast } from 'react-toastify'

const UpdateFarmer: FC<{}> = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [farmerData, setFarmerData] = useState<any>('')
  const [finalData, setFinalData] = useState()
  const { state } = useLocation()

  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (body: any) => {
      return updateFarmer({ ...body, id: state?._id })
    },
    onError: (e: any) => {
      toast?.error(`There was an ${e.message}`)
    },
    onSuccess: () => {
      toast?.success('Farmer updated successfully')
      navigate('/farmers')
    },
  })
  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault()

      mutateAsync({
        ...farmerData,
      })
    },
    [farmerData, mutateAsync],
  )

  // click on the button make asee

  const handleClick = (e: any, direction: any) => {
    e.preventDefault()

    let newStep = currentStep

    direction === 'continue' ? newStep++ : newStep--

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
  }

  const initialCheck = useCallback(() => {
    if (state) {
      setFarmerData({
        registeredName: state?.registeredName,
        firstName: state?.firstName,
        surname: state?.surname,
        gender: state?.gender,
        levelOfEducation: state?.levelOfEducation,
        dateOfBirth: state?.dateOfBirth,
        hometown: state?.hometown,
        placeOfBirth: state?.placeOfBirth,
        region: state?.region,
        maritalStatus: state?.maritalStatus,
        spouseName: state?.spouseName,
        spouseContact: state?.spouseContact,
        numberOfChildren: state?.numberOfChildren,
        residenceAddress: state?.residenceAddress,
        digitalAddress: state?.digitalAddress,
        phone: state?.phone,
        alternativePhoneNumber: state?.alternativePhoneNumber,
        email: state?.email,
        farmingType: state?.farmingType,
        landSize: state?.landSize,
        numberOfLivestocks: state?.numberOfLivestocks,
        country: state?.country,
        landRegion: state?.landRegion,
        nearestTown: state?.nearestTown,
        longitude: state?.longitude,
        latitude: state?.latitude,
        landStatus: state?.landStatus,
        amountPerYear: state?.amountPerYear,
        typeOfWorkers: state?.typeOfWorkers,
        numberOfWorkers: state?.numberOfWorkers,
        association: state?.association,
        farmAssociationType: state?.farmAssociationType,
        farmAssociationName: state?.farmAssociationName,
        farmerAssociationSupport: state?.farmerAssociationSupport,
        avgCostOfInput: state?.avgCostOfInput,
        numberOfHarvestPerYear: state?.numberOfHarvestPerYear,
        avgIncomePerHarvest: state?.avgIncomePerHarvest,
        farmRecords: state?.farmRecords,
        storageFacility: state?.storageFacility,
        buyers: state?.buyers,
        accessToExtensionOfficers: state?.accessToExtensionOfficers,
        training: state?.training,
        accessToMachinery: state?.accessToMachinery,
        machineryService: state?.machineryService,
        machineryServiceAmount: state?.machineryServiceAmount,
        otherIncomeSource: state?.otherIncomeSource,
        roadNetwork: state?.roadNetwork,
        transport: state?.transport,
        avgPriceOfWeedicides: state?.avgPriceOfWeedicides,
        avgPriceOfPesticides: state?.avgPriceOfPesticides,
        avgPriceOfFertilizer: state?.avgPriceOfFertilizer,
        distance: state?.distance,
        insureCrop: state?.insureCrop,
      })
    }
  }, [state])

  useEffect(() => {
    initialCheck()
  }, [initialCheck])

  //Steps
  const steps = [
    'Account Information',
    'Farm Details 1',
    'Farm Details 2',
    'Farm Details 3',
    'Preview',
    'Complete',
  ]

  const displayStep = (step: any) => {
    switch (step) {
      case 1:
        return <FarmerAccountDetails />
      case 2:
        return <FarmDetails />
      case 3:
        return <FarmDetails2 />
      case 4:
        return <FarmDetails3 />
      case 5:
        return <PreviewDetails />
      case 6:
        return <Final />
      default:
    }
  }

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Update Farmer"
            description="Fill out the details to update farmer."
          >
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={'Farmers'}
              type={'link'}
              path={'/farmers'}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>
          <div className="">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <FarmerContext.Provider
                    value={{
                      farmerData,
                      setFarmerData,
                      finalData,
                      setFinalData,
                    }}
                  >
                    {displayStep(currentStep)}
                  </FarmerContext.Provider>
                  {currentStep !== steps.length && (
                    <StepperControl
                      handleClick={handleClick}
                      currentStep={currentStep}
                      steps={steps}
                      handleSubmission={handleSubmission}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateFarmer
