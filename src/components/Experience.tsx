'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { jobData, JobInfo } from '../data/a';

export default function Experience() {
  const [hoveredJob, setHoveredJob] = useState<JobInfo | null>(null);
  const [previousJobIndex, setPreviousJobIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const letterVariants: Variants = {
    initial: { x: 0, opacity: 1 },
    slide: (index: number) => ({
      x: -600 - (index * 60), // Increased for larger text
      opacity: index >= 2 ? (index >= 4 ? 0 : 0.3) : 1,
      transition: {
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  // Background should sync with the last letter (index 8 - 'e' from 'ience')
  const backgroundVariants: Variants = {
    initial: { x: 0 },
    slide: {
      x: -600 - (8 * 60), // Sync with the last letter's movement
      transition: {
        duration: 0.8,
        delay: 8 * 0.08, // Same delay as the last letter
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const handleMouseEnter = (job: JobInfo) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    const currentIndex = jobData.findIndex(j => j.id === job.id);
    if (hoveredJob) {
      setPreviousJobIndex(jobData.findIndex(j => j.id === hoveredJob.id));
    }
    setHoveredJob(job);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredJob(null);
      setPreviousJobIndex(null);
    }, 100);
  };

  const getSlideDirection = (currentJob: JobInfo) => {
    if (previousJobIndex === null) return 0;
    const currentIndex = jobData.findIndex(j => j.id === currentJob.id);
    return currentIndex > previousJobIndex ? 300 : -300; // Increased for taller component
  };

  const infoVariants: Variants = {
    initial: (direction: number) => ({
      y: direction,
      opacity: 1
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: (direction: number) => ({
      y: -direction,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="w-[77vw] mx-auto py-32">
        <div className="flex">
          {/* Experience Text Section - 60% */}
          <div className="w-[60%] relative h-96 flex flex-col overflow-hidden">
            {/* Job info with Swedish-inspired design */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence>
                {hoveredJob && (
                  <motion.div
                    key={hoveredJob.id}
                    custom={getSlideDirection(hoveredJob)}
                    variants={infoVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 bg-white p-8 flex flex-col"
                  >
                    {/* Header section with asymmetric layout */}
                    <div className="flex justify-between items-start mb-16">
                      <div className="flex-1">
                        <div className="text-6xl font-light text-black leading-none mb-2 tracking-tight">
                          {hoveredJob.title.split(' ')[0]}
                        </div>
                        {hoveredJob.title.split(' ').slice(1).join(' ') && (
                          <div className="text-6xl font-bold text-black leading-none tracking-tight">
                            {hoveredJob.title.split(' ').slice(1).join(' ')}
                          </div>
                        )}
                      </div>
                      
                      {/* Vertical date display */}
                      <div className="flex flex-col items-center">
                        <div className="text-lg font-medium text-black mb-2">
                          {hoveredJob.endDate}
                        </div>
                        <div className="w-8 h-px bg-black mb-2"></div>
                        <div className="text-lg font-medium text-black">
                          {hoveredJob.startDate}
                        </div>
                      </div>
                    </div>

                    {/* Description with constrained width */}
                    <div className="flex-1 flex items-end">
                      <div className="max-w-md">
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                          Description
                        </div>
                        <div className="text-base leading-relaxed text-black font-normal">
                          {hoveredJob.description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Single background that covers both lines */}
            <motion.div
              variants={backgroundVariants}
              animate={hoveredJob ? "slide" : "initial"}
              className="absolute inset-0 bg-white z-10"
            />

            {/* Experience text */}
            <div className="text-[12rem] font-bold leading-none relative z-20 h-full flex flex-col font-[700] px-4">
              {/* First line: EXPER */}
              <div className="relative flex-1 flex items-center">
                <div className="relative w-full">
                  <div className="flex justify-between w-full text-black uppercase">
                    {"exper".split('').map((letter, index) => (
                      <motion.span
                        key={`exper-${index}`}
                        custom={index}
                        variants={letterVariants}
                        animate={hoveredJob ? "slide" : "initial"}
                        className="inline-block relative"
                        style={{ zIndex: 30 - index }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Second line: IENCE */}
              <div className="relative flex-1 flex items-center">
                <div className="relative w-full">
                  <div className="flex justify-between w-full text-black uppercase">
                    {"ience".split('').map((letter, index) => (
                      <motion.span
                        key={`ience-${index}`}
                        custom={index + 4} // Changed from +5 to +4 to sync the 5th letters
                        variants={letterVariants}
                        animate={hoveredJob ? "slide" : "initial"}
                        className="inline-block relative"
                        style={{ zIndex: 30 - (index + 4) }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Companies List Section - 40% */}
          <div className="w-[40%] flex flex-col justify-center items-center">
            {jobData.map((job, index) => (
              <motion.div
                key={job.id}
                className={`text-3xl cursor-pointer relative text-center font-medium ${
                  index === 0 ? 'py-8' : index === jobData.length - 1 ? 'py-8 -mt-4' : 'py-8 -mt-4'
                }`}
                onMouseEnter={() => handleMouseEnter(job)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative">
                  {job.company}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-current"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}