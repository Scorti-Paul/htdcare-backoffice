import { FC, useState } from "react";
import Table from "components/Table";
import { Column } from "components/Table/types";
import Modal from "components/Modal";
import Header from "components/Header";
import ViewOrder from "./components/vieworder";
import usePagination from "components/hooks/usePagination";
import { useQuery } from "react-query";
import { get } from "api";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Orders: FC<{}> = () => {
  const [showView, setShowView] = useState(false);
  const [selected, setSelected] = useState<any>({});

  const navigate = useNavigate();

  const columns: Column[] = [
    {
      headerText: "Order ID",
      keys: { type: "text", value: ["orderNumber"] },
      type: "text",
    },
    {
      headerText: "Customer",
      keys: { type: "text", value: ["user.email", "user.phone"] },
      type: "text",
    },
    {
      headerText: "Status ",
      keys: { type: "text", value: ["status"] },
      type: "text",
      capitalize: true,
    },
    {
      headerText: "Total Cost",
      keys: {
        type: "currency",
        value: ["totalCost"],
      },
      type: "text",
    },
    {
      headerText: "Payment Status",
      keys: { type: "text", value: ["paymentStatus"] },
      type: "text",
      capitalize: true,
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
            navigate("update-order", { state: dataFromTable });
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

  const {Pagination, page, limit} = usePagination(1, 10, true);

  const { data, isFetching } = useQuery(["orderList", page,limit], () =>
    get("/orders", {
      params: {
        page,
        limit,
        populate: ["user", "items.product"],
        sort: "desc",
      },
    })
  );

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header title="Orders" description="A list of all orders.">
            <></>
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
      {/* View single order */}
      <>
        <Modal show={showView} setShow={setShowView}>
          <ViewOrder selected={selected} />
        </Modal>
      </>
    </>
  );
};

export default Orders;
