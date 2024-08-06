import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community"; // ColDef 가져오기

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
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false,  },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions
  const [colDefs] = useState<ColDef[]>([ // ColDef 타입 지정
    { field: "open", flex:0.25 },
    { field: "close", flex:0.25 },
    { field: "high", flex: 0.25},
    { field: "low", flex: 0.25}
  ]);

  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  console.log('data', data)

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
