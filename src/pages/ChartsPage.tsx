import React from "react";
import LineGraph from "../components/chartPage/LineGraph";
import MapWithMarkers from "../components/chartPage/MapWithMarkers";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const ChartsPage: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center p-8">
        <h1 className="text-3xl font-semibold mb-4">COVID-19 Dashboard</h1>

        <h2 className="text-xl font-semibold mb-4">COVID-19 Cases Data</h2>
        <LineGraph />

        <h2 className="text-xl font-semibold mb-4">Countries Covid Data</h2>
        <MapWithMarkers />
      </div>
    </QueryClientProvider>
  );
};

export default ChartsPage;
