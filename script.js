// Gallery Application
class PhotoGallery {
    constructor() {
        this.images = [];
        this.currentImageIndex = 0;
        this.viewMode = 'grid';
        this.init();
    }

    init() {
        this.loadFromLocalStorage();
        this.setupEventListeners();
        this.renderGallery();
        this.updateEmptyState();
    }

    setupEventListeners() {
        // Image upload
        document.getElementById('imageUpload').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Clear all
        document.getElementById('clearAll').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all images?')) {
                this.clearAll();
            }
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.renderGallery(e.target.value);
        });

        // Sort
        document.getElementById('sortSelect').addEventListener('change', () => {
            this.renderGallery();
        });

        // View mode
        document.getElementById('gridView').addEventListener('click', () => {
            this.setViewMode('grid');
        });

        document.getElementById('listView').addEventListener('click', () => {
            this.setViewMode('list');
        });

        // Lightbox controls
        document.querySelector('.close').addEventListener('click', () => {
            this.closeLightbox();
        });

        document.querySelector('.prev').addEventListener('click', () => {
            this.navigateImage(-1);
        });

        document.querySelector('.next').addEventListener('click', () => {
            this.navigateImage(1);
        });

        // Close lightbox on background click
        document.getElementById('lightbox').addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') {
                this.closeLightbox();
            }
        });

        // Delete from lightbox
        document.getElementById('deleteImage').addEventListener('click', () => {
            this.deleteCurrentImage();
        });

        // Download from lightbox
        document.getElementById('downloadImage').addEventListener('click', () => {
            this.downloadCurrentImage();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('lightbox').classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.navigateImage(-1);
                if (e.key === 'ArrowRight') this.navigateImage(1);
                if (e.key === 'Delete') this.deleteCurrentImage();
            }
        });

        // Drag and drop
        const container = document.querySelector('.container');
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            container.style.opacity = '0.8';
        });

        container.addEventListener('dragleave', () => {
            container.style.opacity = '1';
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            container.style.opacity = '1';
            const files = Array.from(e.dataTransfer.files).filter(file => 
                file.type.startsWith('image/')
            );
            this.processFiles(files);
        });

        // Set initial view mode button state
        document.getElementById('gridView').classList.add('active');
    }

    handleImageUpload(event) {
        const files = Array.from(event.target.files);
        this.processFiles(files);
        event.target.value = ''; // Reset input
    }

    processFiles(files) {
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: e.target.result,
                    uploadDate: new Date().toISOString()
                };
                this.images.push(image);
                this.saveToLocalStorage();
                this.renderGallery();
                this.updateEmptyState();
            };
            reader.readAsDataURL(file);
        });
    }

    renderGallery(searchTerm = '') {
        const gallery = document.getElementById('gallery');
        const sortSelect = document.getElementById('sortSelect').value;
        
        // Filter images
        let filteredImages = this.images.filter(img => 
            img.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort images
        filteredImages = this.sortImages(filteredImages, sortSelect);

        // Clear gallery
        gallery.innerHTML = '';

        // Render images
        filteredImages.forEach((image, index) => {
            const item = this.createGalleryItem(image, index);
            gallery.appendChild(item);
        });

        this.updateEmptyState();
    }

    sortImages(images, sortType) {
        const sorted = [...images];
        
        switch(sortType) {
            case 'newest':
                return sorted.sort((a, b) => 
                    new Date(b.uploadDate) - new Date(a.uploadDate)
                );
            case 'oldest':
                return sorted.sort((a, b) => 
                    new Date(a.uploadDate) - new Date(b.uploadDate)
                );
            case 'name-asc':
                return sorted.sort((a, b) => 
                    a.name.localeCompare(b.name)
                );
            case 'name-desc':
                return sorted.sort((a, b) => 
                    b.name.localeCompare(a.name)
                );
            case 'size-desc':
                return sorted.sort((a, b) => b.size - a.size);
            case 'size-asc':
                return sorted.sort((a, b) => a.size - b.size);
            default:
                return sorted;
        }
    }

    createGalleryItem(image, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.onclick = () => this.openLightbox(index);

        const img = document.createElement('img');
        img.src = image.data;
        img.alt = image.name;
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';
        
        const title = document.createElement('h4');
        title.textContent = image.name;
        
        const details = document.createElement('p');
        details.textContent = `${this.formatFileSize(image.size)} • ${this.formatDate(image.uploadDate)}`;

        overlay.appendChild(title);
        overlay.appendChild(details);
        
        item.appendChild(img);
        item.appendChild(overlay);

        return item;
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        const image = this.images[index];
        
        document.getElementById('lightboxImage').src = image.data;
        document.getElementById('imageName').textContent = image.name;
        document.getElementById('imageDetails').textContent = 
            `${this.formatFileSize(image.size)} • Uploaded ${this.formatDate(image.uploadDate)}`;
        
        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    navigateImage(direction) {
        this.currentImageIndex += direction;
        
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.images.length - 1;
        } else if (this.currentImageIndex >= this.images.length) {
            this.currentImageIndex = 0;
        }
        
        this.openLightbox(this.currentImageIndex);
    }

    deleteCurrentImage() {
        if (confirm('Are you sure you want to delete this image?')) {
            this.images.splice(this.currentImageIndex, 1);
            this.saveToLocalStorage();
            this.closeLightbox();
            this.renderGallery();
            this.updateEmptyState();
        }
    }

    downloadCurrentImage() {
        const image = this.images[this.currentImageIndex];
        const link = document.createElement('a');
        link.href = image.data;
        link.download = image.name;
        link.click();
    }

    clearAll() {
        this.images = [];
        this.saveToLocalStorage();
        this.renderGallery();
        this.updateEmptyState();
    }

    setViewMode(mode) {
        this.viewMode = mode;
        const gallery = document.getElementById('gallery');
        
        if (mode === 'list') {
            gallery.classList.add('list-view');
            document.getElementById('listView').classList.add('active');
            document.getElementById('gridView').classList.remove('active');
        } else {
            gallery.classList.remove('list-view');
            document.getElementById('gridView').classList.add('active');
            document.getElementById('listView').classList.remove('active');
        }
    }

    updateEmptyState() {
        const emptyState = document.getElementById('emptyState');
        const gallery = document.getElementById('gallery');
        
        if (this.images.length === 0) {
            emptyState.classList.add('visible');
            gallery.style.display = 'none';
        } else {
            emptyState.classList.remove('visible');
            gallery.style.display = 'grid';
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'just now';
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString();
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('galleryImages', JSON.stringify(this.images));
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('Storage limit exceeded! Please delete some images.');
            }
        }
    }

    loadFromLocalStorage() {
        try {
            const stored = localStorage.getItem('galleryImages');
            if (stored) {
                this.images = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Error loading from localStorage:', e);
        }
    }
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhotoGallery();
});
