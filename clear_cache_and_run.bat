@echo off
echo ========================================
echo Clearing Next.js Cache and Rebuilding
echo ========================================
echo.

cd /d "d:\Some stuffs\Incseption\Incseption\frontend"

echo Removing .next directory...
if exist ".next" (
    rmdir /s /q .next
    echo .next directory removed.
)

echo Removing out directory...
if exist "out" (
    rmdir /s /q out
    echo out directory removed.
)

echo Removing tsconfig.tsbuildinfo...
if exist "tsconfig.tsbuildinfo" (
    del tsconfig.tsbuildinfo
    echo tsconfig.tsbuildinfo removed.
)

echo.
echo Cache cleared! Starting dev server...
echo.
echo If you still see errors, try:
echo 1. Close all browser tabs for localhost:3000
echo 2. Clear browser cache (Ctrl+Shift+Delete)
echo 3. Hard refresh (Ctrl+Shift+R)
echo.

call npm run dev

pause
