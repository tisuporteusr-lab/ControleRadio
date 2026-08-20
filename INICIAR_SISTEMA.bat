@echo off
chcp 65001 >nul
title Iniciando Sistema de Radios - SRVTI:3050

cd /d "%~dp0"
if not exist "logs" mkdir "logs"

set PORT=3050

:: 1. Encerra qualquer processo anterior que esteja ocupando a porta 3050
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT% " ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

:: 2. Executa o VBScript para iniciar 100% em segundo plano (invisivel)
wscript.exe "%~dp0INICIAR_SISTEMA_SILENCIOSO.vbs"

echo ======================================================================
echo    SISTEMA DE RADIOS MENDONCA INICIADO EM SEGUNDO PLANO
echo ======================================================================
echo.
echo Servidor ativo na porta %PORT%!
echo.
echo Links de Acesso:
echo   - Rede:  http://srvti:3050
echo   - IP:    http://10.10.1.100:3050
echo   - Local: http://localhost:3050
echo.
echo Log do servidor: logs\servidor.log
echo Fechando esta janela do terminal...
echo.

timeout /t 1 >nul 2>&1
exit
