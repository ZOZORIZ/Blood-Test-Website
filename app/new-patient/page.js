'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const availableTests = [
  { id: 1, name: 'Complete Blood Count (CBC)', price: 25, description: 'Measures different components of blood including red and white blood cells' },
  { id: 2, name: 'Peripheral Smear', price: 35, description: 'identify abnormalities like malaria, anemia, or blood cancers.' },
  { id: 3, name: 'Polymerase Chain Reaction', price: 30, description: 'Molecular test to detect and amplify DNA/RNA for infections, genetics, and research.' },
  { id: 4, name: 'DNA/RNA Extraction', price: 45, description: 'Isolation of genetic material for advanced tests like PCR, sequencing, and diagnostics.' },
  { id: 5, name: 'HbA1C (Glycated Hemoglobin)', price: 40, description: 'Checks average blood sugar over 2–3 months to diagnose and monitor diabetes.' },
  { id: 6, name: 'Erythrocyte Sedimentation Rate (ESR)', price: 35, description: 'Measures inflammation levels in the body, useful in infections and autoimmune conditions.' },
  { id: 7, name: 'Blood Grouping (ABO & Rh)', price: 50, description: 'Identifies blood type and Rh factor, essential for transfusions, transplants, and pregnancy care.' },
  { id: 8, name: 'Coagulation Profile (PT, INR, PTT)', price: 40, description: 'Assesses blood clotting function for bleeding disorders, surgeries, and anticoagulant therapy.' },
  { id: 9, name: 'Antibody Titer', price: 55, description: 'Measures antibody levels to check immunity, vaccine response, or infections.' }
];

export default function NewPatient() {
  const router = useRouter();
  const [selectedTests, setSelectedTests] = useState([]);

  const toggleTest = (test) => {
    setSelectedTests(prev => 
      prev.find(t => t.id === test.id) 
        ? prev.filter(t => t.id !== test.id)
        : [...prev, test]
    );
  };

  const totalAmount = selectedTests.reduce((sum, test) => sum + test.price, 0);

  const handleContinue = () => {
    if (selectedTests.length === 0) {
      alert('Please select at least one test to continue.');
      return;
    }
    // Store selected tests in localStorage for the next page
    localStorage.setItem('selectedTests', JSON.stringify(selectedTests));
    router.push('/confirmation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-white mb-2">
                New Patient Registration
              </h1>
              <p className="text-gray-300 text-lg">Select the blood tests you need for your health assessment</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg border border-gray-500/20"
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tests List */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-8">Available Blood Tests</h2>
              <div className="grid gap-4">
                <AnimatePresence>
                  {availableTests.map((test, index) => (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                        selectedTests.find(t => t.id === test.id)
                          ? 'border-red-400 bg-red-500/20 shadow-lg shadow-red-500/20'
                          : 'border-white/20 bg-white/5 hover:border-red-300/50 hover:bg-white/10'
                      }`}
                      onClick={() => toggleTest(test)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <motion.input
                              type="checkbox"
                              checked={selectedTests.find(t => t.id === test.id) ? true : false}
                              onChange={() => toggleTest(test)}
                              className="w-6 h-6 text-red-500 rounded focus:ring-red-400 bg-white/10 border-white/30"
                              whileTap={{ scale: 0.9 }}
                            />
                            <h3 className="text-lg font-semibold text-white">{test.name}</h3>
                          </div>
                          <p className="text-gray-300 text-sm ml-10">{test.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                          ₹{test.price}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sticky top-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Selected Tests</h3>
              
              <AnimatePresence>
                {selectedTests.length === 0 ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-center py-8"
                  >
                    No tests selected yet
                  </motion.p>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3 mb-6"
                  >
                    {selectedTests.map((test) => (
                      <motion.div 
                        key={test.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex justify-between items-center bg-white/10 p-4 rounded-lg border border-white/20"
                      >
                        <div>
                          <p className="font-medium text-white text-sm">{test.name}</p>
                        </div>
                        <span className="font-bold text-red-400">₹{test.price}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-t border-white/20 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-white">Total Amount:</span>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  ₹{totalAmount}
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ 
                    scale: selectedTests.length > 0 ? 1.05 : 1,
                    boxShadow: selectedTests.length > 0 ? "0 20px 40px rgba(239, 68, 68, 0.4)" : "none"
                  }}
                  whileTap={{ scale: selectedTests.length > 0 ? 0.95 : 1 }}
                  onClick={handleContinue}
                  disabled={selectedTests.length === 0}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedTests.length === 0
                      ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl border border-red-400/20'
                  }`}
                >
                  Continue to Confirmation
                </motion.button>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-blue-400/30"
              >
                <h4 className="font-semibold text-blue-300 mb-3">What's Next?</h4>
                <ul className="text-sm text-blue-200 space-y-2">
                  <li>• Review your selected tests</li>
                  <li>• Confirm your appointment</li>
                  <li>• Receive your bill</li>
                  <li>• Schedule your visit</li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
