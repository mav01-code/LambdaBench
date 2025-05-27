# LambdaBench
Benchmarking(Testing) Tool to Detect AWS Lambda Cold Start Time

LambdaBench helps you evaluate the **cold start latency** of AWS Lambda functions based on configurable parameters like runtime, memory, region, and idle time. Get detailed insights and visualize cold start times to make informed decisions when optimizing your serverless architecture.



## What is a Cold Start?

A **cold start** occurs when your Lambda function is invoked after being idle for a while. AWS spins up a new container which takes longer than a **warm** start (an already running instance). Cold starts impact latency, especially in latency-sensitive apps.



## Inputs

Provide the following inputs to begin benchmarking:

- **Function Name**: The name of the AWS Lambda function
- **Runtime**: `python`, `node.js`, `java`, etc.
- **Memory**: Choose from `128MB`, `256MB`, `512MB`, `1024MB`, etc.
- **Artifact Type**: Choose either zip file or container image
- **Region**: AWS region (e.g., `us-east-1`, `ap-south-1`)
- **Output Type**: Choose how to export results:  
  - `.csv`  
  - `.json`  
  - `Console Table`


## Output

After benchmarking, LambdaBench provides:

- **Cold Start Time (ms)**: Time taken to execute the function after the idle period in different output formats
- **Visualizations**:
  - Graphs for cold start duration vs memory between different runtimes

## How does it detect cold start time
It's supposed to calculate cold start delay by invoking existing lambda functions. But if the user came here to check the cold start time after delay has already happened, invoking it will incur charges onto their aws account.

So, we came up with a generalized formula which calculates cold start time of the lambda function.

```
const baseTime = baseTimes[runtime.toLowerCase()] || 180;
const memoryFactor = Math.max(50, 300 / memory);
const coldStartTime = (baseTime + memoryFactor).toFixed(2);
```

The first line selects the runtime from pre-defined languages, if not present, base time is made to 180ms by default. We considered a max function to calculate memory factor. As memory increases, cold start time decreaases but cold start time is never equal to zero. So, if we use a higher memory size, there's a high chance, it'll become zero. So we set the minimum cold start time to 50ms. In the last step, we added base time and memory factor and fixed the decimal point to 2.

## Packages required to install
- Frontend
  1. npm install react
  2. npm install react-chartjs-2 chart.js
- Backend
  1. npm install express
  2. npm install cors

## Use Case
It's upto the user how he wants to use the application. He can use it to estimate charges on his aws account by considering cold start time or he can just wanna play with it to understand how cold start time is calculated.