#!/bin/bash

docker-compose down --rmi all --volumes
docker rm -f $(docker ps -a -q)
docker system prune -af
docker volume rm $(docker volume ls -q)

echo "Cleaning node_modules and dist folders"
rm -rf ./**/dist ./**/node_modules ./**/.pnpm-store/ ./**/dist/
