@echo off
echo Removing empty backend directory and cleaning project...
echo.

cd /d "d:\Some stuffs\Incseption\Incseption"

:: Remove backend directory (it's empty)
if exist backend (
    echo Removing backend directory...
    rmdir /s /q backend
    echo Backend directory removed.
) else (
    echo Backend directory not found (already removed?)
)

:: Remove root node_modules if it exists
if exist node_modules (
    echo Removing root node_modules...
    rmdir /s /q node_modules
    echo Root node_modules removed.
)

:: Remove root package files (ffmpeg dependencies not needed)
if exist package.json (
    echo Removing root package.json (not needed for frontend-only)...
    del package.json
)

if exist package-lock.json (
    echo Removing root package-lock.json...
    del package-lock.json
)

echo.
echo ========================================
echo Project restructuring complete!
echo ========================================
echo.
echo Your project is now frontend-only.
echo.
echo To run the frontend:
echo   cd frontend
echo   npm install
echo   npm run dev
echo.
pause
