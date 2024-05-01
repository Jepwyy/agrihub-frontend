import React, { MouseEvent, useRef, useState } from "react";
import { Bar, Doughnut, getElementAtEvent, Radar } from "react-chartjs-2";
import useGetReportTotalHarvestChart from "../../../../hooks/api/get/useGetReportTotalHarvestChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../../ui/select";
import useGetFarmAllCropsQuery from "../../../../hooks/api/get/useGetFarmAllCropsQuery";
import useGetReportCropDistributionCommunity from "../../../../hooks/api/get/useGetReportCropDistributionCommunity";
import { chartColor } from "../../../../constants/data";
import { Button } from "../../../ui/button";
import { FaFilePdf } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { formatMonth } from "../../../lib/utils";
const BarchartHarvest = () => {
  const [activeIndex, setActiveIndex] = useState<string>("");
  const chartRef = useRef();
  const { data: harvestChart } = useGetReportTotalHarvestChart();
  const { data } = useGetFarmAllCropsQuery();
  const { data: cropDistribution } = useGetReportCropDistributionCommunity({
    month: activeIndex
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    onHover: (event: any, chartElement: any) => {
      // console.log(event);
      // console.log(chartElement);
      if (chartElement.length === 1) {
        event.native.target.style.cursor = "pointer";
      }
      if (chartElement.length === 0) {
        event.native.target.style.cursor = "default";
      }
    },
    plugins: {
      datalabels: {
        display: true,
        color: "#ffffff",
        font: {
          weight: "bold" as "bold"
        },
        formatter: function (value: any) {
          console.log(value);
          if (value === "0") {
            return "";
          } else {
            return `${value}KG`;
          }
        }
      }
    }
  };
  const optionsRadar = {
    responsive: true,
    maintainAspectRatio: false,

    scale: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false
        }
      }
    },
    plugins: {
      datalabels: {
        display: true,
        color: "rgba(228, 241, 254, 1)",
        anchor: "end" as "end",
        align: "start" as "start",
        offset: 8,
        font: {
          weight: "bold" as "bold"
        },
        formatter: function (value: any) {
          return `${value}KG`;
        }
      }
    }
  };

  const barData = {
    labels: Object.keys(harvestChart || {}),
    datasets: [
      {
        label: "Harvest",
        data: Object.values(harvestChart || {}),
        backgroundColor: ["#21c45d"]
      }
    ]
  };

  const radarData = {
    labels: cropDistribution?.map(item => item.crop_name),
    datasets: [
      {
        label: "Harvest",
        data: cropDistribution?.map(item => item.total_harvested_qty),

        backgroundColor: chartColor.map(item => item)
      }
    ]
  };

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (chartRef.current) {
      const index = getElementAtEvent(chartRef.current, event)[0].index;
      const activeLabel = index + 1;
      setActiveIndex(String(activeLabel) || "");
    }
  };

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current
  });

  return (
    <div
      ref={componentRef}
      className="grid grid-cols-12 gap-x-4 gap-y-[2.5rem]"
    >
      <div className="border border-border p-4 rounded-lg lg:col-span-8 col-span-12">
        <div className="flex justify-between ">
          <div>
            <h5 className="font-poppins-medium">Monthly Harvest Kilogram</h5>
            <p className="text-xs text-gray-400">
              Click the bar to view the harvest summary of that month
            </p>
          </div>
          <Button
            className="print:hidden p-4 bg-[#DE2429]"
            onClick={handlePrint}
          >
            <FaFilePdf size={16} />
          </Button>
          {/* <Select>
            <SelectTrigger className="w-auto focus-visible:ring-0">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent className=" max-h-[40vh]">
              {data?.map((crop, i) => (
                <SelectItem key={i} value={crop?.id || ""}>
                  {crop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>
        <div className="h-[350px]  ">
          <Bar
            className="chart_export"
            ref={chartRef}
            onClick={onClick}
            data={barData}
            options={chartOptions}
          />
        </div>
      </div>
      <div className=" lg:col-span-4 col-span-12 ">
        {Number(cropDistribution?.length || 0) > 0 && (
          <div
            className={`border border-border p-4 rounded-lg duration-300 ${
              Number(cropDistribution?.length || 0) > 0 ? "h-full" : "h-0"
            }`}
          >
            <h5 className="font-poppins-medium">
              Crops Harvest : {formatMonth(activeIndex)}
            </h5>
            <div className="h-[350px]  ">
              <Doughnut data={radarData} options={optionsRadar} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarchartHarvest;
