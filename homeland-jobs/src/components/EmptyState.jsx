// Shows a friendly message when no jobs match filters
function EmptyState({ message }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
      <h2>No Results</h2>
      <p>{message || 'No jobs found.'}</p>
    </div>
  );
}

export default EmptyState;
