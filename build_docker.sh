#!/usr/bin/env bash

# HOWTO
: <<'COMMENT'
 (export BUILD_ENV=prod; \
 export API_URL=https://api.subdomain.domain \
 export API_VERSION=api; \
 export PRIMUS_URL=https://primus.subdomain.domain; \
 export REGISTRY_URL=domain:5000/; \
 sudo -E bash build_docker.sh)
COMMENT


if [[ -z "${REGISTRY_URL}" ]]; then
    echo "REGISTRY_URL not set. If you are using sudo, try sudo -E"
    return -1
fi

docker-compose build

docker login ${REGISTRY_URL}
docker push ${REGISTRY_URL}primus
docker push ${REGISTRY_URL}backend
docker push ${REGISTRY_URL}frontend
docker push ${REGISTRY_URL}mongodb
