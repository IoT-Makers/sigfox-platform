#!/usr/bin/env bash

if [[ -z "${REGISTRY_URL}" ]]; then
    echo "REGISTRY_URL not set. If you are using sudo, try sudo -E"
    return -1
fi

docker-compose build

read -p 'Username: ' username
docker login -u ${username} --password-stdin ${REGISTRY_URL}
docker push ${REGISTRY_URL}primus
docker push ${REGISTRY_URL}backend
docker push ${REGISTRY_URL}frontend
docker push ${REGISTRY_URL}mongodb
