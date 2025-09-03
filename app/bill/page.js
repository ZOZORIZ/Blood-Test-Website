'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { motion, AnimatePresence } from 'framer-motion';

export default function Bill() {
  const router = useRouter();
  const [bill, setBill] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get bill from localStorage
    const billData = localStorage.getItem('currentBill');
    if (billData) {
      const parsedBill = JSON.parse(billData);
      setBill(parsedBill);
      
      // Generate QR code
      generateQRCode(parsedBill);
    } else {
      // If no bill found, redirect to home
      router.push('/');
    }
    setLoading(false);
  }, [router]);

  const generateQRCode = async (billData) => {
    try {
      const qrData = {
        billNumber: billData.billNumber,
        patientName: billData.patientInfo.name,
        totalAmount: billData.total,
        generatedAt: billData.generatedAt,
        tests: billData.selectedTests.map(test => test.name)
      };
      
      const qrString = JSON.stringify(qrData);
      const qrUrl = await QRCode.toDataURL(qrString, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    router.push('/');
  };
  const handleProceed = () => {
    router.push('/questions');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading Bill...</h1>
        </div>
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Bill Found</h1>
          <button
            onClick={handleBack}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Home
          </button>
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
      <div className="max-w-4xl mx-auto">
        {/* Header - Hidden in print */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 print:hidden relative z-20"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-800 mb-2">
                Your Bill
              </h1>
              <p className="text-gray-600 text-lg">Bill #{bill.billNumber}</p>
            </div>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrint}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg border border-green-400/20 flex items-center gap-3 cursor-pointer relative z-30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Bill
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg border border-gray-500/20"
              >
                Back to Home
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bill Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 print:shadow-none print:rounded-none"
        >
          {/* Bill Header */}
          <div className="text-center mb-12 border-b-2 border-gray-200 pb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mr-6 shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-800">
                  Software Automated <br></br>Blood Test Center
                </h1>
                <p className="text-gray-600 text-lg">Blood Testing Services</p>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-8 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-semibold text-gray-800 mb-3">Bill To:</h3>
                <p className="text-gray-700">{bill.patientInfo.name}</p>
                <p className="text-gray-700">{bill.patientInfo.email}</p>
                <p className="text-gray-700">{bill.patientInfo.phone}</p>
                {bill.patientInfo.address && (
                  <p className="text-gray-700">{bill.patientInfo.address}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-semibold text-gray-800 mb-3">Bill Details:</h3>
                <p className="text-gray-700">Bill Number: <span className="font-semibold text-gray-800">{bill.billNumber}</span></p>
                <p className="text-gray-700">Date: <span className="font-semibold text-gray-800">{new Date(bill.generatedAt).toLocaleDateString()}</span></p>
                <p className="text-gray-700">Appointment: <span className="font-semibold text-gray-800">{bill.appointmentDate} at {bill.appointmentTime}</span></p>
              </motion.div>
            </div>
          </div>

          {/* Tests Table */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Selected Blood Tests</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Test Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Description</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-800">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.selectedTests.map((test, index) => (
                    <tr key={test.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{test.name}</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">{test.description}</td>
                      <td className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-800">₹{test.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Summary</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold text-gray-400">₹{bill.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%):</span>
                    <span className="font-semibold text-gray-400">₹{bill.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold border-t pt-3">
                    <span className="text-gray-800">Total Amount:</span>
                    <span className="text-red-600">₹{bill.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">QR Code Verification</h3>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                {qrCodeUrl && (
                  <div>
                    <img src={qrCodeUrl} alt="Bill QR Code" className="mx-auto mb-4" />
                    <p className="text-sm text-gray-600">Scan to verify bill authenticity</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg flex justify-center">
            <motion.button onClick={handleProceed} initial={{scale:0}} animate={{scale:1}} transition={{delay:1}} className='cursor-pointer bg-gradient-to-r from-[#50C878] to-[#008000] text-white font-bold px-10 p-4 rounded-full hover:scale-105 z-10 '>
              Proceed
            </motion.button>
          </div>

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-gray-600 text-sm border-t border-gray-200 pt-6"
          >
            <p className="text-gray-800 font-semibold">Thank you for choosing Software Automated Blood Test Center</p>
            <p>designed and maintened by Noah Cherian Jacob</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .bg-gradient-to-br {
            background: white !important;
          }
          .min-h-screen {
            min-height: auto !important;
          }
          .p-4, .p-6, .p-8 {
            padding: 0 !important;
          }
          .mb-6, .mb-8 {
            margin-bottom: 1rem !important;
          }
          .mt-8 {
            margin-top: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
