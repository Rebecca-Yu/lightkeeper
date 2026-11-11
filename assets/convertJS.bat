@echo off
title XLSX to JS Converter

powershell -ExecutionPolicy Bypass -File convertJS.ps1

echo.
echo ==========================
echo Conversion Complete
echo ==========================
pause