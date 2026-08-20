@echo off
chcp 65001 >nul
title Parar Sistema de Radios (Porta 3050)

cd /d "%~dp0"

echo ======================================================================
echo    ENCERRANDO SERVIDOR DE RADIOS NA PORTA 3050
echo ======================================================================
echo.

set PORT=3050
set FOUND=0

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT% " ^| findstr "LISTENING"') do (
    set PID=%%a
    set FOUND=1
    echo [INFO] Finalizando processo PID %%a escutando na porta %PORT%...
    taskkill /F /PID %%a >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] Processo PID %%a encerrado com sucesso!
    )
)

if "%FOUND%"=="0" (
    echo [INFO] Nenhum processo ativo encontrado na porta %PORT%.
)

echo.
echo ======================================================================
echo Servidor finalizado. Fechando janela...
echo ======================================================================
timeout /t 2 >nul 2>&1
exit
