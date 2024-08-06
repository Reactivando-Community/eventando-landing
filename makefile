build: 
	git pull
	yarn
	yarn build

start:
	pm2 start yarn --name eventando-landing -- run start

update:
	make build
	pm2 restart eventando-landing
	

