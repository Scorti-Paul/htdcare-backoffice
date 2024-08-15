import { FC, Suspense, useCallback, useState } from "react";
import Header from "../../../components/Header";
import { useQuery } from "react-query";
import { MoonLoader } from "react-spinners";
import { get } from "../../../api";
import usePagination from "../../../components/hooks/usePagination";
import List from "./components/list";
import AddButton from "components/buttons/addButton";
import CreateCategory from "./components/createCategory";
import TopLoader from "components/loaders/top";

const Category: FC<{}> = () => {
  const { Pagination, page, limit } = usePagination(1, 10);
  const [showAdd, setShowAdd] = useState(false);
  const { data, isFetching, refetch } = useQuery(["categories", page], () =>
    get("/categories", { params: { page, limit } })
  );

  const toggleShowAdd = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      setShowAdd(!showAdd);
    },
    [showAdd]
  );

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Categories"
            description="A list of all the categories to help filter products, services and produce."
          >
            <AddButton label={"Add New Category"} onClick={toggleShowAdd} />
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <List data={data?.data} />
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
      {/* View single create category */}
      <Suspense fallback={<TopLoader />}>
        <div className="flex justify-center ml-10">
          <CreateCategory show={showAdd} setShow={setShowAdd} refetch={refetch} />
        </div>
      </Suspense>
    </>
  );
};

export default Category;
