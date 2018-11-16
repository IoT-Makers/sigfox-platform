FROM rabbitmq:3-management-alpine

RUN rabbitmq-plugins enable --offline rabbitmq_mqtt
EXPOSE 1883

COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf
COPY mqtt.definitions.json /mqtt.definitions.json
COPY init.sh /init.sh

RUN chmod +x /init.sh

CMD ["/init.sh"]
