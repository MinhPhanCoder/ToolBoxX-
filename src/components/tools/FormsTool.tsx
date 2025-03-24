import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FileTextIcon, PlusIcon, CheckIcon } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
interface FormTemplate {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
}
interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select fields
}
const FormsTool: React.FC = () => {
  const {
    t
  } = useLanguage();
  const [activeTab, setActiveTab] = useState<'templates' | 'create' | 'submissions'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const formTemplates: FormTemplate[] = [{
    id: 'contact',
    name: 'Contact Form',
    description: 'Basic contact form with name, email, and message fields',
    fields: [{
      id: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your full name',
      required: true
    }, {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email address',
      required: true
    }, {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Enter your message',
      required: true
    }]
  }, {
    id: 'feedback',
    name: 'Feedback Form',
    description: 'Collect user feedback about your services',
    fields: [{
      id: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your name',
      required: false
    }, {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email address',
      required: false
    }, {
      id: 'rating',
      type: 'select',
      label: 'Rating',
      required: true,
      options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor']
    }, {
      id: 'comments',
      type: 'textarea',
      label: 'Comments',
      placeholder: 'Please share your feedback',
      required: true
    }]
  }, {
    id: 'survey',
    name: 'Customer Survey',
    description: 'Comprehensive customer satisfaction survey',
    fields: [{
      id: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true
    }, {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email address',
      required: true
    }, {
      id: 'age',
      type: 'number',
      label: 'Age',
      placeholder: 'Enter your age',
      required: false
    }, {
      id: 'purchase_date',
      type: 'date',
      label: 'Purchase Date',
      required: true
    }, {
      id: 'product',
      type: 'select',
      label: 'Product Purchased',
      required: true,
      options: ['Product A', 'Product B', 'Product C', 'Product D']
    }, {
      id: 'satisfaction',
      type: 'select',
      label: 'Satisfaction Level',
      required: true,
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied']
    }, {
      id: 'comments',
      type: 'textarea',
      label: 'Additional Comments',
      placeholder: 'Please share any additional feedback',
      required: false
    }]
  }];
  const handleSelectTemplate = (template: FormTemplate) => {
    setSelectedTemplate(template);
    setActiveTab('create');
    setSubmitted(false);
  };
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const renderTemplatesList = () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {formTemplates.map(template => <div key={template.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-sm cursor-pointer transition-colors" onClick={() => handleSelectTemplate(template)}>
          <h3 className="font-medium text-gray-900 dark:text-white mb-1">
            {template.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {template.description}
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {template.fields.length} fields
          </div>
        </div>)}
    </div>;
  const renderFormBuilder = () => {
    if (!selectedTemplate) return null;
    if (submitted) {
      return <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Form Submitted Successfully!
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Thank you for your submission. We'll process your information
            shortly.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => setActiveTab('templates')}>
              Back to Templates
            </Button>
            <Button onClick={() => {
            setSubmitted(false);
          }}>
              Submit Another Response
            </Button>
          </div>
        </div>;
    }
    return <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {selectedTemplate.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedTemplate.description}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setActiveTab('templates')}>
            Back to Templates
          </Button>
        </div>
        <form onSubmit={handleSubmitForm} className="space-y-6">
          {selectedTemplate.fields.map(field => <div key={field.id}>
              {field.type === 'select' ? <div>
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {field.label}{' '}
                    {field.required && <span className="text-red-500 dark:text-red-400">*</span>}
                  </label>
                  <select id={field.id} name={field.id} required={field.required} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm rounded-md transition-colors">
                    <option value="">Select an option</option>
                    {field.options?.map(option => <option key={option} value={option}>
                        {option}
                      </option>)}
                  </select>
                </div> : field.type === 'textarea' ? <div>
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {field.label}{' '}
                    {field.required && <span className="text-red-500 dark:text-red-400">*</span>}
                  </label>
                  <textarea id={field.id} name={field.id} rows={4} className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm transition-colors" placeholder={field.placeholder} required={field.required} />
                </div> : <Input id={field.id} name={field.id} type={field.type} label={`${field.label} ${field.required ? '*' : ''}`} placeholder={field.placeholder} required={field.required} fullWidth />}
            </div>)}
          <div className="flex justify-end">
            <Button type="submit">Submit Form</Button>
          </div>
        </form>
      </div>;
  };
  const renderSubmissions = () => <div className="text-center py-12">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
        <FileTextIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No Form Submissions Yet
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Create and submit a form to see submissions appear here.
      </p>
      <Button onClick={() => setActiveTab('templates')}>
        Browse Form Templates
      </Button>
    </div>;
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileTextIcon size={24} className="text-pink-500 dark:text-pink-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {t('forms')}
          </h2>
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setActiveTab('templates')} className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'templates' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>
            Form Templates
          </button>
          <button onClick={() => setActiveTab('create')} className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'create' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`} disabled={!selectedTemplate}>
            Create Form
          </button>
          <button onClick={() => setActiveTab('submissions')} className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'submissions' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>
            Submissions
          </button>
        </nav>
      </div>
      {activeTab === 'templates' && renderTemplatesList()}
      {activeTab === 'create' && renderFormBuilder()}
      {activeTab === 'submissions' && renderSubmissions()}
    </div>;
};
export default FormsTool;