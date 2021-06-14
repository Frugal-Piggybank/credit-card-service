# Credit Card Service

Service designed to return data specifically for managing credit cards on the Frugal Piggybank playground.

## Prerequisites

- [Azure Functions Core Tools CLI](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos%2Ccsharp%2Cbash#v2) (currently version 3.x)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) (currently version 2.x) for deployments.

## Installation

```bash
yarn install
```

## Run the project locally

```bash
yarn build
func host start
```

Navigate to http://localhost:7071/graphql to perform GraphQL queries
