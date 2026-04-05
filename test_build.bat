@echo off
echo ========================================
echo Testing Next.js Build
echo ========================================
echo.

cd /d "d:\Some stuffs\Incseption\Incseption\frontend"

echo Checking for node_modules...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed!
        pause
        exit /b 1
    )
)

echo.
echo Testing development server...
echo Press Ctrl+C to stop the server when you verify it works.
echo.
echo Starting dev server on http://localhost:3000
echo.

call npm run dev

pause
