import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "widgets/cards";
import Header from "components/Header";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { Fragment } from "react";

export function UserProfile() {
  const [{ user }] = useCookies(["user"]);
  const { state } = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header title="Profile" description="View user profile.">
            <Fragment>
              <button
                onClick={() => navigate("/settings", { state: state ? state : user })}
                className="inline-flex items-center gap-2 rounded-md border-transparent border border-gray-300
              py-2 px-4 text-sm  text-green-700 font-medium shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto hover:text-gray-100
                   h-10  transition-colors duration-150   focus:shadow-outline "
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Settings</span>
                  <EyeIcon className="w-4" />
                </div>
              </button>
            </Fragment>
          </Header>
          <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
            <div className="absolute inset-0 h-full w-full bg-green-500/50" />
          </div>
          {!state ?
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <CardBody className="p-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="mb-10 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <Avatar
                      src={user?.image}
                      alt={user?.name}
                      size="xl"
                      className="rounded-full shadow-lg shadow-blue-gray-500/40" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    />
                    <div>
                      {/* <Typography variant="h5" color="blue-gray" className="mb-1">
                      {user?.name
                        ?.toLowerCase()
                        ?.split(" ")
                        ?.map(
                          (part: string) =>
                            part?.charAt(0)?.toUpperCase() + part?.slice(1)
                        )
                        ?.join(" ")}
                    </Typography> */}
                      <Typography variant="h5" color="blue-gray" className="mb-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {user?.name}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                      >
                        {user?.role?.toUpperCase()} -
                        <span className={`inline-flex items-center rounded-full capitalize  px-2 py-1 text-sm font-medium ${user?.verified ? 'bg-green-100 text-green-600 bold' : 'bg-yellow-50 text-yellow-800'}ring-1 ring-inset ring-yellow-600/20`}>
                          {user?.verified ? 'Verified' : 'Not Verified'}
                        </span>
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                  <ProfileInfoCard
                    title="Profile Information"
                    details={{
                      "Fullname": user?.name,
                      mobile: user?.phone || "N/A",
                      email: user?.email || "N/A",
                      joinat: moment(user?.createdAt).format("MMM DD, YYYY"),
                    }}
                  />
                  <ProfileInfoCard
                    title="Profile Information"
                    description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                  />
                </div>
              </CardBody>
            </Card>
            :
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <CardBody className="p-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="mb-10 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <Avatar
                      src={state?.image}
                      alt={state?.name}
                      size="xl"
                      className="rounded-full shadow-lg shadow-blue-gray-500/40" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    />
                    <div>
                      {/* <Typography variant="h5" color="blue-gray" className="mb-1">
                      {user?.name
                        ?.toLowerCase()
                        ?.split(" ")
                        ?.map(
                          (part: string) =>
                            part?.charAt(0)?.toUpperCase() + part?.slice(1)
                        )
                        ?.join(" ")}
                    </Typography> */}
                      <Typography variant="h5" color="blue-gray" className="mb-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {state?.name}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                      >
                        {state?.role?.toUpperCase()} -
                        <span className={`inline-flex items-center rounded-full capitalize  px-2 py-1 text-sm font-medium ${state?.verified ? 'bg-green-100 text-green-600 bold' : 'bg-yellow-50 text-yellow-800'}ring-1 ring-inset ring-yellow-600/20`}>
                          {state?.verified ? 'Verified' : 'Not Verified'}
                        </span>
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                  <ProfileInfoCard
                    title="Profile Information"
                    details={{
                      "Fullname": state?.name,
                      mobile: state?.phone || "N/A",
                      email: state?.email || "N/A",
                      joinat: moment(state?.createdAt).format("MMM DD, YYYY"),
                    }}
                  />
                  <ProfileInfoCard
                    title="Profile Information"
                    description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                  />
                </div>
              </CardBody>
            </Card>
          }
        </div>
      </div>
    </>
  );
}

export default UserProfile;
