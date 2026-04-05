# Syntax Error Fix - "Invalid or unexpected token"

## Problem
You encountered this error:
```
layout.js:93 Uncaught SyntaxError: Invalid or unexpected token
```

## Root Causes Fixed

### 1. Special Character Encoding (Em Dash)
**Problem:** The title in `layout.tsx` used an em dash (—) character that may cause encoding issues when compiled to JavaScript.

**Before:**
```tsx
title: "Objection.ai — Legal Document Security"
```

**After:**
```tsx
title: "Objection.ai - Legal Document Security"
```

### 2. Missing Image File
**Problem:** CustomCursor was referencing `/gavel.png` which doesn't exist (only `/gavel.svg` exists).

**Before:**
```tsx
<CustomCursor imageUrl="/gavel.png" />
```

**After:**
```tsx
<CustomCursor imageUrl="/gavel.svg" />
```

### 3. Build Cache Issues
Sometimes Next.js cache can cause stale JavaScript to be served with old syntax errors.

## How to Fix

### Quick Fix - Clear Cache and Restart

**Option 1: Use the automated script**
```cmd
cd /d "d:\Some stuffs\Incseption\Incseption"
clear_cache_and_run.bat
```

**Option 2: Manual commands**
```cmd
cd /d "d:\Some stuffs\Incseption\Incseption\frontend"

# Remove build artifacts
rmdir /s /q .next
rmdir /s /q out
del tsconfig.tsbuildinfo

# Restart dev server
npm run dev
```

### After Restarting

1. **Close all browser tabs** for localhost:3000
2. **Clear browser cache**: 
   - Press `Ctrl+Shift+Delete`
   - Select "Cached images and files"
   - Click "Clear data"
3. **Open a new tab** and go to http://localhost:3000
4. **Hard refresh**: Press `Ctrl+Shift+R`

## Why This Happened

### Character Encoding Issues
- Next.js compiles TypeScript to JavaScript
- Some special Unicode characters (like em dash —) can cause issues depending on:
  - File encoding (UTF-8 vs UTF-16)
  - Build process
  - How the compiled JS is served
- Using ASCII-safe characters (like hyphen -) prevents these issues

### File Reference Errors
- Missing images can cause runtime errors
- The component had fallback logic but during initial load it could fail

## Files Changed

1. **`frontend/app/layout.tsx`**
   - Changed em dash (—) to hyphen (-)
   - Changed gavel.png to gavel.svg

2. **`clear_cache_and_run.bat`** (NEW)
   - Automated cache clearing script

## Verification Steps

After clearing cache and restarting:

✅ **Expected Results:**
- No syntax errors in console
- Page loads without errors
- Custom cursor (gavel) appears on desktop
- Animated background visible
- No 404 errors for missing images

❌ **If Still Seeing Errors:**
1. Check the browser console for the exact error
2. Verify you cleared browser cache (not just refresh)
3. Try in incognito/private browsing mode
4. Ensure all files are saved
5. Check that node_modules is properly installed: `npm install`

## Prevention

To avoid similar issues in the future:

1. **Use ASCII characters** in code when possible
2. **Always verify file paths** - especially for public assets
3. **Clear build cache** when you see strange compile errors
4. **Use proper UTF-8 encoding** for all source files

## Additional Notes

The original error "layout.js:93" referred to line 93 of the **compiled** JavaScript, not your source TypeScript file. Next.js transforms your .tsx files into .js during the build process, and the error was in that compiled output.

By fixing the source .tsx file and clearing the cache, the compiled JavaScript will be regenerated without the syntax error.
