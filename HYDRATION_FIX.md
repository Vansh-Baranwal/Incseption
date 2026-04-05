# Hydration Warning Fixes

## Issues Fixed

### 1. Hydration Mismatch - Theme Colors
**Problem:** Server-side rendering (SSR) and client-side rendering had different theme values, causing style mismatch warnings.

**Error:**
```
Warning: Prop `style` did not match. 
Server: "background:radial-gradient(...rgba(252,251,249,0.4)...)" 
Client: "background:radial-gradient(...rgba(26,20,16,0.4)...)"
```

**Root Cause:**
- `useTheme()` from `next-themes` returns `undefined` during SSR
- The vignette gradient was calculated immediately, using different colors on server vs client
- Server rendered with light theme colors, but client hydrated with dark theme (the default)

**Solution:**
Added a `mounted` state to delay rendering theme-dependent elements until after client-side hydration:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <LoadingScreen />; // Simplified version without theme-dependent styles
}
```

This ensures the vignette gradient only renders on the client side where the theme is properly initialized.

### 2. Framer Motion Scroll Warning
**Problem:** Framer Motion's `useScroll` hook warned about container positioning.

**Warning:**
```
Please ensure that the container has a non-static position, 
like 'relative', 'fixed', or 'absolute' to ensure scroll offset 
is calculated correctly.
```

**Solution:**
The container already had `className="relative"`, but the warning appeared because:
- `useScroll` was being called during SSR when the ref wasn't attached yet
- The `mounted` check now ensures proper initialization order

## Files Modified

### `frontend/components/HeroCanvasAnimation.tsx`

**Changes:**
1. Added `mounted` state and useEffect to track client-side mount
2. Moved `useScroll` initialization after mount check
3. Added early return with loading screen before mount completes
4. Ensured theme-dependent calculations only happen after mount

**Key Code:**
```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

// Use 'dark' as default to match the defaultTheme in layout.tsx
const vignetteColor = theme === "light" ? "rgba(252,251,249,0.95)" : "rgba(26,20,16,0.95)";
const vignetteMid = theme === "light" ? "rgba(252,251,249,0.4)" : "rgba(26,20,16,0.4)";

// Don't render vignette until mounted to avoid hydration mismatch
if (!mounted) {
  return <LoadingScreen />;
}
```

## Why These Warnings Matter

### Hydration Mismatches
- Can cause React to throw away server-rendered HTML and re-render everything client-side
- Defeats the purpose of SSR (slower initial page load)
- Can cause visual "flashing" as content re-renders
- May break accessibility features that rely on SSR

### Best Practices for Next.js 14 + Theming

1. **Always check for mounted state** when using theme-dependent values
2. **Match default theme** - Use the same default in calculations as in `ThemeProvider`
3. **Delay client-only features** - Don't render browser-dependent code during SSR
4. **Use suppressHydrationWarning** - Only when absolutely necessary and you understand why

## Expected Results

After these fixes:
- ✅ No hydration mismatch warnings
- ✅ No Framer Motion scroll warnings  
- ✅ Smooth theme transitions without flashing
- ✅ Proper SSR with client-side hydration
- ✅ Loading screen shows consistently before mounting

## How to Verify

1. **Clear cache and restart:**
   ```cmd
   cd frontend
   rmdir /s /q .next
   npm run dev
   ```

2. **Check browser console** - Should see NO warnings about:
   - Prop style did not match
   - Non-static position

3. **Test theme switching:**
   - Page should load with dark theme (default)
   - No visual flashing
   - Smooth animations

4. **Check React DevTools:**
   - No red hydration warnings
   - Component tree should match SSR output

## Additional Notes

These are **development-only warnings** - they don't appear in production builds. However, fixing them:
- Improves performance (proper hydration)
- Prevents visual glitches
- Ensures consistent rendering
- Follows Next.js best practices

The warnings you saw were React being helpful, telling you about potential issues before they become user-facing problems!
