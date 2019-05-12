start cmd /k "node server\src\server.js"

timeout 10

start cmd /k "http-server .\web2\"

start chrome http://localhost:8080/levelBasedViews/level0.html

exit