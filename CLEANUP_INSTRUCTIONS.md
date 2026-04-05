# Git History Cleanup Instructions

## Problem Summary
Your repository has been blocked by GitHub Push Protection due to:
1. **Secret Detected**: npm Access Token in `node_modules/@ffmpeg-installer/ffmpeg/.env`
2. **Large File**: `ffmpeg.exe` (61.47 MB) exceeds GitHub's 50MB recommendation
3. **Root Cause**: `node_modules/` was committed to git

## Solution: Clean Git History

### Step 1: Backup (Optional but Recommended)
```cmd
cd /d "d:\Some stuffs\Incseption\Incseption"
git branch backup-before-cleanup
```

### Step 2: Remove node_modules from Git History
Run this command to remove ALL node_modules from git history:

```cmd
git filter-branch --force --index-filter "git rm -rf --cached --ignore-unmatch node_modules/" --prune-empty --tag-name-filter cat -- --all
```

### Step 3: Clean Up Git References
```cmd
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### Step 4: Verify Cleanup
```cmd
git log --all --oneline --graph -10
git ls-files | findstr node_modules
```
The second command should return nothing (no node_modules files tracked).

### Step 5: Force Push to GitHub
```cmd
git push --force-with-lease origin main
```

**Note**: `--force-with-lease` is safer than `--force` as it checks if others have pushed changes.

## Alternative: If filter-branch Doesn't Work

If you get errors with filter-branch, use this alternative:

```cmd
# Install git-filter-repo (recommended modern tool)
pip install git-filter-repo

# Remove node_modules
git filter-repo --path node_modules --invert-paths --force
```

## After Cleanup Checklist

- [ ] Verify `node_modules/` is in `.gitignore`
- [ ] Delete local `node_modules/` and reinstall: `cd frontend && npm install`
- [ ] Test that frontend builds: `cd frontend && npm run build`
- [ ] Verify no sensitive files are tracked: `git ls-files`
- [ ] Push successfully to GitHub
- [ ] Check GitHub security alerts are cleared

## Preventing Future Issues

Your `.gitignore` already has `node_modules/`, but to be extra safe:

```gitignore
# Dependencies
node_modules/
frontend/node_modules/
backend/node_modules/

# Secrets
.env
.env.local
.env.*.local

# Build outputs
.next/
out/
dist/
build/

# Logs
*.log
npm-debug.log*
```

## If You Need to Start Fresh

If cleanup is too complex, you can:
1. Download all source code (excluding node_modules)
2. Delete the GitHub repository
3. Create a new repository
4. Push only source files (with proper .gitignore)

This avoids rewriting history.
