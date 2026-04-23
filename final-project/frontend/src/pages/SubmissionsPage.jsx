import { useState, useEffect } from 'react';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/submissions');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch submissions');
      }
      setSubmissions(data.data || []);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching submissions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', padding: '2rem 5%' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#007bff' }}>
          Submitted Forms
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '2rem' }}>
          View all submitted form entries stored in the database
        </p>

        {/* Refresh Button */}
        <button
          onClick={fetchSubmissions}
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '2rem',
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => { if (!loading) e.target.style.background = '#0056b3'; }}
          onMouseLeave={(e) => { if (!loading) e.target.style.background = '#007bff'; }}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>

        {/* Error Message */}
        {error && (
          <div style={{ background: '#dc3545', color: 'white', padding: '1rem', borderRadius: '4px', marginBottom: '2rem' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && submissions.length === 0 && !error && (
          <div style={{ background: '#111', padding: '3rem', borderRadius: '8px', border: '1px solid #222', textAlign: 'center', color: '#888' }}>
            <p style={{ fontSize: '1.2rem', margin: 0 }}>No submissions yet. Submit a form to see it here!</p>
          </div>
        )}

        {/* Submissions List */}
        {submissions.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {submissions.map((submission) => (
              <div key={submission.id} style={{ background: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ color: '#007bff', fontSize: '1.3rem', margin: '0 0 0.5rem 0' }}>{submission.fullName}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>ID: {submission.id}</p>
                </div>

                <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #222' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#007bff' }}>Email:</strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#ccc', wordBreak: 'break-all' }}>{submission.email}</p>
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#007bff' }}>Date of Birth:</strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#ccc' }}>{new Date(submission.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <strong style={{ color: '#007bff' }}>Submitted:</strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#888', fontSize: '0.9rem' }}>{new Date(submission.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #222', paddingTop: '1rem', color: '#888', fontSize: '0.85rem' }}>
                  Record #{submission.id}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && submissions.length > 0 && (
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#111', borderRadius: '8px', border: '1px solid #222', textAlign: 'center', color: '#888' }}>
            <strong style={{ color: '#007bff' }}>Total Submissions:</strong> {submissions.length}
          </div>
        )}
      </div>
    </div>
  );
}