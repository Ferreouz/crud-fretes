#!/usr/bin/env sh
#

docker compose down
docker image rm crud-fretes-backend crud-fretes-frontend
docker compose up -d
