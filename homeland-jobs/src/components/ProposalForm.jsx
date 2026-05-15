// ProposalForm handles user input, validation, and submission for job proposals.
import { useState } from 'react';

function ProposalForm() {


  // Local state for form fields
  const [formData, setFormData] = useState({
    coverLetter: '',
    budget: '',
    timeline: '',
    portfolio: ''
  });


  // Tracks validation errors for each field
  const [errors, setErrors] = useState({});


  // Shows confirmation after successful submission
  const [success, setSuccess] = useState(false);


  // Validates all required fields and returns error messages
  function validate() {
    const newErrors = {};
    if (formData.coverLetter.length < 100) {
      newErrors.coverLetter = 'Minimum 100 characters required';
    }
    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    }
    if (!formData.timeline) {
      newErrors.timeline = 'Timeline is required';
    }
    return newErrors;
  }


  // Handles form submission, validates, and shows confirmation if valid
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return <p>Proposal submitted successfully!</p>;
  }

  return (

    <form onSubmit={handleSubmit}>

      <label>
        Cover Letter
      </label>

      <textarea
        value={formData.coverLetter}
        onChange={(e) =>
          setFormData({
            ...formData,
            coverLetter: e.target.value
          })
        }
      />

      {
        errors.coverLetter && (
          <p>{errors.coverLetter}</p>
        )
      }

      <label>
        Proposed Budget
      </label>

      <input
        type="number"
        value={formData.budget}
        onChange={(e) =>
          setFormData({
            ...formData,
            budget: e.target.value
          })
        }
      />

      {
        errors.budget && (
          <p>{errors.budget}</p>
        )
      }

      <label>
        Timeline in Days
      </label>

      <input
        type="number"
        value={formData.timeline}
        onChange={(e) =>
          setFormData({
            ...formData,
            timeline: e.target.value
          })
        }
      />

      {
        errors.timeline && (
          <p>{errors.timeline}</p>
        )
      }

      <label>
        Portfolio URL
      </label>

      <input
        type="url"
        value={formData.portfolio}
        onChange={(e) =>
          setFormData({
            ...formData,
            portfolio: e.target.value
          })
        }
      />

      <button type="submit">Submit Proposal</button>
    </form>
  );
}

export default ProposalForm;