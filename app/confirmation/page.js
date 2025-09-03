'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Confirmation() {
  const router = useRouter();
  const [selectedTests, setSelectedTests] = useState([]);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: ''
  });
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  useEffect(() => {
    // Get selected tests from localStorage
    const tests = localStorage.getItem('selectedTests');
    if (tests) {
      setSelectedTests(JSON.parse(tests));
    } else {
      // If no tests selected, redirect back to new patient page
      router.push('/new-patient');
    }
  }, [router]);

  const totalAmount = selectedTests.reduce((sum, test) => sum + test.price, 0);
  const tax = totalAmount * 0.08; // 8% tax
  const finalTotal = totalAmount + tax;

  const generateBillNumber = () => {
    return 'BT' + Date.now().toString().slice(-6);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate bill
    const bill = {
      billNumber: generateBillNumber(),
      patientInfo,
      selectedTests,
      appointmentDate,
      appointmentTime,
      subtotal: totalAmount,
      tax,
      total: finalTotal,
      generatedAt: new Date().toISOString()
    };

    // Store bill in localStorage (in a real app, this would be sent to a server)
    localStorage.setItem('currentBill', JSON.stringify(bill));
    
    alert('Appointment booked successfully! Your bill has been generated.');
    router.push('/bill');
  };

  const handleBack = () => {
    router.push('/new-patient');
  };

  if (selectedTests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

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
                Confirm Your Appointment
              </h1>
              <p className="text-gray-300 text-lg">Review your selected tests and provide your information</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg border border-gray-500/20"
            >
              Back to Tests
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Patient Information Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Patient Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-3">Full Name *</label>
                <input
                  type="text"
                  required
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-3">Email Address *</label>
                <input
                  type="email"
                  required
                  value={patientInfo.email}
                  onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-3">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={patientInfo.phone}
                  onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your phone number"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-3">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={patientInfo.dateOfBirth}
                  onChange={(e) => setPatientInfo({...patientInfo, dateOfBirth: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-3">Address</label>
                <textarea
                  value={patientInfo.address}
                  onChange={(e) => setPatientInfo({...patientInfo, address: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                  rows="3"
                  placeholder="Enter your address"
                />
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-3">Patient Arrival Time *</label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-3">Blood Test Time *</label>
                  <select
                    required
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                  >
                    <option className='text-black'value="">Select time</option>
                    <option className='text-black'value="08:00">8:00 AM</option>
                    <option className='text-black' value="09:00">9:00 AM</option>
                    <option className='text-black' value="10:00">10:00 AM</option>
                    <option className='text-black' value="11:00">11:00 AM</option>
                    <option className='text-black' value="12:00">12:00 PM</option>
                    <option className='text-black' value="13:00">1:00 PM</option>
                    <option className='text-black' value="14:00">2:00 PM</option>
                    <option className='text-black' value="15:00">3:00 PM</option>
                    <option className='text-black' value="16:00">4:00 PM</option>
                  </select>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl border border-red-400/20"
              >
                Book Appointment & Generate Bill
              </motion.button>
            </form>
          </motion.div>

          {/* Bill Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Bill Summary</h2>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-300">Selected Tests:</h3>
              <AnimatePresence>
                {selectedTests.map((test, index) => (
                  <motion.div 
                    key={test.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center bg-white/10 p-4 rounded-xl border border-white/20"
                  >
                    <div>
                      <p className="font-medium text-white">{test.name}</p>
                      <p className="text-sm text-gray-300">{test.description}</p>
                    </div>
                    <span className="font-bold text-red-400">₹{test.price}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t border-white/20 pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Subtotal:</span>
                <span className="font-semibold text-white">₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Tax (8%):</span>
                <span className="font-semibold text-white">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-white/20 pt-3">
                <span className="text-white">Total Amount:</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                ₹{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 p-4 bg-green-500/20 rounded-xl border border-green-400/30"
            >
              <h4 className="font-semibold text-green-300 mb-2">Payment Information</h4>
              <p className="text-sm text-green-200">
                Payment is due at the time of service. We accept cash, credit cards, and most insurance plans.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
