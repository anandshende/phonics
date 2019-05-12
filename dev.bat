start cmd /k "call demo.bat"

timeout 15

start cmd /k "cd .\web2\assets && call ^"sass batch.bat^" "

start cmd /k "echo grunt&grunt"

code .

exit