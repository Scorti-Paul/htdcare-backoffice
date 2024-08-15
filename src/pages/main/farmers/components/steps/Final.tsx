import { useState } from 'react'
import Button from '../../../../../components/buttons/Button'
import Modal from '../../../../../components/Modal'

const Final = () => {
  const [showView, setShowView] = useState(true)
  const modalDesc = ''
  const modalTitle = ''
  return (
    <Modal
      show={showView}
      setShow={setShowView}
      modalDesc={modalDesc}
      modalTitle={modalTitle}
    >
      <div className="container md:mt-24">
        <div className="flex flex-col items-center">
          <div className="text-green-400 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="mt-3 text-xl font-semibold uppercase text-green-500">
            Congratulations!
          </div>
          <div className="text-lg font-semibold text-gray-500 mb-12">
            New farmer has been created.
          </div>
          <div className="md:mb-24">
            <Button
              path="/farmers"
              text="Close"
              type="link"
              onClick={() => null}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Final
