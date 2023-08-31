#!/bin/bash
FOLDER="${PWD##*/}"

function clean_docker() {
	docker-compose down --rmi all --volumes
	docker rm -f $(docker ps -a -q)
	docker system prune -af
	docker volume rm $(docker volume ls -q)

	echo "Cleaning node_modules and dist folders"
	rm -rf ../**/dist ../**/node_modules ../**/.pnpm-store/
}

function confirmation() {
	while true; do
		read -p "Are you sure ? [Y/n] " yn
		case $yn in
			[Yy]* ) clean_docker; break;;
			[Nn]* ) break;;
			* ) break;;
		esac
	done
}

if [[ "$FOLDER" == "scripts" ]]; then cd .. ;fi
if [ -z "$1" ]; then
	confirmation
elif [[ $1 == "-f" ]]; then
	echo "Force clean"
	clean_docker
fi
