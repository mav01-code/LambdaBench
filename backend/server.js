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

  const benchmarkResults = [];

  for (const runtime of runtimesArr) {
    for (const memory of memorySizesArr) {
      const coldStartTime = (Math.random() * 300 + 50).toFixed(2);
      benchmarkResults.push({
        runtime,
        memory,
        region,
        coldStartTime: `${coldStartTime} ms`,
      });
    }
  }

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
