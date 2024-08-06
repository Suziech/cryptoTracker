import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

interface ApexCandlestickSeries {
  x: Date;
  y: [number, number, number, number];
}
function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom)
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });
  console.log(isLoading, data, coinId);

  const seriesData: ApexCandlestickSeries[] | undefined = data?.map((price) => ({
    x: new Date(price.time_open * 1000), // Assuming time_open is in seconds, convert to milliseconds
    y: [price.open, price.high, price.low, price.close],
  }));

  return (
    <div>
      {isLoading ? (
        "Loadiing chart..."
      ) : (
        <ApexCharts
          type='candlestick'
          series={[
            {
              name: "Price",
              data: seriesData || []
            },
          ]}
          options={{
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100],
              },
            },
            colors: ["blue"],
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              categories: data?.map((price) => price.time_close),
              type: "datetime",
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
