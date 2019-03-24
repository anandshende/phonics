@echo off
echo 1.phonics
echo 2.searchPhoneme
echo 3.searchView
echo 4.length-based-views
echo 5.level-based-search
set /p choice="Enter Sass Choice: "
echo 'choice' %choice%

if %choice%==1 (set dirname=phonics)
if %choice%==2 (set dirname=searchPhoneme)
if %choice%==3 (set dirname=searchView)
if %choice%==4 (set dirname=length-based-views)
if %choice%==5 (set dirname=searchPhoneme)

echo 'dirname' %dirname%
sass --watch .\scss\%dirname%.scss:.\css\%dirname%.css