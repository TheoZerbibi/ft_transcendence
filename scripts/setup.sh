#!/bin/bash

FOLDER="${PWD##*/}"
IGreen='\033[0;92m'
Color_Off='\033[0m'

function check_env() {
	env | grep HOSTNAME > /dev/null
	if [[ ! $? -eq 0 ]]; then
		echo -e "Please run '${IGreen}. ./env.sh${Color_Off}' first"
		exit 0
fi
}

function copy_dist() {
	cp .env.dist .env
	cat .env
	echo ""
	echo ".env does not exist, copy dist env file."
	echo "Please modify the .env file manually."
	echo ""
}

function launch_app() {
	echo ".env exists, project is ready."
	while true; do
		read -p "Do you wish to run docker compose? [Y/n] " yn
		case $yn in
			[Yy]* ) docker compose up -d; break;;
			[Nn]* ) break;;
			* ) break;;
		esac
	done
}

function clean_docker() {
	while true; do
		read -p "Do you wish to clean docker volume? [Y/n] " yn
		case $yn in
			[Yy]* ) bash ./clean.sh -f; break;;
			[Nn]* ) break;;
			* ) break;;
		esac
	done
}

check_env
clean_docker
if [[ "$FOLDER" == "scripts" ]]; then cd .. ;fi
if [[ ! -f .env ]]; then
	copy_dist
else
	launch_app
fi

