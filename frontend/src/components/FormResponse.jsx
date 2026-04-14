export default function FormResponse({ data }) {
  // Handle both old httpbin format and new backend API format
  const isNewFormat = data.success !== undefined;
  
  if (isNewFormat) {
    // New backend API format
    return (
      <div style={{
        background: '#111',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #222',
        marginTop: '2rem',
      }}>
        <h2 style={{ color: '#28a745', marginTop: 0, marginBottom: '1.5rem' }}>
          {data.success ? '✓ Form Submitted Successfully!' : '✗ Submission Failed'}
        </h2>

        {/* Message */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#007bff', fontSize: '1.3rem', marginBottom: '1rem' }}>Message:</h3>
          <div style={{
            background: '#0a0a0a',
            padding: '1rem',
            borderRadius: '4px',
            border: '1px solid #222',
            color: data.success ? '#28a745' : '#dc3545',
            fontWeight: 'bold',
          }}>
            {data.message}
          </div>
        </div>

        {/* Submitted Data */}
        {data.data && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#007bff', fontSize: '1.3rem', marginBottom: '1rem' }}>Stored Data:</h3>
            <div style={{
              background: '#0a0a0a',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid #222',
              overflowX: 'auto',
            }}>
              <pre style={{
                margin: 0,
                color: '#ccc',
                fontSize: '0.95rem',
                fontFamily: "'Courier New', monospace",
              }}>
                {JSON.stringify(data.data, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Response Details */}
        <div>
          <h3 style={{ color: '#007bff', fontSize: '1.3rem', marginBottom: '1rem' }}>Response Details:</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem',
          }}>
            {data.id && (
              <div style={{
                background: '#0a0a0a',
                padding: '1rem',
                borderRadius: '4px',
                border: '1px solid #222',
              }}>
                <strong style={{ color: '#007bff' }}>Database ID:</strong>
                <p style={{ margin: '0.5rem 0 0', color: '#ccc' }}>
                  {data.id}
                </p>
              </div>
            )}

            <div style={{
              background: '#0a0a0a',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid #222',
            }}>
              <strong style={{ color: '#007bff' }}>Status:</strong>
              <p style={{ margin: '0.5rem 0 0', color: data.success ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                {data.success ? '✓ Success' : '✗ Error'}
              </p>
            </div>

            {data.data?.createdAt && (
              <div style={{
                background: '#0a0a0a',
                padding: '1rem',
                borderRadius: '4px',
                border: '1px solid #222',
              }}>
                <strong style={{ color: '#007bff' }}>Timestamp:</strong>
                <p style={{ margin: '0.5rem 0 0', color: '#ccc', fontSize: '0.9rem' }}>
                  {new Date(data.data.createdAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Old httpbin format (fallback)
  return (
    <div style={{
      background: '#111',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #222',
      marginTop: '2rem',
    }}>
      <h2 style={{ color: '#28a745', marginTop: 0, marginBottom: '1.5rem' }}>✓ Form Submitted Successfully!</h2>

      {/* Sent Data Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#007bff', fontSize: '1.3rem', marginBottom: '1rem' }}>Data Sent:</h3>
        <div style={{
          background: '#0a0a0a',
          padding: '1rem',
          borderRadius: '4px',
          border: '1px solid #222',
          overflowX: 'auto',
        }}>
          <pre style={{
            margin: 0,
            color: '#ccc',
            fontSize: '0.95rem',
            fontFamily: "'Courier New', monospace",
          }}>
            {JSON.stringify(JSON.parse(data.data), null, 2)}
          </pre>
        </div>
      </div>

      {/* Server Response Section */}
      <div>
        <h3 style={{ color: '#007bff', fontSize: '1.3rem', marginBottom: '1rem' }}>Server Response:</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem',
        }}>
          <div style={{
            background: '#0a0a0a',
            padding: '1rem',
            borderRadius: '4px',
            border: '1px solid #222',
          }}>
            <strong style={{ color: '#007bff' }}>URL:</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#ccc', fontSize: '0.9rem', wordBreak: 'break-all' }}>
              {data.url}
            </p>
          </div>

          <div style={{
            background: '#0a0a0a',
            padding: '1rem',
            borderRadius: '4px',
            border: '1px solid #222',
          }}>
            <strong style={{ color: '#007bff' }}>Method:</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#ccc' }}>
              {data.method}
            </p>
          </div>

          <div style={{
            background: '#0a0a0a',
            padding: '1rem',
            borderRadius: '4px',
            border: '1px solid #222',
          }}>
            <strong style={{ color: '#007bff' }}>Status Code:</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#28a745', fontWeight: 'bold' }}>
              200 OK
            </p>
          </div>
        </div>

        {/* Full JSON Response */}
        <div style={{
          background: '#0a0a0a',
          padding: '1rem',
          borderRadius: '4px',
          border: '1px solid #222',
          overflowX: 'auto',
          marginTop: '1rem',
        }}>
          <strong style={{ color: '#007bff', display: 'block', marginBottom: '0.5rem' }}>Full Response JSON:</strong>
          <pre style={{
            margin: 0,
            color: '#ccc',
            fontSize: '0.85rem',
            fontFamily: "'Courier New', monospace",
            maxHeight: '400px',
            overflowY: 'auto',
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>

      {/* Note */}
      <p style={{
        color: '#888',
        fontSize: '0.9rem',
        marginTop: '1.5rem',
        fontStyle: 'italic',
      }}>
        This response is from httpbin.org, a free HTTP request and response service.
      </p>
    </div>
  );
}
