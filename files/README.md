# Word Wizard - Vocabulary Builder for Kids 🌟

A colorful, interactive vocabulary building web application for children aged 3-11. Features word puzzles where kids fill in missing letters and learn meanings through engaging card-based interactions.

## Features

- 📚 Age-appropriate vocabulary (ages 3-11)
- 🎨 Multiple categories: Animals, Emotions, Food, Seasonal, Festival, Sight Words, Expressions, Figure of Speech, and more
- 🎮 Interactive card-flip mechanics to reveal answers
- 🎯 Filter by age level and category
- 📱 Fully responsive design
- 🚀 No backend required - runs entirely in the browser
- ✨ Beautiful, kid-friendly design with playful animations

## How It Works

Each word card shows:
- Only the first and last letter of the word
- Blank spaces for middle letters (represented as animated blocks)
- The word's meaning
- Age level indicator
- Category badge

Kids can click on cards to flip them and reveal the complete word!

## Project Structure

```
vocabulary-builder/
├── index.html              # Main application file (rename vocabulary-builder.html)
├── words.json             # Vocabulary data file
└── README.md              # This file
```

## Deployment to GitHub Pages

### Step 1: Prepare Your Files

1. Rename `vocabulary-builder.html` to `index.html`
2. Ensure `words.json` is in the same directory
3. Customize the vocabulary words in `words.json` as needed

### Step 2: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `vocabulary-builder` or `word-wizard`
3. Make it public (required for free GitHub Pages)

### Step 3: Upload Your Files

```bash
# Initialize git in your project folder
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit - Word Wizard app"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select `main` branch
5. Click **Save**
6. Your site will be published at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

It may take a few minutes for the site to go live!

## Customizing the Vocabulary

Edit the `words.json` file to add your own words. Each word entry should follow this structure:

```json
{
  "word": "example",
  "meaning": "A thing used to illustrate a point",
  "category": "Educational",
  "ageLevel": 8,
  "subcategory": "Learning"
}
```

### Fields Explained:

- **word**: The vocabulary word (lowercase recommended)
- **meaning**: Child-friendly definition
- **category**: Main category (e.g., "Animals", "Emotions", "Sight Words")
- **ageLevel**: Recommended age (3-11)
- **subcategory**: Optional sub-classification

### Recommended Categories:

- Animals
- Emotions  
- Food
- Nature
- Sight Words
- Seasonal
- Festival
- Expressions
- Figure of Speech
- Character Traits
- Weather

## Loading Words from JSON

The application is set up to load words from `words.json`. Make sure both files are in the same directory when deployed.

If you want to use a different JSON file location, update this line in `index.html`:

```javascript
// Around line 515 in the useEffect
fetch('words.json')  // Change to your JSON file path
    .then(response => response.json())
    .then(data => setWords(data))
    .catch(error => console.error('Error loading words:', error));
```

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tips for Parents and Teachers

1. **Start Simple**: Begin with age 3-4 words for young learners
2. **Category Focus**: Use category filters to focus on specific topics
3. **Progressive Learning**: Gradually increase age levels as children improve
4. **Make it Fun**: Encourage kids to guess before flipping the cards
5. **Regular Practice**: Short daily sessions work better than long infrequent ones

## Technical Details

- **Framework**: React 18 (loaded via CDN)
- **No Build Process**: Pure HTML/CSS/JavaScript
- **Styling**: Custom CSS with playful animations
- **Fonts**: Fredoka and Chewy from Google Fonts
- **Data Format**: JSON

## Future Enhancement Ideas

- Add progress tracking
- Include pronunciation audio
- Add example sentences
- Create quiz mode
- Track learned words
- Add parent dashboard
- Multiple language support
- Print-friendly flashcards

## License

Free to use and modify for educational purposes.

## Credits

Created with ❤️ for young learners everywhere!

---

**Questions or Issues?**

If you encounter any problems or have suggestions, feel free to open an issue on GitHub!
