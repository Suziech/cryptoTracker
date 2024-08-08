import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";

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

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, error, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  const [colDefs] = useState<ColDef[]>([
    { field: "time_open", headerName: "Open Time", flex: 0.25 },
    { field: "time_close", headerName: "Close Time", flex: 0.25 },
    { field: "open", headerName: "Open", flex: 0.25 },
    { field: "close", headerName: "Close", flex: 0.25 },
    { field: "high", headerName: "High", flex: 0.25 },
    { field: "low", headerName: "Low", flex: 0.25 },
    { field: "volume", headerName: "Volume", flex: 0.25 },
    { field: "market_cap", headerName: "Market Cap", flex: 0.25 }
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
      <AgGridReact
        rowData={data}
        columnDefs={colDefs}
      />
    </div>
  );
}

export default Price;
