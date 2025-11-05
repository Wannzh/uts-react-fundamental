import React from 'react';

const Support = () => {
  return (
    <main className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Support</h1>
          <p className="text-lg text-slate-600 mb-8">Find answers, get help, and learn more about our products and services.</p>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="#" className="p-6 bg-slate-50 border border-gray-100 rounded-xl hover:shadow-md">
              <h3 className="font-semibold text-slate-900">Get Started</h3>
              <p className="text-sm text-slate-600 mt-2">Set up your device and start using the most important features.</p>
            </a>
            <a href="#" className="p-6 bg-slate-50 border border-gray-100 rounded-xl hover:shadow-md">
              <h3 className="font-semibold text-slate-900">Repair & Service</h3>
              <p className="text-sm text-slate-600 mt-2">Learn about repair options and service availability.</p>
            </a>
            <a href="#" className="p-6 bg-slate-50 border border-gray-100 rounded-xl hover:shadow-md">
              <h3 className="font-semibold text-slate-900">Manuals & Documents</h3>
              <p className="text-sm text-slate-600 mt-2">Download user guides, manuals, and technical specifications.</p>
            </a>
            <a href="#" className="p-6 bg-slate-50 border border-gray-100 rounded-xl hover:shadow-md">
              <h3 className="font-semibold text-slate-900">Contact Support</h3>
              <p className="text-sm text-slate-600 mt-2">Reach out to our support team for personalized help.</p>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Support;
