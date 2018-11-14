@echo off
set /p dirname="Enter HTML name: "
echo 'dirname' %dirname%
sass --watch .\scss\%dirname%.scss:.\css\%dirname%.css