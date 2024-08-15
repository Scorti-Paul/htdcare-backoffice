import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "components/buttons/Button";
import Header from "components/Header";
import { EyeIcon, UserIcon, BriefcaseIcon, ChartPieIcon } from "@heroicons/react/24/outline";
import BioData from "./views/BioData";
import Occupational1 from "./views/Occupational1";
import Occupational2 from "./views/Occupational2";
import Occupational3 from "./views/Occupational3";
import Analytics from "./views/Analytics";

export default function ViewSingleFarmer() {
  const [tab, setTab] = useState(1);
  const { state } = useLocation();

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header title="Single Farmer" description="Fill details pf a farmer.">
            <Button
              Icon={<EyeIcon className="w-4" />}
              text={"Farmers"}
              type={"link"}
              path={"/farmers"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>
          <div className="flex h-full">
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
              <div className="relative z-0 flex flex-1 overflow-hidden">
                <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last py-2">
                  <article>
                    {/* Tabs */}
                    <ul className="w-full mt-3 flex justify-center">
                      <li
                        className={
                          tab === 1
                            ? "transition-all duration-300 border-b border-b-green-500 text-green-600 px-0 pb-4 font-bold cursor-pointer w-full"
                            : "transition-all duration-300 font-normal border-b cursor-pointer px-0 pb-4 w-full"
                        }
                        onClick={() => setTab(1)}
                      >
                        <div className="flex items-start gap-3">
                          <UserIcon className="w-6" />
                          <div className="flex flex-col">
                            <span>Bio Data</span>
                            <span
                              className={
                                tab === 1
                                  ? "text-sm text-green-500 font-normal pt-1"
                                  : "text-sm text-gray-500 font-normal pt-1"
                              }
                            >
                              Basic details of farmer
                            </span>
                          </div>
                        </div>
                      </li>
                      <li
                        className={
                          tab === 2
                            ? "transition-all duration-300 border-b border-b-green-500 text-green-600 px-0 pb-3 font-bold cursor-pointer w-full"
                            : "transition-all duration-300 font-normal border-b cursor-pointer px-0 pb-3 w-full"
                        }
                        onClick={() => setTab(2)}
                      >
                        <div className="flex items-start gap-3">
                          <BriefcaseIcon className="w-6" />
                          <div className="flex flex-col">
                            <span>Occupational</span>
                            <span
                              className={
                                tab === 2
                                  ? "text-sm text-green-500 font-normal pt-1"
                                  : "text-sm text-gray-500 font-normal pt-1"
                              }
                            >
                              Occupational details
                            </span>
                          </div>
                        </div>
                      </li>
                      <li
                        className={
                          tab === 3
                            ? "transition-all duration-300 border-b border-b-green-500 text-green-600 px-0 pb-3 font-bold cursor-pointer w-full"
                            : "transition-all duration-300 font-normal border-b cursor-pointer px-0 pb-3 w-full"
                        }
                        onClick={() => setTab(3)}
                      >
                        <div className="flex items-start gap-3">
                          <BriefcaseIcon className="w-6" />
                          <div className="flex flex-col">
                            <span>Occupational</span>
                            <span
                              className={
                                tab === 3
                                  ? "text-sm text-green-500 font-normal pt-1"
                                  : "text-sm text-gray-500 font-normal pt-1"
                              }
                            >
                              Occupational details
                            </span>
                          </div>
                        </div>
                      </li>
                      <li
                        className={
                          tab === 4
                            ? "transition-all duration-300 border-b border-b-green-500 text-green-600 px-0 pb-3 font-bold cursor-pointer w-full"
                            : "transition-all duration-300 font-normal border-b cursor-pointer px-0 pb-3 w-full"
                        }
                        onClick={() => setTab(4)}
                      >
                        <div className="flex items-start gap-3">
                          <BriefcaseIcon className="w-6" />
                          <div className="flex flex-col">
                            <span>Occupational</span>
                            <span
                              className={
                                tab === 4
                                  ? "text-sm text-green-500 font-normal pt-1"
                                  : "text-sm text-gray-500 font-normal pt-1"
                              }
                            >
                              Occupational details
                            </span>
                          </div>
                        </div>
                      </li>
                      <li
                        className={
                          tab === 5
                            ? "transition-all duration-300 border-b border-b-green-500 text-green-600 px-0 pb-3 font-bold cursor-pointer w-full"
                            : "transition-all duration-300 font-normal border-b cursor-pointer px-0 pb-3 w-full"
                        }
                        onClick={() => setTab(5)}
                      >
                        <div className="flex items-start gap-3">
                          <ChartPieIcon className="w-6" />
                          <div className="flex flex-col">
                            <span>Analytics</span>
                            <span
                              className={
                                tab === 5
                                  ? "text-sm text-green-500 font-normal pt-1"
                                  : "text-sm text-gray-500 font-normal pt-1"
                              }
                            >
                              Actionable insights
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="shadow-md border border-gray-100 rounded-md py-3">
                      {tab === 1 && <BioData state={state} />}
                      {tab === 2 && <Occupational1 state={state} />}
                      {tab === 3 && <Occupational2 state={state} />}
                      {tab === 4 && <Occupational3 state={state} />}
                      {tab === 5 && <Analytics state={state} />}
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



