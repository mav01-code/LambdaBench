import React from "react";
import { Bar } from "react-chartjs-2";

const BenchmarkVisualizer = ({ data }) => {
  const chartData = {
    labels: data.map((d) => `${d.runtime} (${d.memory}MB)`),
    datasets: [
      {
        label: "Avg Cold Start Time (ms)",
        data: data.map((d) => d.avgColdStartTime),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Visualization</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default BenchmarkVisualizer;
