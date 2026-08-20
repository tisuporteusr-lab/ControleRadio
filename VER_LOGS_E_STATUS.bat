@echo off
chcp 65001 >nul
title Status do Servidor de Radios e Logs - SRVTI:3050

cd /d "%~dp0"
set PORT=3050

:loop
cls
echo ======================================================================
echo    STATUS DO SISTEMA DE RADIOS (SRVTI:3050)
echo ======================================================================
echo.

set ATIVO=0
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT% " ^| findstr "LISTENING"') do (
    set ATIVO=1
    set PID=%%a
)

if "%ATIVO%"=="1" (
    echo [STATUS] SERVIDOR ATIVO E RODANDO NA PORTA %PORT% (PID: %PID%)
    echo URLs: http://srvti:3050  ^|  http://10.10.1.100:3050
) else (
    echo [STATUS] SERVIDOR PARADO / NAO DETECTADO NA PORTA %PORT%
)

echo.
echo ======================================================================
echo    ULTIMAS LINHAS DO LOG DO SERVIDOR (logs\servidor.log)
echo ======================================================================
echo.

if exist "logs\servidor.log" (
    powershell -NoProfile -Command "Get-Content -Path 'logs\servidor.log' -Tail 20"
) else (
    echo Arquivo logs\servidor.log ainda nao foi gerado.
)

echo.
echo ======================================================================
echo Pressione [R] para Recarregar Status ou [S] para Sair
echo ======================================================================
choice /c RS /n /m "Escolha: "
if errorlevel 2 exit
if errorlevel 1 goto loop
