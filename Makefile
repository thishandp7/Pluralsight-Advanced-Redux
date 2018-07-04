PROJECT_NAME ?= cart-sim
ORG_NAME ?= thishandp7
CART_REPO_NAME ?= cs-cart
SERVER_REPO_NAME ?= cs-server

COMPOSE_FILE := docker/docker-compose.yml

CART := cart
SERVER := server

DOCKER_REGISTRY := docker.io

.PHONY: build tag publish clean tet

build:
	${INFO} "Pulling the latest image..."
	@ docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) build
	${INFO} "Running server service..."
	@ docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) up -d server
	${INFO} "Running cart service..."
	@ docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) up -d cart

tag:
	${INFO} "Tagging cart image..."
	@ docker tag $(CART_IMAGE_ID) $(DOCKER_REGISTRY)/$(ORG_NAME)/$(CART_REPO_NAME):latest
	${INFO} "Tagging server image..."
	@ docker tag $(SERVER_IMAGE_ID) $(DOCKER_REGISTRY)/$(ORG_NAME)/$(SERVER_REPO_NAME):latest
	${INFO} "Tagging Complete"

publish:
	${INFO} "Publishing cart images..."
	@ docker push $(ORG_NAME)/$(CART_REPO_NAME):latest
	${INFO} "Publishing server images..."
	@ docker push $(ORG_NAME)/$(SERVER_REPO_NAME):latest
	${INFO} "published"

clean:
	${INFO} "Destroying development environment...."
	@ docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) kill
	@ docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) rm -f -v
	${INFO} "Cleaning old build artifacts..."


#colors
LIGHT_YELLOW := "\e[93m"
NO_COLOR := "\e[0m"

#Shell Functions
INFO := @bash -c '\
	printf $(LIGHT_YELLOW); \
	echo "=> $$1"; \
	printf $(NO_COLOR)' VALUE


CART_CONTAINER_ID := $$(docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) ps -q $(CART))
SERVER_CONTAINER_ID := $$(docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) ps -q $(SERVER))

CART_IMAGE_ID := $$(docker inspect -f '{{ .Image }}' $(CART_CONTAINER_ID))
SERVER_IMAGE_ID := $$(docker inspect -f '{{ .Image }}' $(SERVER_CONTAINER_ID))
