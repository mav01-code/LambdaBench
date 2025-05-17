import React, { useState } from "react";
import './BenchmarkForm.css';


const BenchmarkForm = () => {
  const [formData, setFormData] = useState({
    functionName: "",
    region: "",
    runtimes: "",
    memorySizes: "",
    invocations: "",
    idleTime: "",
    outputFormat: "",
    visualize: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Here you would send data to backend or run benchmarks
  };

  return (
   <div className="benchmark-container">
  <h2>Lambda Benchmark Configuration</h2>
  <form className="form-grid">
    <div className="form-group">
      <label>Function Name:</label>
      <input type="text" />
    </div>
    <div className="form-group">
      <label>Region:</label>
      <input type="text" />
    </div>
    <div className="form-group">
      <label>Runtimes (comma-separated):</label>
      <input type="text" />
    </div>
    <div className="form-group">
      <label>Memory Sizes (comma-separated MB):</label>
      <input type="text" />
    </div>
    <div className="form-group">
      <label>Invocations:</label>
      <input type="number" />
    </div>
    <div className="form-group">
      <label>Idle Time (e.g., 10m):</label>
      <input type="text" />
    </div>
    <div className="form-group">
      <label>Output Format:</label>
      <select>
        <option>Table</option>
        <option>JSON</option>
        <option>CSV</option>
      </select>
    </div>
    <div className="form-group checkbox-group">
      <input type="checkbox" />
      <label>Generate Visual</label>
    </div>
    <div className="button-wrapper">
      <button type="submit" className="run-btn">Run Benchmark</button>
    </div>
  </form>
</div>
  );
};

export default BenchmarkForm;