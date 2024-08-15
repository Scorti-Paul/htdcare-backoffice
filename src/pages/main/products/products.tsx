import { FC, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Button from "components/buttons/Button";
import Table from "components/Table";
import { Column } from "components/Table/types";
import Modal from "components/Modal";
import Header from "components/Header";
import ViewProduct from "./components/viewproduct";
import usePagination from "components/hooks/usePagination";
import { useQuery } from "react-query";
import { get } from "api";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Products: FC<{}> = () => {
  const [showView, setShowView] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const navigate = useNavigate();

  const columns: Column[] = [
    {
      headerText: "Product",
      keys: { type: "text", value: ["name"] },
      type: "text",
    },
    {
      headerText: "Quantity",
      keys: { type: "text", value: ["stock"] },
      type: "text",
    },
    {
      headerText: "Categories",
      keys: { type: "currency", value: ["sellersPrice", "costPrice"] },
      type: "text",
    },
    {
      headerText: "Vendor",
      keys: { type: "text", value: ["vendor.name"] },
      type: "text",
    },
    {
      headerText: "Status",
      keys: { type: "text", value: ["status"] },
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

  const { data, isFetching } = useQuery(["productList", page], () =>
    get("/products", {
      params: { page, limit, populate: ["vendors", "categories"] },
    })
  );

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Products"
            description="A list of all the products in your account including their name, title, email and role."
          >
            <Button
              Icon={<PlusCircleIcon className="w-4" />}
              text={"Add product"}
              type={"link"}
              path={"/createproducts"}
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
          <ViewProduct selected={selected} />
        </Modal>
      </>
    </>
  );
};

export default Products;
