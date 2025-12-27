# Photo Gallery

A modern, responsive photo gallery built with React and Vite featuring advanced search, filtering, lightbox viewing, and upload capabilities.

## Features

### Grid Layout
- Responsive grid layout that adapts to different screen sizes
- Smooth hover effects with overlay information
- Lazy loading for optimized performance

### Lightbox/Modal View
- Click any photo to view full-size in an elegant lightbox
- Navigate between photos using arrow buttons or keyboard shortcuts
- Display photo metadata including title, description, and tags
- Press ESC to close the lightbox

### Upload Functionality
- Upload new photos via a user-friendly form
- Add custom metadata: title, category, tags, and description
- Instantly see uploaded photos in the gallery

### Search & Filter
- Real-time search across photo titles, tags, and descriptions
- Filter photos by category (All, Nature, Urban, Lifestyle)
- Visual feedback for active filters
- Photo count indicator

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar.jsx   # Search and category filter component
│   ├── PhotoGrid.jsx   # Grid layout for photos
│   ├── Lightbox.jsx    # Full-screen photo viewer
│   └── UploadForm.jsx  # Photo upload form
├── hooks/              # Custom React hooks
│   └── useGallery.js   # Gallery state management hook
├── data/               # Sample data
│   └── samplePhotos.js # Sample photo data and categories
├── utils/              # Utility functions (ready for expansion)
├── App.jsx             # Main application component
├── App.css             # Application styles
├── index.css           # Global styles
└── main.jsx            # Application entry point
```

## Key Technologies

- **React** - UI library for building component-based interfaces
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with animations and transitions
- **JavaScript (ES6+)** - Modern JavaScript features

## Keyboard Shortcuts

When lightbox is open:
- `←` - Previous photo
- `→` - Next photo
- `ESC` - Close lightbox

## Customization

### Adding Your Own Photos

Edit [src/data/samplePhotos.js](src/data/samplePhotos.js) to add your own photos:

```javascript
{
  id: 9,
  url: 'https://example.com/photo.jpg',
  thumbnail: 'https://example.com/photo-thumb.jpg',
  title: 'Photo Title',
  category: 'nature', // or 'urban', 'lifestyle'
  tags: ['tag1', 'tag2'],
  description: 'Photo description'
}
```

### Adding New Categories

Update the `categories` array in [src/data/samplePhotos.js](src/data/samplePhotos.js):

```javascript
export const categories = ['all', 'nature', 'urban', 'lifestyle', 'your-category'];
```

Then update the category select options in [src/components/UploadForm.jsx](src/components/UploadForm.jsx).

## Future Enhancements

- Persistent storage (localStorage or backend integration)
- Drag-and-drop file upload
- Photo editing capabilities
- Social sharing features
- User authentication
- Favorites/collections
- Masonry layout option
- Infinite scroll pagination

## License

MIT
