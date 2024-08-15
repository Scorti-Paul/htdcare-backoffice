import { chartsConfig } from "configs";

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};


export const statisticsLargeChartsData = [
  {
    color: "teal",
    title: "Services Request",
    description: "5% increase",
    footer: "updated 37 min ago",
    chart: dailySalesChart,
  }
];

export default statisticsLargeChartsData;
