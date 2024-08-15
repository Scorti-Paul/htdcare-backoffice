import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
    {
    color: "pink",
    icon: UserIcon,
    title: "Total Farmers",
    value: "2,300",
    footer: {
      // color: "text-green-500",
      // value: "+3%",
      // label: "than last year",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Total Branches",
    value: "4",
    footer: {
      color: "text-red-500",
      value: "sales -2%",
      label: "than last quarter",
    },
  },
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Total Orders",
    value: "GHS53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Sales",
    value: "GHS103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
