
// JobModal shows detailed job info and proposal form in a modal overlay.
import { useEffect } from 'react';
import ProposalForm from './ProposalForm';

function JobModal({ selectedJob, onClose }) {

  useEffect(() => {
    // Listen for Escape key to allow keyboard users to close modal
    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    // Modal overlay closes on outside click
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal content stops propagation to prevent accidental close */}
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Job details for applicant review */}
        <h2>{selectedJob.title}</h2>
        <p>{selectedJob.description}</p>
        <p>Employer: {selectedJob.employer}</p>
        <p>Rating: {selectedJob.rating}</p>
        <p>Budget: KES {selectedJob.budget}</p>
        <p>Deadline: {selectedJob.deadline}</p>
        {/* ProposalForm is embedded for direct application */}
        <ProposalForm />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default JobModal;