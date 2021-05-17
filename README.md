# Sigfox Platform

<a href="https://www.buymeacoffee.com/antoine" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

![Gitlab pipeline status (branch)](https://img.shields.io/gitlab/pipeline/AntoinedeChassey/sigfox-platform/master.svg?label=build%20%28master%29)
![Gitlab pipeline status (branch)](https://img.shields.io/gitlab/pipeline/AntoinedeChassey/sigfox-platform/staging.svg?label=build%20%28staging%29)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/IoT-Makers/sigfox-platform/dev.svg?label=last%20commit%20%28dev%29)
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)
![GitHub](https://img.shields.io/github/license/IoT-Makers/sigfox-platform.svg)

**Disclaimer: Project under active development, use it at your own risk!**

## About this project
This is a cloud platform to manage Sigfox devices and visualize messages.
![overview](docs/img/overview.png)

## [Try it](https://try.iotagency.sigfox.com)
You can deploy it yourself, but we encourage you to try it out [here](https://try.iotagency.sigfox.com).

## Features  

**Create customizable dashboards**

*charts*
![dashboard_temp_hum](docs/img/dashboard_temp_hum.png)

*maps*
![tracking](docs/img/dashboard_tracking.png)

**Review raw & decoded data in realtime**
![message](docs/img/message.png)

**Create and share parsers**
![parser](docs/img/parser.png)

**Connect to other services with alerts**
![alert](docs/img/alert.png)

**Manage devices, share with others in organization**
![device](docs/img/device.png)

## Technologies

### Application
 * Backend: [Loopback 3+](https://loopback.io/)
 * Frontend: [Angular 6+](https://angular.io/)
 * Real-time: [Primus](https://github.com/primus/primus)
 * Database: [MongoDB](https://www.mongodb.com/en)
 * Pub-sub & queuing: [RabbitMQ](https://www.rabbitmq.com/)
 
 ### Deployment
 * Reverse proxy: [Traefik](https://traefik.io/) => a nice talk @devoxx to understand Traefik [here](https://www.youtube.com/watch?v=AqiGcLsVMeI)
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

![message_journey](docs/img/message-journey.png)

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

## Author & co-author

<table><tr><td align="center"><a href="https://twitter.com/adechassey"><img src="https://avatars3.githubusercontent.com/u/12235204?v=4" width="100px;" alt="Antoine de Chassey"/><br /><sub><b>Antoine de Chassey</b></sub></a><br /><a href="https://github.com/IoT-Makers/sigfox-platform/commits?author=AntoinedeChassey" title="Code">💻</a></td><td align="center"><a href="http://louismoreau.eu"><img src="https://avatars1.githubusercontent.com/u/4725870?v=4" width="100px;" alt="Louis MOREAU"/><br /><sub><b>Louis MOREAU</b></sub></a><br /><a href="https://github.com/IoT-Makers/sigfox-platform/commits?author=luisomoreau" title="Code">💻</a></td></tr></table>

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/siyu6974"><img src="https://avatars1.githubusercontent.com/u/15876323?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Siyu</b></sub></a><br /><a href="https://github.com/IoT-Makers/sigfox-platform/commits?author=siyu6974" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/aureleq"><img src="https://avatars0.githubusercontent.com/u/5591266?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aurelien Lequertier</b></sub></a><br /><a href="https://github.com/IoT-Makers/sigfox-platform/commits?author=aureleq" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/markoceri"><img src="https://avatars1.githubusercontent.com/u/16639103?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marko</b></sub></a><br /><a href="https://github.com/IoT-Makers/sigfox-platform/commits?author=markoceri" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/nestorayuso"><img src="https://avatars2.githubusercontent.com/u/15124932?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nestor Ayuso</b></sub></a><br /><a href="https://github.com/IoT-Makers/sigfox-platform/commits?author=nestorayuso" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.splendido.fr"><img src="https://avatars1.githubusercontent.com/u/11613206?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Florian Splendido</b></sub></a><br /><a href="#platform-splendf" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="https://github.com/honeytrap15"><img src="https://avatars.githubusercontent.com/u/5158471?v=4?s=100" width="100px;" alt=""/><br /><sub><b>takegami</b></sub></a><br /><a href="https://github.com/IoT-Makers/sigfox-platform/commits?author=honeytrap15" title="Code">💻</a></td>
    <td align="center"><a href="https://www.inn-farm.co.jp/"><img src="https://avatars.githubusercontent.com/u/84294566?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Innovation Farm, Inc.</b></sub></a><br /><a href="https://github.com/IoT-Makers/sigfox-platform/commits?author=Innovation-Farm" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Feel free to submit a Pull Request and don't forget to add you name and your useful links.

## Support this project
Hey dude! Help me out for a couple of :beers: or :coffee:!

<a href="https://www.buymeacoffee.com/antoine" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
