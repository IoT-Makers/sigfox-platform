#!/usr/bin/env bash

# HOWTO
: <<'COMMENT'
    (export DOMAIN=domain; \
    export API_VERSION=api; \
    export REGISTRY_URL=domain:5000/; \
    sudo -E bash build_for_deploy.sh [-y] subdomain1 subdomain2 ...)
COMMENT

# Constants
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[38;5;11m"
BOLD="\033[1m"
RESET="\033[0m"

if [[ -z "${REGISTRY_URL}" ]]; then
    printf "${RED}REGISTRY_URL not set. If you are using sudo, try sudo -E\n${RESET}"
    exit 1
fi

while getopts y option
    do
    case "${option}"
    in
    y) push_img_arg="yes";;
    esac
done

subdomain_ctr=0

while true; do
    export SUBDOMAIN=${@:$OPTIND+$subdomain_ctr:1};
    if [ -z "$SUBDOMAIN" ]; then
        if [[ "${subdomain_ctr}" -eq 0 ]]; then
            printf "${RED}No subdomain found\n${RESET}"
        fi
        break
    fi
    printf "${GREEN}===============> SUBDOMAIN = $SUBDOMAIN\n${RESET}"
    export PRIMUS_URL=https://primus.${SUBDOMAIN}.${DOMAIN}
    export API_URL=https://api.${SUBDOMAIN}.${DOMAIN}
    export BUILD_ENV=prod
    export SERVER_NAME=${SUBDOMAIN}${DOMAIN:+.}${DOMAIN:-localhost}
    export GIT_HASH=`git log --pretty=format:'%h' -n 1`

    docker-compose build
    printf "${GREEN}===============> Building completed for $SUBDOMAIN\n${RESET}"

    push_img=$push_img_arg
    if [ -z "$push_img" ]; then
        read -r -p "$(echo -e ${YELLOW}"Are you sure you wish to push new images to the docker registry $REGISTRY_URL?"${RESET}" [y/n] ")" push_img
    fi

    case $push_img in
        [yY][eE][sS]|[yY])
            echo "Let's do it!"
            docker login ${REGISTRY_URL}

            docker tag ${REGISTRY_URL}primus-${SUBDOMAIN}:$GIT_HASH ${REGISTRY_URL}primus-${SUBDOMAIN}:latest
            docker tag ${REGISTRY_URL}backend-${SUBDOMAIN}:$GIT_HASH ${REGISTRY_URL}backend-${SUBDOMAIN}:latest
            docker tag ${REGISTRY_URL}frontend-${SUBDOMAIN}:$GIT_HASH ${REGISTRY_URL}frontend-${SUBDOMAIN}:latest
            docker tag ${REGISTRY_URL}mongodb-${SUBDOMAIN}:$GIT_HASH ${REGISTRY_URL}mongodb-${SUBDOMAIN}:latest

            docker push ${REGISTRY_URL}primus-${SUBDOMAIN}:$GIT_HASH
            docker push ${REGISTRY_URL}backend-${SUBDOMAIN}:$GIT_HASH}
            docker push ${REGISTRY_URL}frontend-${SUBDOMAIN}:$GIT_HASH
            docker push ${REGISTRY_URL}mongodb-${SUBDOMAIN}:$GIT_HASH

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
    unset $push_img
    subdomain_ctr=${subdomain_ctr}+1
done
