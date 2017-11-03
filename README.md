# Sigfox Platform

**Warning: Project under active development, do not use it for production!**

## About this project

This project is a cloud platform to manage and visualize Sigfox devices and messages.

## Get started

### Demo

### Try it now with [Heroku](https://heroku.com)

Deploy an instance on your Heroku account to play around with it!

Warning: When using the free plan, the application goes to sleep after 30 min of inactivity (checkout the [pricing](https://www.heroku.com/pricing)).

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

An alternative way to get it running at Heroku is to install the [Heroku Toolbelt](https://toolbelt.heroku.com) and follow these steps:

```
git clone https://github.com/luisomoreau/sigfox-platform.git my-project
cd my-project
heroku apps:create my-project
git push heroku master
```

If you are not familiar with Heroku, just create an account an follow the procedure:

1. Create a new app:

![create app](doc/img/deploy-1.png)

2. Build & deploy app:

![build app](doc/img/deploy-2.png)

3. (Optional) Link the application with a MongoDB MLab database (Free):

Note that if you don't link a database to your application, all the data will be erased every time the application restarts.

* Go to [https://mlab.com](https://mlab.com/login/) and create an account and login.

* Create a new MongoDB Deployments:

![mlab-select-service](doc/img/mlab-select-service.png)

* Select your plan:

![mlab-select-plan](doc/img/mlab-select-plan.png)

* Select your region:

![mlab-select-region](doc/img/mlab-select-region.png)

* Create database:

![mlab-create-db](doc/img/mlab-create-db.png)

* Validate:

![mlab-validate](doc/img/mlab-validate.png)

* Create database user:

![mlab-create-user](doc/img/mlab-create-user.png)


### User guide

- Open app and register:

![login](doc/img/login.png)

![register](doc/img/register.png)

![login-2](doc/img/login-2.png)

Note that, the first user to register will be granted an admin role.
The other users to register will be granted user roles.


## Development

This project uses Loopback 3, Angular 4, Fireloop and MongoDB.

### Requirements

### API

### Webapp

## Contributors

* [Antoine de Chassey](https://github.com/AntoinedeChassey)
* [Louis Moreau](https://github.com/luisomoreau)
