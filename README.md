# Sigfox Platform

**Disclaimer: Project under active development, use it at your own risk!**

## About this project
This is a cloud platform to manage Sigfox devices and visualize messages.
![overview](doc/img/overview.png)

## Try it
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

**Connected to other services with alerts**
![alert](doc/img/alert.png)

**Manage devices, share with others in organization**
![device](doc/img/device.png)


## Development

This project uses Loopback 3, Angular 6, primus.io and MongoDB.

### Requirements

### API (To Be Updated, below is an old version)

Below is the functional/sequential diagram representing the message journey.

![message_journey](doc/img/message-journey.png)

### Webapp

#### Color code

| GPS | Sigfox | WiFi | BLE |
| :-------: | :-------: | :-------:	| :-------: |
| ![#9B7A48](https://placehold.it/15/9B7A48/000000?text=+) `#9B7A48` | ![#792FAA](https://placehold.it/15/792FAA/000000?text=+) `#792FAA` | ![#2F2A30](https://placehold.it/15/2f2A30/000000?text=+) `#2F2A30` | ![#3C58CE](https://placehold.it/15/3C58CE/000000?text=+) `#3C58CE` |

#### Developers

##### Linking a Sigfox device to the platform

Once the application is deployed, head over to the 'connectors'. You will need to create a developer access token in order to secure the API calls. You can then copy & paste the callback information you need in the device type new callback onto the [Sigfox Backend](https://backend.sigfox.com/).

##### Adding a custom parser

A short wiki can be found [here](https://github.com/IoT-Makers/sigfox-platform/wiki/Adding-a-custom-parser).

## Roadmap


## Authors

* [Antoine de Chassey](https://github.com/AntoinedeChassey)
* [Louis Moreau](https://github.com/luisomoreau)

## Contributors

Feel free to submit a Pull Request and don't forget to add you name and your useful links ;)

> Made with &nbsp;:heart:&nbsp; by Antoine de Chassey & Louis Moreau
