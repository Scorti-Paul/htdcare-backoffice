import React from "react";
// import { ArrowPathIcon } from '@heroicons/react/24/solid' 

export default function usePagination(
  pageInitial: number,
  limitInitial: number,
  showLimit?: boolean
) {
  const [page, setPage] = React.useState(pageInitial || 1);
  const [lowerBound, setLowerBound] = React.useState(pageInitial || 1);
  const [limit, setLimit] = React.useState(limitInitial || 10);
  const [upperBound, setUpperBound] = React.useState(limitInitial || 10);
  // const [open, setOpen] = React.useState(false);

  const goNext = React.useCallback(() => {
    setPage(page + 1);
    setLowerBound(lowerBound + 10);
    setUpperBound(upperBound + 10);
  }, [lowerBound, upperBound, page]);

  const goPrev = React.useCallback(() => {
    setLowerBound(lowerBound - 10);
    setUpperBound(upperBound - 10);
    setPage(page - 1);
  }, [lowerBound, upperBound, page]);

  // const toggle = useCallback(() => {
  //   setOpen(!open)
  // }, [open])
  const Pagination = ({hasMore, total}: {hasMore: boolean; total: number}) => {
    return (
      <React.Fragment>
        <nav
          className="flex items-center justify-between  border-gray-200 bg-white py-3 sm:px-6 md:px-0"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{lowerBound}</span> to{" "}
              <span className="font-medium">
                {upperBound < total ? upperBound : total}{" "}
              </span>{" "}
              of <span className="font-medium">{total || 0}</span> results
            </p>
          </div>
          <div className="flex flex-1 justify-between items-center sm:justify-end">
            {/* <div>
              <ArrowPathIcon
                className="h-6 w-6 text-green-600 mr-4 hover:text-green-400 hover:cursor-pointer"
                aria-hidden="true"
              />
            </div> */}
            {showLimit ? (
              <select
                className="relative me-3 inline-flex items-center rounded-md border border-gray-300 bg-white ps-4 py-2 text-sm font-medium text-gray-700"
                onChange={(e: any) => setLimit(e?.target?.value)}
                value={limit}
              >
                <option value="10"> Limit 10</option>
                <option value="50">Limit 50</option>
                <option value="100">Limit 100</option>
                <option value="200">Limit 200</option>
              </select>
            ) : null}
            <button
              onClick={() => goPrev()}
              disabled={lowerBound <= 1 ? true : false}
              className={
                lowerBound <= 1
                  ? `relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 `
                  : `relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`
              }
            >
              Previous
            </button>
            <button
              onClick={() => goNext()}
              disabled={upperBound >= total ? true : false}
              className={
                upperBound >= total
                  ? `relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700`
                  : `relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`
              }
            >
              Next
            </button>
          </div>
        </nav>
      </React.Fragment>
    );
  };
  return {
    Pagination,
    page,
    limit,
    setPage,
    setLimit,
  };
}
