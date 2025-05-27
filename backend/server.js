const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000"  // React frontend origin
}));

app.use(express.json());

app.post("/api/benchmark", async (req, res) => {
  console.log("Full request body:", req.body);

  const { runtimes, memorySizes, region, outputFormat, visualize, artifactType } = req.body;

  if (!runtimes || !memorySizes || !region) {
    return res.status(400).json({ error: "Missing required fields: runtimes, memorySizes, or region" });
  }

  const runtimesArr = runtimes.split(",").map((r) => r.trim()).filter(Boolean);
  const memorySizesArr = memorySizes.split(",").map((m) => parseInt(m.trim(), 10)).filter(Boolean);

  const baseTimes = {
    nodejs: 150,
    python: 200,
    java: 250,
    go: 100,
  };

  const benchmarkResults = [];

  for (const runtime of runtimesArr) {
    for (const memory of memorySizesArr) {
      const baseTime = baseTimes[runtime.toLowerCase()] || 180;
      const memoryFactor = Math.max(50, 300 / memory);
      const coldStartTime = (baseTime + memoryFactor).toFixed(2);

      benchmarkResults.push({
        runtime,
        memory,
        region,
        artifactType: artifactType || "-",
        coldStartTime: `${coldStartTime} ms`,
      });
    }
  }

  console.log("Benchmark results:", benchmarkResults);

  const response = {
    data: benchmarkResults,
    format: outputFormat,
    visualize: visualize,
  };

  if (visualize) {
    response.graphData = benchmarkResults.map((result) => ({
      runtime: result.runtime,
      memory: result.memory,
      avgColdStartTime: parseFloat(result.coldStartTime.replace(" ms", "")),
    }));
  }

  res.json(response);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
