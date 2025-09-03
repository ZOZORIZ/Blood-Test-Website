'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ExistingPatient() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white mb-2">
                Existing Patient Portal
              </h1>
              <p className="text-gray-300 text-lg">Access your previous results and book follow-up appointments</p>
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

        <div className="grid md:grid-cols-2 gap-8">
          {/* Login Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Patient Login</h2>
            <form className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-3">Patient ID or Email</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your patient ID or email"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-3">Date of Birth</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
              </motion.div>

              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl border border-blue-400/20"
              >
                Access My Records
              </motion.button>
            </form>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Available Services</h2>
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                  <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">View Test Results</h3>
                  <p className="text-sm text-gray-300">Access your previous blood test results and reports</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                  <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Book Follow-up</h3>
                  <p className="text-sm text-gray-300">Schedule additional tests or follow-up appointments</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-400/30">
                  <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Payment History</h3>
                  <p className="text-sm text-gray-300">View your payment history and outstanding balances</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-400/30">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Contact Support</h3>
                  <p className="text-sm text-gray-300">Get help with your account or test results</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Need Help?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-white/10 rounded-xl border border-white/20"
            >
              <h4 className="font-semibold text-white text-lg mb-2">Phone Support</h4>
              <p className="text-gray-300">(555) 123-4567</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-white/10 rounded-xl border border-white/20"
            >
              <h4 className="font-semibold text-white text-lg mb-2">Email Support</h4>
              <p className="text-gray-300">support@bloodtestcenter.com</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-white/10 rounded-xl border border-white/20"
            >
              <h4 className="font-semibold text-white text-lg mb-2">Office Hours</h4>
              <p className="text-gray-300">Mon-Fri: 8AM-6PM</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
