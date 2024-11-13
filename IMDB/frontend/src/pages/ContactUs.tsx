import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/contactUs.css';
import Footer from '../components/Footer';

interface formFields {
  label: string;
  type: 'text' | 'select' | 'textarea';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

const formFields = {
  businessInfo: [
    { label: 'Company name', type: 'text', required: true },
    { label: 'Company website (optional)', type: 'text', placeholder: 'https://' },
    { label: 'Industry', type: 'select', options: ['Entertainment', 'Technology', 'Media', 'Other'] },
    { label: 'Country (optional)', type: 'text' },
    { label: 'Referral source (optional)', type: 'select', options: ['Google', 'Social Media', 'Email'] },
    { label: 'Additional information (optional)', type: 'textarea' }
  ],
  contactDetails: [
    { label: 'Contact name', type: 'text', required: true },
    { label: 'Phone number', type: 'text', placeholder: '(123) 456-7890' },
    { label: 'Email address', type: 'text', placeholder: 'your@email.com', required: true },
    { label: 'Preferred contact method (optional)', type: 'select', options: ['Phone', 'Email'] }
  ]
};

interface FormData {
  [key: string]: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div style={{backgroundColor:"white"}}>
    <div className="container">
      <h2 className="text-center mb-4">License IMDb Metadata</h2>
      <p className="text-center text-muted">
        Thank you for your interest in IMDb data; the premier source of global entertainment metadata and box revenue to power your customer’s experiences. Gain access to 10+ million titles, 14+ million cast and crew, global box office data, and 1.6+ billion ratings from the world’s largest entertainment fan community. Whether you are interested to learn more or ready to get started with integrating our data into your systems, we are eager to hear from you. Please complete the form below and we will reach out to you within two business days of your inquiry.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <h5 className="section-title">Tell us about your business</h5>
            {formFields.businessInfo.map((field, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={field.label} className="form-label">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    className="form-control"
                    id={field.label}
                    name={field.label}
                    value={formData[field.label] || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    className="form-control"
                    id={field.label}
                    name={field.label}
                    placeholder={field.placeholder}
                    value={formData[field.label] || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    id={field.label}
                    name={field.label}
                    placeholder={field.placeholder}
                    value={formData[field.label] || ''}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="col-md-6">
            <h5 className="section-title">Contact details</h5>
            {formFields.contactDetails.map((field, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={field.label} className="form-label">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    className="form-control"
                    id={field.label}
                    name={field.label}
                    value={formData[field.label] || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    id={field.label}
                    name={field.label}
                    placeholder={field.placeholder}
                    value={formData[field.label] || ''}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-4 mb-4">
          <button type="submit" className="btn btn-primary mx-2">Submit</button>
          <button type="button" className="btn btn-secondary mx-2">Cancel</button>
        </div>
      </form>
    </div>
    <Footer />

    </div>
  );
};

export default ContactUs;