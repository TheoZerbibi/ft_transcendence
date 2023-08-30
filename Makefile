all:
	-docker compose up --build -d

stop:
	-docker stop $$(docker ps -aq)

rm:
	-docker rm $$(docker ps -aq)

rmi: rm
	-docker rmi $$(docker images -aq)

clean:
	-docker system prune -af

purge: rmi clean

.PHONY: all stop rm rmi clean purge
