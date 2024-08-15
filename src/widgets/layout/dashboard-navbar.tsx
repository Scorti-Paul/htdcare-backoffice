import {
  // Typography,
  // IconButton,
  Input,
  // Menu,
  // MenuHandler,
  // MenuList,
  // MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  // Cog6ToothIcon,
  // BellIcon,
  // ClockIcon,
  // CreditCardIcon,
} from "@heroicons/react/24/solid";
import Header from "components/Header";

export function DashboardNavbar() {
  return (
    <>
      <Header title="Dashboard" description="Welcome to your dashboard">
        <>
          <div className="flex items-center">
            <div className="mr-auto md:mr-4 md:w-56">
              <Input label="Type here" color="green" crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>
            {/* <IconButton variant="text" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton> */}
            <Avatar
              src="https://firebasestorage.googleapis.com/v0/b/backoffice-staging-c8a4a.appspot.com/o/images%2F1694076769549.jpeg?alt=media&token=3ad47252-312e-4e12-8c64-25664a389cf8"
              alt="item-1"
              size="sm"
              variant="circular" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </div>
        </>
      </Header>
    </>

    // <Header title="Dashboard" description="">
    //   <>
    //     <div className="flex items-center">
    //       <div className="mr-auto md:mr-4 md:w-56">
    //         <Input label="Type here" color="green" crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
    //       </div>
    // <IconButton variant="text" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    //   <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
    // </IconButton>
    //       <Menu>
    //         <MenuHandler>
    //           <IconButton variant="text" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    //             <BellIcon className="h-5 w-5 text-blue-gray-500" />
    //           </IconButton>
    //         </MenuHandler>
    //         <MenuList className="w-max border-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    //           <MenuItem className="flex items-center gap-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    //             <Avatar
    //               src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
    //               alt="item-1"
    //               size="sm"
    //               variant="circular" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                />
    //             <div>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="mb-1 font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
    //                 <strong>Completed purchase</strong> from Laur
    //               </Typography>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="flex items-center gap-1 text-xs font-normal opacity-60" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
    //                 <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
    //               </Typography>
    //             </div>
    //           </MenuItem>
    //           <MenuItem className="flex items-center gap-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    //             <Avatar
    //               src="https://demos.creative-tim.com/material-dashboard/assets/img/team-3.jpg"
    //               alt="item-1"
    //               size="sm"
    //               variant="circular" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                />
    //             <div>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="mb-1 font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
    //                 <strong>New order</strong> by Travis Scott
    //               </Typography>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="flex items-center gap-1 text-xs font-normal opacity-60" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
    //                 <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
    //               </Typography>
    //             </div>
    //           </MenuItem>
    //           <MenuItem className="flex items-center gap-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    //             <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
    //               <CreditCardIcon className="h-4 w-4 text-white" />
    //             </div>
    //             <div>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="mb-1 font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
    //                 Payment successfully completed
    //               </Typography>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="flex items-center gap-1 text-xs font-normal opacity-60" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
    //                 <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
    //               </Typography>
    //             </div>
    //           </MenuItem>
    //         </MenuList>
    //       </Menu>
    //     </div>
    //   </>
    // </Header>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
