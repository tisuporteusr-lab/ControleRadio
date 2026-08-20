@echo off
chcp 65001 >nul
title Parar Todos os Processos Node (Servidor de Radios)

cd /d "%~dp0"

echo ======================================================================
echo    ENCERRANDO TODOS OS PROCESSOS NODE DO SERVIDOR
echo ======================================================================
echo.

echo Finalizando servicos node.exe...
taskkill /F /IM node.exe /T >nul 2>&1

if %errorlevel% equ 0 (
    echo [OK] Todos os processos Node.js foram encerrados.
) else (
    echo [INFO] Nenhum processo Node.js estava ativo.
)

echo.
echo ======================================================================
echo Fechando janela...
echo ======================================================================
timeout /t 2 >nul 2>&1
exit
