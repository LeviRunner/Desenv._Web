1

fuser -k 8000/tcp

2

php -S 0.0.0.0:8000 -t /workspaces/Desenv._Web/ > /dev/null 2>&1 &

3

./src/forward-ports.sh
