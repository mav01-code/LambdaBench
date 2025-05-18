# LambdaBench
Benchmarking Tool to Detect AWS Lambda Cold Start Time

LambdaBench helps you evaluate the **cold start latency** of AWS Lambda functions based on configurable parameters like runtime, memory, region, and idle time. Get detailed insights and visualize cold start times to make informed decisions when optimizing your serverless architecture.



## What is a Cold Start?

A **cold start** occurs when your Lambda function is invoked after being idle for a while. AWS spins up a new container which takes longer than a **warm** start (an already running instance). Cold starts impact latency, especially in latency-sensitive apps.



## Inputs

Provide the following inputs to begin benchmarking:

- **Function Name**: The name of the AWS Lambda function
- **Runtime**: `python`, `node.js`, `java`, etc.
- **Memory**: Choose from `128MB`, `256MB`, `512MB`, `1024MB`, etc.
- **Region**: AWS region (e.g., `us-east-1`, `ap-south-1`)
- **Idle Time**: Duration (in minutes/hours) to keep the Lambda idle before invocation
- **Output Type**: Choose how to export results:  
  - `.csv`  
  - `.json`  
  - Console Table


## Output

After benchmarking, LambdaBench provides:

- **Cold Start Time (ms)**: Time taken to execute the function after the idle period
- **Visualizations**:
  - Graphs for cold start duration vs memory - using Chart.js
  - Comparisons by runtime and region


