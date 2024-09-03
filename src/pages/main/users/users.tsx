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

const Users: FC<{}> = () => {
  const [, setSelected] = useState<any>({});
  const navigate = useNavigate();

  const columns: Column[] = [
    {
      headerText: "Name",
      keys: { type: "text", value: ["fullName"] },
      type: "text",
    },
    {
      headerText: "User role",
      keys: { type: "text", value: ["role"] },
      type: "text",
    },
    {
      headerText: "Email",
      keys: { type: "text", value: ["email"] },
      type: "text",
    },
    {
      headerText: "Phone",
      keys: { type: "text", value: ["phone"] },
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
            navigate("user/profile", { state: dataFromTable });
            return null;
          },
        },
        {
          name: "edit",
          onClick: (e, dataFromTable) => {
            e?.preventDefault();
            setSelected(dataFromTable);
            navigate("update-user", { state: dataFromTable });
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

  const { data, isFetching } = useQuery(["userList", page], () =>
    get("/users", { params: { page, limit } })
  );

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Users"
            description="A list of all the user in your account including their name, title, email and role."
          >
            <Button
              Icon={<PlusCircleIcon className="w-4" />}
              text={"Add user"}
              type={"link"}
              path={"/createuser"}
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
              <Pagination hasMore={true} total={data?.total} />
            </>
          )}
        </div>
      </div>
      
    </>
  );
};

export default Users;
