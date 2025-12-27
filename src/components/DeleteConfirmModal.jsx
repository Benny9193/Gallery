import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({ isOpen, onConfirm, onCancel, photoTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onCancel}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="delete-modal-close" onClick={onCancel}>
          ✕
        </button>

        <h2>Delete Photo?</h2>
        <p>
          Are you sure you want to delete <strong>"{photoTitle}"</strong>?
          <br />
          This action cannot be undone.
        </p>

        <div className="delete-modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
