# NATS Services Demo for Endava Dev Week

This project demonstrates the use of NATS services to create two microservices: `badge_generator` and `frequency_service`.

## Description

The `badge_generator` service is responsible for generating badges for users. It takes a user's name and company as input and generates a PDF badge.

The `frequency_service` service keeps track of the frequency of badge generation requests. It provides a count of how many times a badge has been generated.

## Installation

1. Clone the repository.
2. Run `bun install` to install the dependencies.
3. Run the services with `bun run <service name>`

## Usage

To generate a badge, send a request to the `badge_generator` service with the user's name and company as payload. Refer to the `get-badge` file.

To get the frequency of badge generation requests, send a request to the `frequency_service` service. Refer to the `get-frequency` file.

## Contributing

Contributions are welcome. Please submit a pull request or create an issue to discuss the changes.

## Acknowledgements

Some of the code in this project was inspired by or referenced from the open source project at [https://github.com/aricart/services_demo](https://github.com/aricart/services_demo).

## License

Refer to the `LICENSE` file for more information.
