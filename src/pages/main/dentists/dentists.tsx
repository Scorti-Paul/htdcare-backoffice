import { FC, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/buttons/Button";
import Table from "../../../components/Table";
import { Column } from "../../../components/Table/types";
import Modal from "../../../components/Modal";
import Header from "../../../components/Header";
import ViewDentist from "./components/view";
import usePagination from "../../../components/hooks/usePagination";
import { useQuery } from "react-query";
import { get } from "../../../api";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Dentists: FC<{}> = () => {
  const [showView, setShowView] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const navigate = useNavigate();

  const columns: Column[] = [
    {
      headerText: "Name",
      keys: { type: "text", value: ["user.fullName"] },
      type: "text",
    },
    {
      headerText: "Phone | Email",
      keys: { type: "text", value: ["user.phone", "user.email"] },
      type: "text",
    },
    {
      headerText: "Clinic | Clinic Address",
      keys: { type: "text", value: ["clinic.name", "clinic.address"] },
      type: "text",
    },
    {
      headerText: "Specialty",
      keys: { type: "text", value: ["specialization"] },
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
      headerText: "",
      actions: [
        {
          name: "view",
          onClick: (e, dataFromTable) => {
            e?.preventDefault();
            setShowView(true);
            setSelected(dataFromTable);
            return null;
          },
        },
        {
          name: "edit",
          onClick: (e, dataFromTable) => {
            e?.preventDefault();
            setSelected(dataFromTable);
            navigate("update-dentist", { state: dataFromTable });
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

  const { data, isFetching } = useQuery(["dentistList", page], () =>
    get("/dentists", {
      params: {
        page,
        limit,
        populate: ['user']
      },
    })
  );

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header title="Dentists" description="A list of all the dentists.">
            <Button
              Icon={<PlusCircleIcon className="w-4" />}
              text={"Add produce"}
              type={"primary-link"}
              path={"create-dentist"}
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
        <Modal show={showView} setShow={setShowView}>
          <ViewDentist selected={selected} />
        </Modal>
      </>
    </>
  );
};

export default Dentists;
