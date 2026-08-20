@echo off
chcp 65001 >nul
title Servidor de Radios Mendonca - Console Aberto

cd /d "%~dp0"
set PORT=3050

echo ======================================================================
echo    INICIANDO SERVIDOR COM JANELA VISIVEL (MODO CONSOLE)
echo ======================================================================
echo.
echo Para acessar pela rede:
echo    http://srvti:3050  ou  http://10.10.1.100:3050
echo.
echo Pressione Ctrl + C para encerrar o servidor.
echo.

npm run dev
pause
