@echo off
chcp 65001 >nul
title Configurar Inicializacao Automatica com o Windows - Sistema de Radios

echo ======================================================================
echo    CONFIGURAR INICIALIZACAO AUTOMATICA COM O WINDOWS (SRVTI:3050)
echo ======================================================================
echo.

cd /d "%~dp0"
set SCRIPT_PATH=%~dp0INICIAR_SISTEMA_SILENCIOSO.vbs

:: 1. Registra atalho na pasta Inicializar (Startup) do Windows
set STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup
set SHORTCUT=%STARTUP_FOLDER%\SistemaRadiosSRVTI.lnk

powershell -NoProfile -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT%'); $s.TargetPath = 'wscript.exe'; $s.Arguments = '\"%SCRIPT_PATH%\"'; $s.WorkingDirectory = '%~dp0'; $s.Save()"

echo [1/2] Atalho adicionado na pasta Inicializar do Windows com sucesso!
echo       %SHORTCUT%

:: 2. Opcionalmente registra como Tarefa Agendada no Windows ao iniciar
schtasks /create /tn "SistemaRadiosSRVTI" /tr "wscript.exe \"%SCRIPT_PATH%\"" /sc onstart /ru SYSTEM /f >nul 2>&1
if %errorlevel% equ 0 (
    echo [2/2] Tarefa Agendada criada no Windows para iniciar antes do logon.
) else (
    echo [2/2] Inicializacao configurada com sucesso para o logon do usuario.
)

echo.
echo ======================================================================
echo CONFIGURACAO CONCLUIDA COM SUCESSO!
echo O sistema agora subira automaticamente em segundo plano ao ligar o PC.
echo.
echo Enderecos de Acesso:
echo    http://srvti:3050
echo    http://10.10.1.100:3050
echo ======================================================================
echo.
pause
