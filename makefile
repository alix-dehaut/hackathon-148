DOCKER_COMPOSE_RUN=docker-compose run --rm --no-deps
DOCKER_COMPOSE_UP=docker-compose up --detach

##
## Setup
## -----
##

# start: up install ## Start development environment & install

start-dev: start fixtures ## Make install with developer fixtures

# install:
# 	$(DOCKER_COMPOSE_RUN) composer install
# 	# $(DOCKER_COMPOSE_RUN) npm install

start:
	$(DOCKER_COMPOSE_UP)

stop:
	docker-compose down --remove-orphans --volumes

fixtures: ## Launch fixtures
	docker-compose exec php bin/console doctrine:fixture:load -n

update:
	docker-compose exec php bin/console doctrine:schema:update --force

migrations:
	docker-compose exec php bin/console make:migration

##
## Tools
## -----
##

cc: ## Clear cache
	docker-compose exec web bash -c "php bin/console cache:clear"

cs: ## Executes php cs fixer
	docker-compose exec web bash -c "vendor/bin/php-cs-fixer --no-interaction --diff -v fix"
