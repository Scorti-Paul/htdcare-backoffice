import { FC, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/buttons/Button";
import Table from "../../../components/Table";
import { Column } from "../../../components/Table/types";
import Header from "../../../components/Header";
import {useMutation, useQuery} from "react-query";
import {MoonLoader} from "react-spinners";
import {get, post} from "../../../api";
import usePagination from "../../../components/hooks/usePagination";
import {useNavigate} from "react-router-dom";
import {FunnelIcon} from "@heroicons/react/20/solid";
import regiondata from "../../../components/constants/regions.json";
import {FolderArrowDownIcon} from "@heroicons/react/24/outline";
const Farmers: FC<{}> = () => {
  const [, setSelected] = useState<any>({});
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [gender, setGender] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);

  const columns: Column[] = [
    {
      headerText: "Name | Phone",
      keys: {type: "text", value: ["fullName", "phone"]},
      type: "text",
    },
    {
      headerText: "Email | Region",
      keys: {type: "text", value: ["email", "region"]},
      type: "text",
    },
    {
      headerText: "Farm size",
      keys: {type: "text", value: ["farmSize"]},
      type: "text",
    },
    {
      headerText: "Created On",
      keys: {type: "date", value: ["createdAt"]},
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
            navigate("farmer", {state: dataFromTable});
            return null;
          },
        },
        {
          name: "edit",
          onClick: (e, dataFromTable) => {
            e?.preventDefault();
            setSelected(dataFromTable);
            navigate("update-farmer", {state: dataFromTable});
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

  const {data, isFetching} = useQuery(
    ["farmerList", page, limit, gender, region],
    () =>
      get("/farmers", {
        params: {
          page,
          limit,
          gender: gender || undefined,
          region: region || undefined,
        },
      })
  );

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Farmers"
            description="A list of all the farmers in your account including their name, title, email and role."
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex gap-3 px-4 py-2 items-center rounded-lg border"
              >
                Filter <FunnelIcon className="w-4" fill="" />
              </button>
              <Button
                Icon={<PlusCircleIcon className="w-4" />}
                text={"Add farmer"}
                type={"link"}
                path={"/createfarmers"}
                onClick={() => null}
                hasIcon={true}
              />
            </div>
          </Header>
          {
            // Show the filter component if showFilter is true
            showFilter ? (
              <Filter
                gender={gender}
                setGender={setGender}
                region={region}
                setRegion={setRegion}
              />
            ) : null
          }
          {/* <div>
            <Filter />
          </div> */}
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
    </>
  );
};

export default Farmers;

const Filter = ({gender, setGender, region, setRegion}: any) => {
  const {mutateAsync, isLoading} = useMutation(["download"], () =>
    post("/download", {
      body: {
        page: 1,
        limit: 100,
        gender: gender || undefined,
        region: region || undefined,
      },
    })
  );

  const download = async () => {
    await mutateAsync()
      ?.then((res) => {
        console.log(res);
        const url = window.URL.createObjectURL(new Blob([res?.attachment]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "farmers.csv");
        document.body.appendChild(link);
        link.click();
      })
      ?.catch((e) => console.log(e));
  };
  return (
    <div className="flex justify-between items-center">
      <div className="grid grid-cols-4 items-center gap-4">
        <select
          value={gender}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white ps-4 py-3 text-sm font-medium text-gray-700"
          onChange={(e: any) => setGender(e?.target?.value)}
        >
          <option value={""}>By Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          value={region}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white ps-4 py-3 text-sm font-medium text-gray-700"
          onChange={(e: any) => setRegion(e?.target?.value)}
        >
          <option value={""}>By Region</option>
          {regiondata.map((region: any, index: number) => (
            <option key={index} value={region?.region}>
              {region?.region}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => download()}
        className="border rounded-lg flex items-center gap-3 bg-green-500 text-white px-4 py-2"
      >
        <span>Download</span>
        {isLoading ? (
          <MoonLoader color="#fff" size={20} />
        ) : (
          <FolderArrowDownIcon className="w-4 text-white" />
        )}
      </button>
    </div>
  );
};