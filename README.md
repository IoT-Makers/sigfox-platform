# Sigfox Platform

![Gitlab pipeline status (branch)](https://img.shields.io/gitlab/pipeline/AntoinedeChassey/sigfox-platform/master.svg?label=build%20%28master%29)
![Gitlab pipeline status (branch)](https://img.shields.io/gitlab/pipeline/AntoinedeChassey/sigfox-platform/staging.svg?label=build%20%28staging%29)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/IoT-Makers/sigfox-platform/dev.svg?label=last%20commit%20%28dev%29)

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
![GitHub](https://img.shields.io/github/license/IoT-Makers/sigfox-platform.svg)
![Beerpay](https://img.shields.io/beerpay/IoT-Makers/sigfox-platform.svg)

**Disclaimer: Project under active development, use it at your own risk!**

## About this project
This is a cloud platform to manage Sigfox devices and visualize messages.
![overview](doc/img/overview.png)

## [Try it](https://try.iotagency.sigfox.com)
You can deploy it yourself, but we encourage you to try it out [here](https://try.iotagency.sigfox.com).

## Features  

**Create customizable dashboards**

*charts*
![dashboard_temp_hum](doc/img/dashboard_temp_hum.png)

*maps*
![tracking](doc/img/dashboard_tracking.png)

**Review raw & decoded data in realtime**
![message](doc/img/message.png)

**Create and share parsers**
![parser](doc/img/parser.png)

**Connect to other services with alerts**
![alert](doc/img/alert.png)

**Manage devices, share with others in organization**
![device](doc/img/device.png)

## Technologies

### Application
 * Backend: [Loopback 3+](https://loopback.io/)
 * Frontend: [Angular 6+](https://angular.io/)
 * Real-time: [Primus](https://github.com/primus/primus)
 * Database: [MongoDB](https://www.mongodb.com/en)
 * Pub-sub & queuing: [RabbitMQ](https://www.rabbitmq.com/)
 
 ### Deployment
 * Reverse proxy: [Traefik](https://traefik.io/)
 * Containerization: [Docker](https://www.docker.com/)
 * Orchestrator: [Docker Swarm](https://docs.docker.com/engine/swarm/)
 * Environment management UI: [Portainer](https://portainer.io/)
 * DB backups (private cloud storage): [Minio](https://www.minio.io/)

 ### Monitoring
* Metrics database: [Prometheus](https://prometheus.io/)
* Visualize metrics: [Grafana](https://grafana.com/)
* Host metrics collector: [Node-exporter](https://github.com/prometheus/node_exporter)
* Containers metrics collector: [cAdvisor](https://github.com/google/cadvisor/)
* Docker daemon metrics collector: [dockerd-exporter](https://github.com/stefanprodan/dockerd-exporter)
* Alerts dispatcher: [Alertmanager](https://github.com/prometheus/alertmanager)
* Alert manager dashboard: [Unsee](https://github.com/google/cadvisor/)
 
## Development

### Requirements

### API (To Be Updated, below is an old version)

Below is the functional/sequential diagram representing the message journey.

![message_journey](doc/img/message-journey.png)

### Frontend

#### Color code

| GPS | Sigfox | WiFi | BLE |
| :-------: | :-------: | :-------:	| :-------: |
| ![#9B7A48](https://placehold.it/15/9B7A48/000000?text=+) `#9B7A48` | ![#792FAA](https://placehold.it/15/792FAA/000000?text=+) `#792FAA` | ![#2F2A30](https://placehold.it/15/2f2A30/000000?text=+) `#2F2A30` | ![#3C58CE](https://placehold.it/15/3C58CE/000000?text=+) `#3C58CE` |

## Gurus

### Linking a Sigfox device to the platform

Once the application is deployed, head over to the 'connectors'. You will need to create a developer access token in order to secure the API calls. You can then copy & paste the callback information you need in the device type new callback onto the [Sigfox Backend](https://backend.sigfox.com/).

### Adding a custom parser

A short wiki can be found [here](https://github.com/IoT-Makers/sigfox-platform/wiki/Adding-a-custom-parser).

## Roadmap


## Authors

* [Antoine de Chassey](https://github.com/AntoinedeChassey)
* [Louis Moreau](https://github.com/luisomoreau)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/5591266?v=4" width="100px;" alt="Aurelien Lequertier"/><br /><sub><b>Aurelien Lequertier</b></sub>](https://twitter.com/aureleq)<br />[💻](https://github.com/IoT-Makers/sigfox-platform/commits?author=aureleq "Code") | [<img src="https://avatars1.githubusercontent.com/u/16639103?v=4" width="100px;" alt="Marko"/><br /><sub><b>Marko</b></sub>](https://github.com/markoceri)<br />[💻](https://github.com/IoT-Makers/sigfox-platform/commits?author=markoceri "Code") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->
* [Siyu Zhang](https://github.com/siyu6974)

Feel free to submit a Pull Request and don't forget to add you name and your useful links.

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/IoT-Makers/sigfox-platform/badge.svg?style=beer-square)](https://beerpay.io/IoT-Makers/sigfox-platform)  [![Beerpay](https://beerpay.io/IoT-Makers/sigfox-platform/make-wish.svg?style=flat-square)](https://beerpay.io/IoT-Makers/sigfox-platform?focus=wish)
