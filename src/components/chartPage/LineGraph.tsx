import React, { useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function LineGraph() {
  const fetchData = async () => {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
    );
    const data = await response.json();
    return data;
  };

  const { data, status } = useQuery("covidData", fetchData);

  const buildChartData = (data: any) => {
    const chartData: number[] = [];
    const chartLabels: string[] = [];
    let lastDataPoint = 0;
    for (const date in data["cases"]) {
      chartLabels.push(date);
      const newDataPoint = data["cases"][date] - lastDataPoint;
      chartData.push(newDataPoint);
      lastDataPoint = data["cases"][date];
    }
    return { chartData, chartLabels };
  };

  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  const { chartData, chartLabels } = buildChartData(data);

  const chartOptions: any = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,

    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
      filler: {
        propagate: false,
      },
    },
  };

  const chartDataConfig = {
    labels: chartLabels.slice(1, chartLabels.length),
    datasets: [
      {
        label: "#Cases",
        data: chartData.slice(1, chartData.length),
        fill: true,
        backgroundColor: "rgba(159, 216, 223,0.4)",
        borderColor: "rgba(74, 71, 163,0.5)",
      },
    ],
  };

  return (
    <div className="linegraph w-full">
      <div className="w-full max-h-600">
        <Line
          height={"100%"}
          width={"100%"}
          options={chartOptions}
          data={chartDataConfig}
        />
      </div>
    </div>
  );
}

export default LineGraph;
