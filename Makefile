.PHONY: コンテナ一覧
ps:
	docker compose ps -a

.PHONY: コンテナ起動
init:
	@make delete
	docker compose build --no-cache
	docker compose up -d
	docker compose exec -it app npm ci
	docker compose exec -it app npm run db:deploy

.PHONY: コンテナ削除
delete:
	docker compose down --rmi all --volumes --remove-orphans

.PHONY: コンテナにアタッチ
attach:
	docker compose exec -it app bash
