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
      x: -500 - (index * 50), // Increased movement to fully hide
      opacity: index >= 2 ? (index >= 4 ? 0 : 0.3) : 1,
      transition: {
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  const boxVariants: Variants = {
    initial: { x: 0 },
    slide: (lineIndex: number) => {
      // For "exper" line (lineIndex 0), last letter is at index 3
      // For "ience" line (lineIndex 5), last letter is at index 4 (relative to that line)
      const lastLetterIndex = lineIndex === 0 ? 3 : 4;
      return {
        x: -500 - (lastLetterIndex * 50), // Background follows the last letter
        transition: {
          duration: 0.8,
          delay: lastLetterIndex * 0.08, // Same delay as last letter
          ease: [0.4, 0, 0.2, 1]
        }
      };
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
    }, 100); // Slight delay for unhover
  };

  const getSlideDirection = (currentJob: JobInfo) => {
    if (previousJobIndex === null) return 0;
    const currentIndex = jobData.findIndex(j => j.id === currentJob.id);
    return currentIndex > previousJobIndex ? 200 : -200; // Increased distance for proper covering
  };

  const infoVariants: Variants = {
    initial: (direction: number) => ({
      y: direction, // Start completely off-screen
      opacity: 1
    }),
    animate: {
      y: 0, // Slide to cover the container
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: (direction: number) => ({
      y: -direction, // Exit in opposite direction
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <div className="w-[70vw] mx-auto py-20">
      <div className="flex">
        {/* Experience Text Section - 60% */}
        <div className="w-[60%] relative h-48 flex flex-col overflow-hidden">
          {/* Job info with proper sliding animation */}
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
                  className="absolute inset-0 flex flex-col bg-white"
                >
                  {/* Position and Date - taking up first line height */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-2xl mb-1 text-black">
                      {hoveredJob.title}
                    </div>
                    <div className="text-xl italic text-gray-600">
                      {hoveredJob.startDate} - {hoveredJob.endDate}
                    </div>
                  </div>
                  
                  {/* Description - taking up second line height */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-base leading-relaxed max-w-md text-black">
                      {hoveredJob.description}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Experience text with background boxes */}
          <div className="text-8xl font-bold leading-none relative z-20 h-full flex flex-col font-[700]">
            {/* First line: EXPER */}
            <div className="relative flex-1 flex items-center">
              <motion.div
                custom={0}
                variants={boxVariants}
                animate={hoveredJob ? "slide" : "initial"}
                className="absolute inset-0 bg-white"
                style={{ zIndex: 21 }}
              />
              <div className="relative z-22 w-full">
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
              <motion.div
                custom={5}
                variants={boxVariants}
                animate={hoveredJob ? "slide" : "initial"}
                className="absolute inset-0 bg-white"
                style={{ zIndex: 21 }}
              />
              <div className="relative z-22 w-full">
                <div className="flex justify-between w-full text-black uppercase">
                  {"ience".split('').map((letter, index) => (
                    <motion.span
                      key={`ience-${index}`}
                      custom={index + 5}
                      variants={letterVariants}
                      animate={hoveredJob ? "slide" : "initial"}
                      className="inline-block relative"
                      style={{ zIndex: 30 - (index + 5) }}
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
        <div className="w-[40%] flex flex-col justify-center">
          {jobData.map((job) => (
            <motion.div
              key={job.id}
              className="text-2xl cursor-pointer relative py-3 -my-1.5" // Overlapping hover areas
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
  );
}
