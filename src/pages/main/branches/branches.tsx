import { FC, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/buttons/Button";
import Table from "../../../components/Table";
import { Column } from "../../../components/Table/types";
import Modal from "../../../components/Modal";
import Header from "../../../components/Header";
import { useQuery } from "react-query";
import { MoonLoader } from "react-spinners";
import { get } from "../../../api";
import usePagination from "../../../components/hooks/usePagination";
import { useNavigate } from "react-router-dom";
import ViewBranch from "./components/viewbranch";

const Branches: FC<{}> = () => {
  const [showView, setShowView] = useState(false);
  const [selected, setSelected] = useState<any>({});

  const navigate = useNavigate();

  const columns: Column[] = [
    {
      headerText: "Branch Manager",
      keys: { type: "text", value: ["name", "phone"] },
      type: "text",
    },
    {
      headerText: "Email | Address",
      keys: { type: "text", value: ["email", "address"] },
      type: "text",
    },
    {
      headerText: "Sales | Landmark",
      keys: { type: "text", value: ["location", "landmark"] },
      type: "text",
    },
    {
      headerText: "Type",
      keys: { type: "text", value: ["type"] },

      type: "text",
    },
    {
      headerText: "Created On",
      keys: { type: "date", value: ["createdAt"] },
      type: "date",
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
            navigate("update-branch", { state: dataFromTable });
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

  const { data, isFetching } = useQuery(["branchList", page], () =>
    get("/vendors", { params: { page, limit } })
  );

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Branches"
            description="A list of all the branches in your account including their name, title, email and role."
          >
            <Button
              Icon={<PlusCircleIcon className="w-4" />}
              text={"Add branch"}
              type={"link"}
              path={"/createbranch"}
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
                  <div className="h-full inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <Table columns={columns} data={data?.data} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Pagination hasMore={true} total={data?.total} />
              </div>
            </>
          )}
        </div>
      </div>
      {/* View single vendor */}
      <>
        <Modal show={showView} setShow={setShowView}>
          <ViewBranch selected={selected} />
        </Modal>
      </>
    </>
  );
};

export default Branches;
