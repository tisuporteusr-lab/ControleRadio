' Script VBScript para iniciar o servidor de Radios 100% invisivel
Option Explicit
Dim WshShell, fso, currentDir, q, cmd

Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)

If Not fso.FolderExists(currentDir & "\logs") Then
    fso.CreateFolder(currentDir & "\logs")
End If

WshShell.CurrentDirectory = currentDir
WshShell.Environment("PROCESS")("PORT") = "3050"

q = Chr(34)
cmd = "cmd.exe /c npm run dev > " & q & currentDir & "\logs\servidor.log" & q & " 2>&1"
WshShell.Run cmd, 0, False
