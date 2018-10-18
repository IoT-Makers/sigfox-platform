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
    exit 1
fi

export PRIMUS_URL=https://primus.${SUBDOMAIN}.${DOMAIN}
export API_URL=https://api.${SUBDOMAIN}.${DOMAIN}
export BUILD_ENV=prod
export SERVER_NAME=${SUBDOMAIN}${DOMAIN:+.}${DOMAIN:-localhost}
export GIT_HASH=`git log --pretty=format:'%h' -n 1`


docker-compose build

echo "Building images is done."
read -r -p "Are you sure you wish to push new images to the docker registry? [Y/n] " input
case $input in
    [yY][eE][sS]|[yY])
        echo "Let's do it!"
        docker login ${REGISTRY_URL}
        docker push ${REGISTRY_URL}primus-${SUBDOMAIN}:${GIT_HASH:-latest}
        docker push ${REGISTRY_URL}backend-${SUBDOMAIN}:${GIT_HASH:-latest}
        docker push ${REGISTRY_URL}frontend-${SUBDOMAIN}:${GIT_HASH:-latest}
        docker push ${REGISTRY_URL}mongodb-${SUBDOMAIN}:${GIT_HASH:-latest}
        docker push ${REGISTRY_URL}primus-${SUBDOMAIN}:latest
        docker push ${REGISTRY_URL}backend-${SUBDOMAIN}:latest
        docker push ${REGISTRY_URL}frontend-${SUBDOMAIN}:latest
        docker push ${REGISTRY_URL}mongodb-${SUBDOMAIN}:latest
        ;;
    [nN][oO]|[nN])
        echo "Maybe next time then...!"
        exit 1
        ;;
    *)
        echo "Invalid input..."
        exit 1
	    ;;
esac