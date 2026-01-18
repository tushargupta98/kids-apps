# Quick Deployment Checklist ✅

## Pre-Deployment

- [ ] Rename `vocabulary-builder.html` to `index.html`
- [ ] Customize words in `words.json` (or use the sample data)
- [ ] Test locally by opening `index.html` in a browser

## GitHub Pages Deployment

### Option 1: Web Upload (Easiest)

1. Create new repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop `index.html` and `words.json`
4. Commit the files
5. Go to Settings → Pages
6. Select `main` branch as source
7. Save and wait 1-2 minutes
8. Visit: `https://YOUR_USERNAME.github.io/REPO_NAME/`

### Option 2: Git Command Line

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main

# Then enable Pages in repository settings
```

## File Organization

Your repository should contain:
```
repository-root/
├── index.html        (renamed from vocabulary-builder.html)
└── words.json
```

## Testing Locally

Simply open `index.html` in any modern browser. 

**Note**: Some browsers may block loading `words.json` locally due to CORS. If this happens:
- Use the sample data (already embedded)
- Or run a local server:
  ```bash
  python -m http.server 8000
  # Then visit: http://localhost:8000
  ```

## Updating Content

To add/edit words:
1. Edit `words.json`
2. Commit and push changes
3. GitHub Pages will auto-update (may take 1-2 minutes)

## Common Issues

**Problem**: Cards show sample data, not my JSON words
**Solution**: Check browser console (F12) for errors. Ensure `words.json` is in same directory as `index.html`

**Problem**: GitHub Pages shows 404
**Solution**: Wait 2-5 minutes after enabling Pages. Clear browser cache.

**Problem**: Changes not appearing
**Solution**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R). Check if files committed to GitHub.

## Next Steps

After deployment:
1. Share the link with kids/parents/teachers
2. Collect feedback on vocabulary difficulty
3. Add more words to `words.json`
4. Monitor which categories are most popular
5. Consider adding new features (see README for ideas)

---

Need help? Check the full README.md for detailed instructions!
