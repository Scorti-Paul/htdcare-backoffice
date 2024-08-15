import React from 'react'

const StepperControl = ({
  handleClick,
  handleSubmission,
  currentStep,
  steps,
}: any) => {
  return (
    <>
      <div className="bg-gray-50 p-4 md:flex md:justify-end mt-5">
        <div className="grid gap-3 md:w-1/2 md:grid-cols-2">
          <div>
            <button
              onClick={(e: any) => handleClick(e)}
              className={`inline-flex w-full justify-center rounded-md  bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:mt-0 sm:text-sm ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex gap-2 items-center justify-center">
                <span>Previous</span>
              </div>
            </button>
          </div>
          <button
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onClick={(e: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              if (currentStep === 5) handleSubmission(e)
              else handleClick(e, 'continue')
            }}
            className={`inline-flex w-full justify-center font-bold rounded-md border-0 border-transparent bg-green-500 px-4 py-2 text-base text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm`}
          >
            <div className="flex gap-2 items-center justify-center">
              <span>
                {currentStep === steps.length - 1 ? `Confirm` : `Continue`}
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export default StepperControl
