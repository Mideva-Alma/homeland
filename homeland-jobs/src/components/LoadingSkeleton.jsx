// Shows a loading skeleton while jobs are being fetched
function LoadingSkeleton() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div className="skeleton-header" style={{ height: 40, width: 200, background: '#eee', margin: '0 auto 1rem', borderRadius: 8 }} />
      <div className="skeleton-list">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-card" style={{ height: 120, width: 320, background: '#f4f3ec', margin: '1rem auto', borderRadius: 12 }} />
        ))}
      </div>
      <p style={{ color: '#aaa', marginTop: 24 }}>Loading jobs...</p>
    </div>
  );
}

export default LoadingSkeleton;
