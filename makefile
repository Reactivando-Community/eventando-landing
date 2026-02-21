build: 
	git pull
	yarn
	yarn build

start:
	pm2 start yarn --name swaps-landing -- run start

update:
	make build
	pm2 restart swaps-landing
	

