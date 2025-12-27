# 📸 Photo Gallery

A beautiful, feature-rich, and responsive photo gallery web application built with vanilla JavaScript, HTML, and CSS.

## ✨ Features

### Core Functionality
- **📁 Image Upload**: Upload multiple images at once via file picker or drag-and-drop
- **🖼️ Responsive Grid Layout**: Automatically adjusts to different screen sizes
- **🔍 Real-time Search**: Filter images by filename instantly
- **🔄 Multiple Sort Options**:
  - Newest First / Oldest First
  - Name (A-Z / Z-A)
  - File Size (Largest / Smallest)
- **👁️ View Modes**: Switch between Grid and List views
- **💾 Persistent Storage**: Images saved in browser's localStorage

### Image Viewing
- **🌟 Lightbox Modal**: Full-screen image viewer with elegant overlay
- **⌨️ Keyboard Navigation**: 
  - Arrow keys to navigate between images
  - ESC to close lightbox
  - Delete key to remove current image
- **🔄 Image Navigation**: Next/Previous buttons for easy browsing
- **📊 Image Details**: View filename, size, and upload time

### Image Management
- **🗑️ Delete Images**: Remove individual images or clear entire gallery
- **💾 Download Images**: Save images directly from the lightbox
- **📱 Drag & Drop**: Simply drag images from your file explorer
- **⚡ Lazy Loading**: Optimized performance for large galleries

### User Interface
- **🎨 Modern Design**: Beautiful gradient theme with smooth animations
- **📱 Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **✨ Smooth Transitions**: Polished hover effects and animations
- **🎯 Empty State**: Helpful guidance when gallery is empty

## 🚀 Getting Started

### Quick Start
1. Clone this repository or download the files
2. Open `index.html` in your web browser
3. Start uploading images!

### Usage

#### Uploading Images
- **Method 1**: Click the "Upload Images" button and select files
- **Method 2**: Drag and drop images directly onto the page
- Supports: JPG, PNG, GIF, WEBP, and other image formats

#### Viewing Images
- Click any image thumbnail to open it in full-screen lightbox
- Use arrow buttons or keyboard arrows to navigate
- View image details including filename, size, and upload date

#### Managing Images
- **Search**: Type in the search box to filter images by name
- **Sort**: Use the dropdown to organize images by date, name, or size
- **Delete**: 
  - Click delete in lightbox to remove current image
  - Use "Clear All" button to remove all images
- **Download**: Click download button in lightbox to save image

#### View Modes
- **Grid View**: Default card-based layout
- **List View**: Compact list with larger preview

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **Vanilla JavaScript**: No frameworks or dependencies
- **LocalStorage API**: Client-side data persistence

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

### File Structure
```
Gallery/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── script.js       # Gallery functionality and logic
└── README.md       # Documentation
```

## 📝 Features Breakdown

### JavaScript Functionality
The gallery is powered by a `PhotoGallery` class that manages:
- Image data storage and retrieval
- Event handling for all interactions
- Dynamic DOM manipulation
- LocalStorage persistence
- File reading and processing
- Sorting and filtering algorithms

### CSS Features
- CSS Grid for responsive layouts
- Flexbox for component alignment
- CSS animations and transitions
- Media queries for mobile responsiveness
- Custom scrollbar styling
- Gradient backgrounds

### Key Components
1. **Gallery Grid**: Dynamic image grid with hover effects
2. **Lightbox Modal**: Full-screen image viewer
3. **Control Panel**: Upload, search, sort, and view controls
4. **Empty State**: User-friendly placeholder when no images exist

## 🔒 Privacy & Storage

- All images are stored locally in your browser's localStorage
- No data is sent to any server
- Images persist between sessions
- Clear browser data to remove all images
- Storage limit depends on browser (typically 5-10MB)

## 🎯 Use Cases

- Personal photo collections
- Portfolio showcases
- Event photo galleries
- Product image libraries
- Image organization and management
- Quick photo browsing and sorting

## 🚀 Future Enhancements

Potential features for future versions:
- Image editing capabilities (crop, rotate, filters)
- Tagging and categorization
- Bulk operations (select multiple)
- Export/import gallery data
- Cloud storage integration
- Image metadata (EXIF) display
- Slideshow mode
- Sharing capabilities

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📧 Support

For issues or questions, please open an issue on the repository.

---

**Enjoy your photo gallery!** 📸✨