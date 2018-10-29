#!/usr/bin/sh
# Create a super user and a operational user on the db called $SUBDOMAIN.

mongo=( mongo --host 127.0.0.1 --port 27017 --quiet )
mongo+=(
    --username="$MONGO_INITDB_ROOT_USERNAME"
    --password="$MONGO_INITDB_ROOT_PASSWORD"
    --authenticationDatabase="$rootAuthDatabase"
)
export MONGO_INITDB_DATABASE="${MONGO_INITDB_DATABASE:-testdb}"
export MONGO_APP_USER=${MONGO_APP_USER:-usr}
export MONGO_APP_USER_PWD=${MONGO_APP_USER_PWD:-pwd}
export MONGO_DB_OWNER=${MONGO_DB_OWNER:-dbowner}
export MONGO_DB_OWNER_PWD=${MONGO_DB_OWNER_PWD:-pwd}

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.createUser({
        user: $(jq --arg 'user' "$MONGO_APP_USER" --null-input '$user'),
        pwd: $(jq --arg 'pwd' "$MONGO_APP_USER_PWD" --null-input '$pwd'),
        roles: [ { role: 'readWrite', db: $(jq --arg 'db' "$MONGO_INITDB_DATABASE" --null-input '$db') } ]
    });
    db.createUser({
        user: $(jq --arg 'user' "$MONGO_DB_OWNER" --null-input '$user'),
        pwd: $(jq --arg 'pwd' "$MONGO_DB_OWNER_PWD" --null-input '$pwd'),
        roles: [ { role: 'dbOwner', db: $(jq --arg 'db' "$MONGO_INITDB_DATABASE" --null-input '$db') } ]
    })
EOJS
