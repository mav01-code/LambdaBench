const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/benchmark", async (req, res) => {
  const { runtimes, memorySizes, region, outputFormat, visualize } = req.body;

  const runtimesArr = runtimes.split(",").map((r) => r.trim());
  const memorySizesArr = memorySizes.split(",").map((m) => parseInt(m.trim(), 10));

  // Simulate benchmark results
  const benchmarkResults = [];

  for (const runtime of runtimesArr) {
    for (const memory of memorySizesArr) {
      const coldStartTime = (Math.random() * 300 + 50).toFixed(2); // e.g. "173.39"
      benchmarkResults.push({
        runtime,
        memory,
        region,
        coldStartTime: `${coldStartTime} ms`,
      });
    }
  }

  // If visualization is requested, return cleaned-up data
  if (visualize) {
    const graphData = benchmarkResults.map((result) => ({
      runtime: result.runtime,
      memory: result.memory,
      avgColdStartTime: parseFloat(result.coldStartTime.replace(" ms", "")), // remove 'ms'
    }));

    return res.json({
      format: outputFormat,
      visualize: true,
      graphData,
    });
  }

  // Otherwise, return raw benchmark data
  res.json({
    data: benchmarkResults,
    format: outputFormat,
    visualize: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
