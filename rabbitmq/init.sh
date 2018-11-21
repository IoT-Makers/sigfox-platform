#!/bin/sh

# Import mqtt defs and create RabbitMQ user
init_cmd() {
    rabbitmqadmin -u $RABBITMQ_DEFAULT_USER -p $RABBITMQ_DEFAULT_PASS import /mqtt.definitions.json
    rabbitmqctl add_user $RABBITMQ_APP_USER $RABBITMQ_APP_USER_PWD 2>/dev/null
    rabbitmqctl set_permissions -p / $RABBITMQ_APP_USER  ".*" ".*" ".*"
    rabbitmqctl set_permissions -p /mqtt $RABBITMQ_APP_USER  ".*" ".*" ".*"
}

(
sleep 15;
NEXT_WAIT_TIME=5;
until init_cmd || [ $NEXT_WAIT_TIME -eq 10 ]; do
   sleep $(( NEXT_WAIT_TIME++ ))
done) &

# $@ is used to pass arguments to the rabbitmq-server command.
# For example if you use it like this: docker run -d rabbitmq arg1 arg2,
# it will be as you run in the container rabbitmq-server arg1 arg2
docker-entrypoint.sh rabbitmq-server $@