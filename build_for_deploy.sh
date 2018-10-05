#!/usr/bin/env bash

# HOWTO
: <<'COMMENT'
    (export SUBDOMAIN=subdomain \
    export DOMAIN=domain; \
    export API_VERSION=api; \
    export REGISTRY_URL=domain:5000/; \
    sudo -E bash build_for_deploy.sh)
COMMENT


if [[ -z "${REGISTRY_URL}" ]]; then
    echo "REGISTRY_URL not set. If you are using sudo, try sudo -E"
    return -1
fi

export PRIMUS_URL=https://primus.${SUBDOMAIN}.${DOMAIN}
export API_URL=https://api.${SUBDOMAIN}.${DOMAIN}
export BUILD_ENV=prod

docker-compose build

docker login ${REGISTRY_URL}
docker push ${REGISTRY_URL}primus
docker push ${REGISTRY_URL}backend
docker push ${REGISTRY_URL}frontend
docker push ${REGISTRY_URL}mongodb
