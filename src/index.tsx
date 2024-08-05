import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
  </div>
);

//코드챌린지
//1. make a back button
//2. make something cool on price tab
//3. change chart to candlestick style
