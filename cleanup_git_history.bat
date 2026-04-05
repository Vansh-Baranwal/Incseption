@echo off
echo ========================================
echo Git History Cleanup Script
echo ========================================
echo.
echo This will remove node_modules from git history
echo and clean up the exposed npm token.
echo.
echo WARNING: This rewrites git history!
echo Make sure you have a backup or are ready to proceed.
echo.
pause

cd /d "d:\Some stuffs\Incseption\Incseption"

echo.
echo Creating backup branch...
git branch backup-before-cleanup

echo.
echo Step 1: Removing node_modules from git history...
git filter-branch --force --index-filter "git rm -rf --cached --ignore-unmatch node_modules/" --prune-empty --tag-name-filter cat -- --all

if errorlevel 1 (
    echo ERROR: filter-branch failed!
    echo Try running the commands manually from CLEANUP_INSTRUCTIONS.md
    pause
    exit /b 1
)

echo.
echo Step 2: Cleaning up references...
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo.
echo Step 3: Verifying cleanup...
echo Checking if node_modules is still tracked:
git ls-files | findstr node_modules

echo.
echo ========================================
echo Cleanup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Review the output above
echo 2. Run: git push --force-with-lease origin main
echo 3. Check GitHub to verify the push succeeds
echo.
pause
