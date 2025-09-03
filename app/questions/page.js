'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Questions() {
const questions=[
    {id:1 , question: 'Are you in a fasting state for this test?'},
    {id:2 , question: 'When did u have your last meal' },
    {id:3 , question: 'Do you have diabetes or any other major medical conditions?' },
    {id:4 , question: 'Are you taking any blood-thinning medications (eg: Warfarin, Aspirin' },
    {id:5 , question: 'Do you have any other allergies to drugs or materials (e.g., latex, iodine)?' },
    {id:6 , question: '​Have you had a mastectomy or are you experiencing lymphedema (swelling) in either arm?'}
];

const [answer,setAnswer] = useState({});

const router=useRouter();

const handleHome = () => {
  router.push('/');
};

const handleAnswerChange = (questionId, answer) => {
  setAnswer(prevAnswers => ({
    ...prevAnswers,
    [questionId]: answer
  }));

}
return(
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>
      <div className='max-w-4xl mx-auto relative z-10'>
      <motion.div initial={{position:10,opacity:0}} animate={{position:0,opacity:1}} className='mb-10 mt-5 flex justify-between items-center'>
      <h1 className='text-4xl font-bold text-white'>Fill The Following Form</h1>
      <motion.button initial={{scale:0}} whileHover={{scale:1.1}} animate={{scale:1}} onClick={handleHome} className='cursor-pointer bg-white text-black p-4 px-8 rounded-xl transition all duration 300 hover:font-bold hover:text-white hover:bg-black'>
        Home
      </motion.button>
      </motion.div>
      <p className='italic mb-5'>The form below must be filled by the technical nurse on behalf of the patient</p>
      <div className='bg-white max-w-full p-8 flex justify-center rounded-xl'>
        <form className='text-black font-mono'>
          {questions.map((question,index) => (
          <div key={question.id} className=''>
          <p className='text-2xl'>
            {index+1}. {question.question}
          </p>
          <div className='flex justify-center gap-20 mt-5 mb-5'>
          <label className='flex items-center cursor-pointer text-lg'>
            <input type='radio' name={`question-${question.id}`}
             value="yes" 
             checked={answer[question.id]=== 'yes'} 
             onChange={() => handleAnswerChange(question.id,'yes')}/>
              <span>Yes</span>
          </label>
          <label className='flex items-center cursor-point text-lg'>
            <input
            type='radio'
            name={`question-${question.id}`}
            value='no'
            checked={answer[question.id]==='no'}
            onChange={() => handleAnswerChange(question.id,'no')}/>

            <span>No</span>

          </label>
          </div>
        </div>
        ))}
        </form>


      </div>
      </div>
    </div>
)
}