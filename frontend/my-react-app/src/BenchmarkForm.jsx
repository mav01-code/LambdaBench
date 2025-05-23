import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import './BenchmarkForm.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BenchmarkForm = () => {
  const [formData, setFormData] = useState({
    runtimes: "",
    memorySizes: "",
    region: "",
    outputFormat: "Table",
    visualize: false,
  });

  const [graphData, setGraphData] = useState(null);
  const [rawData, setRawData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/benchmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.visualize && result.graphData) {
        setGraphData(result.graphData);
      } else {
        setGraphData(null);
      }

      setRawData(result.data || []);
    } catch (err) {
      console.error("Error running benchmark:", err);
    }
  };

  const chartData = {
    labels: graphData?.map(d => `${d.runtime} (${d.memory}MB)`),
    datasets: [
      {
        label: "Avg Cold Start Time (ms)",
        data: graphData?.map(d => d.avgColdStartTime),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div className="benchmark-container">
      <h2>Cold Start Benchmark</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Runtime:</label>
          <input
            type="text"
            name="runtimes"
            value={formData.runtimes}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Memory Sizes (comma separated):</label>
          <input
            type="text"
            name="memorySizes"
            value={formData.memorySizes}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Region:</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Output Format:</label>
          <select name="outputFormat" value={formData.outputFormat} onChange={handleChange}>
            <option value="Table">Table</option>
            <option value="JSON">JSON</option>
            <option value="CSV">CSV</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="visualize"
            checked={formData.visualize}
            onChange={handleChange}
          />
          <label>Generate Visual</label>
        </div>

        <div className="button-wrapper">
          <button type="submit">Run Benchmark</button>
        </div>
      </form>

      {graphData && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Visualization</h3>
          <Bar data={chartData} />
        </div>
      )}

      {rawData && formData.outputFormat === "Table" && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Benchmark Table</h3>
          <table>
            <thead>
              <tr>
                <th>Runtime</th>
                <th>Memory</th>
                <th>Region</th>
                <th>Cold Start Time</th>
              </tr>
            </thead>
            <tbody>
              {rawData.map((item, index) => (
                <tr key={index}>
                  <td>{item.runtime}</td>
                  <td>{item.memory} MB</td>
                  <td>{item.region}</td>
                  <td>{item.coldStartTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rawData && formData.outputFormat === "JSON" && (
        <pre style={{ marginTop: "2rem", backgroundColor: "#f4f4f4", padding: "1rem" }}>
          {JSON.stringify(rawData, null, 2)}
        </pre>
      )}

      {rawData && formData.outputFormat === "CSV" && (
        <div style={{ marginTop: "2rem" }}>
          <h3>CSV Output</h3>
          <pre>
            Runtime,Memory,Region,Cold Start Time
            {"\n"}
            {rawData.map(
              (item) => `${item.runtime},${item.memory},${item.region},${item.coldStartTime}`
            ).join("\n")}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BenchmarkForm;
