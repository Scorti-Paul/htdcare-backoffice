import { FC, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Button from "components/buttons/Button";
import Table from "components/Table";
import { Column } from "components/Table/types";
import Header from "components/Header";
import usePagination from "components/hooks/usePagination";
import { useQuery } from "react-query";
import { get } from "api";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Patients: FC<{}> = () => {
  const [, setSelected] = useState<any>({});
  const navigate = useNavigate();

  const columns: Column[] = [
    {
      headerText: "Patient Code",
      keys: { type: "text", value: ["patientCode"] },
      type: "text",
    },
    {
      headerText: "Name | Phone",
      keys: { type: "text", value: ["user.fullName", "phone"] },
      type: "text",
    },
    {
      headerText: "Email | Address",
      keys: { type: "text", value: ["email", "location.address"] },
      type: "text",
    },
    {
      headerText: "Gender",
      keys: { type: "text", value: ["gender"] },
      type: "text",
    },
    {
      headerText: "Created On",
      type: "date",
      keys: { type: "date", value: ["createdAt"] },
      format: "MMM DD, YYYY",
    },
    {
      type: "action",
      headerText: "Actions",
      actions: [
        {
          name: "view",
          onClick: (e, dataFromTable) => {
            e?.preventDefault();
            navigate("patient", { state: dataFromTable })
            return null;
          },
        },
        {
          name: "edit",
          onClick: (e, dataFromTable) => {
            e?.preventDefault();
            setSelected(dataFromTable);
            navigate("update-product", { state: dataFromTable });
          },
        },
        {
          name: "suspend",
          onClick: (e, dataFromTable) => {
            e?.preventDefault();
            return null;
          },
        },
      ],
    },
  ];

  const { Pagination, page, limit } = usePagination(1, 10);

  const { data, isFetching } = useQuery(["patientsList", page], () =>
    get("/patients", {
      params: { page, limit, populate: ["user"] },
    })
  );

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Patients"
            description="A list of all the patients."
          >
            <Button
              Icon={<PlusCircleIcon className="w-6" />}
              text={"New Patient"}
              type={"primary-link"}
              path={"create-patient"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>
          {isFetching ? (
            <div className="h-[30rem] flex justify-center items-center">
              <MoonLoader
                color="#22C55E"
                loading={isFetching}
                size={50}
                aria-label="loading spinner"
              />
            </div>
          ) : (
            <>
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <Table columns={columns} data={data?.data} />
                    </div>
                  </div>
                </div>
              </div>
              <Pagination hasMore={true} total={data?.data?.length} />
            </>
          )}
        </div>
      </div>
      {/* View single product */}
      <>
        {/* <Modal show={showView} setShow={setShowView}>
          <ViewPatient selected={selected} />
        </Modal> */}
      </>
    </>
  );
};

export default Patients;
