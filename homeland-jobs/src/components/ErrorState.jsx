// Shows an error message and a retry button on API failure
function ErrorState({ onRetry }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#b00020' }}>
      <h2>Something went wrong</h2>
      <p>We couldn\'t load jobs. Please try again.</p>
      <button onClick={onRetry} style={{ marginTop: 16, padding: '0.5rem 1.5rem', borderRadius: 6, background: '#aa3bff', color: '#fff', border: 'none', fontWeight: 600 }}>
        Retry
      </button>
    </div>
  );
}

export default ErrorState;
