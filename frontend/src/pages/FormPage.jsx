import { useState } from 'react';
import { z } from 'zod';
import FormResponse from '../components/FormResponse';

// Validation schema using Zod
const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  dateOfBirth: z.string().min(1, 'Date is required'),
});

export default function FormPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setResponse(null);

    // Validate form data
    try {
      formSchema.parse(formData);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = {};
        err.errors.forEach(error => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
        return;
      }
    }

    // Submit to backend API
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      setResponse(data);
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        dateOfBirth: '',
      });
    } catch (error) {
      setSubmitError(error.message || 'An error occurred while submitting the form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', padding: '2rem 5%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#007bff' }}>Contact Form</h1>
        <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '2rem' }}>
          Get in touch with me by submitting this form
        </p>

        <form onSubmit={handleSubmit} style={{
          background: '#111',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #222',
        }}>
          {/* Full Name Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="fullName" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#fff',
            }}>
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: errors.fullName ? '2px solid #dc3545' : '1px solid #333',
                borderRadius: '4px',
                background: '#0a0a0a',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
            {errors.fullName && (
              <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#fff',
            }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: errors.email ? '2px solid #dc3545' : '1px solid #333',
                borderRadius: '4px',
                background: '#0a0a0a',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
            {errors.email && (
              <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Date Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="dateOfBirth" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#fff',
            }}>
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: errors.dateOfBirth ? '2px solid #dc3545' : '1px solid #333',
                borderRadius: '4px',
                background: '#0a0a0a',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
            {errors.dateOfBirth && (
              <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                {errors.dateOfBirth}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: loading ? '#666' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.background = '#0056b3';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.background = '#007bff';
            }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {/* Error message */}
        {submitError && (
          <div style={{
            background: '#dc3545',
            color: 'white',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '2rem',
          }}>
            <strong>Error:</strong> {submitError}
          </div>
        )}

        {/* Response display */}
        {response && <FormResponse data={response} />}
      </div>
    </div>
  );
}
