@echo off
echo Copying Government of India logo...
copy "c:\Users\vansh\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\copilot-cli-images\1775447646722-yqw5v5zg.png" "d:\Some stuffs\Incseption\Incseption\frontend\public\govt-logo.png"
if %errorlevel% == 0 (
    echo Logo copied successfully!
) else (
    echo Error copying logo. Please copy manually.
)
pause
