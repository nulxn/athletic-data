@echo off

RMDIR /s /q "dist\"
npx gulp
copy "src\FiraCode-VariableFont_wght.ttf" "dist\fonts\"
