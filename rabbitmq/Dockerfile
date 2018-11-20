FROM rabbitmq:3-management-alpine

EXPOSE 1883

COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf
COPY mqtt.definitions.json init.sh /

RUN rabbitmq-plugins enable --offline rabbitmq_mqtt && \
    chmod +x /init.sh

CMD ["/init.sh"]
