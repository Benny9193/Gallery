import { useState } from 'react';
import './UploadForm.css';

const UploadForm = ({ onUpload, onClose }) => {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    category: 'nature',
    tags: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPhoto = {
      url: formData.url,
      thumbnail: formData.url + '?w=400',
      title: formData.title,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      description: formData.description
    };

    onUpload(newPhoto);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="upload-overlay" onClick={onClose}>
      <div className="upload-form-container" onClick={(e) => e.stopPropagation()}>
        <button className="upload-close" onClick={onClose}>
          ✕
        </button>

        <h2>Upload New Photo</h2>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="url">Image URL *</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter photo title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="nature">Nature</option>
              <option value="urban">Urban</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="landscape, mountain, scenic"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter photo description"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Upload Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
