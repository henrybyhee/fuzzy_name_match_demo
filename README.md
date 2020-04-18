# Fuzzy Name Matching

An application to compare names by computing their similarity score using classic fuzzy string matching algorithms.
Algorithms were implemented from scratch in Rust [here](https://github.com/Henry-bee/fuzzy_name_match).

Commonly used in fraud detection, identity verification and compliance name screening where name is the only data point.
Hence the need to match a profile against multiple names at speed.

![Demo](./assets/FuzzyNameMatchDemo.gif)


## Try it out [here](#)!

# How this works?

1. User enter a query name and a few similar names for comparison.
2. Similarity score between query name and each similar name is calculated.
3. To determine similarity, these algorithms are used with equal weightage:
     - Jaro-Winkler Distance (50%)
     - Jaccard Index of Soundex Matches(50%)
4. Comparison results will be returned in descending order of similarity.

# What's under the hood?

React application hosted on S3 makes dynamic HTTP calls to a serverless Lambda backend written in Rust.

## Technologies:
- React
- TypeScript
- Material UI
- S3
- AWS SAM:
  - API Gateway
  - AWS Lambda
- Rust

# Improvements

- To reduce network latency, it'll be even better embed the Rust code using WebAssembly.