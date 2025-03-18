"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Maximize2, X } from 'lucide-react';

interface AdventureImage {
  src: string;
  alt: string;
  location: string;
  caption: string;
}

interface AdventureCarouselProps {
  images: AdventureImage[];
}

const AdventureCarousel: React.FC<AdventureCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Reference to the carousel container
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-advance the carousel
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1 || isFullscreen) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length, currentIndex, isFullscreen]);

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false); // Pause auto-play when manually navigating
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setIsAutoPlaying(false); // Pause auto-play when manually navigating
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // Resume autoplay after 10 seconds of inactivity
  useEffect(() => {
    if (isAutoPlaying || isFullscreen) return;
    
    const timer = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [isAutoPlaying, isFullscreen]);
  
  // Intersection Observer to detect when carousel is in view
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Add a slight delay before expanding for better UX
          setTimeout(() => setIsExpanded(true), 300);
        }
      },
      {
        root: null, // use viewport
        rootMargin: '0px',
        threshold: 0.3, // trigger when 30% of the element is visible
      }
    );
    
    observer.observe(carouselRef.current);
    
    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  // For keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'ArrowLeft') {
          handlePrevious();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        } else if (e.key === 'Escape') {
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handleNext, handlePrevious]);

  // For mobile touch support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
    
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Toggle fullscreen view
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsAutoPlaying(false); // Pause autoplay in fullscreen mode
  };

  // Variants for animations
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // If no images, don't render
  if (images.length === 0) return null;

  return (
    <>
      <div 
        ref={carouselRef}
        className={`relative overflow-hidden rounded-xl bg-slate-800/50 shadow-xl transition-all duration-700 ease-in-out
          ${isFullscreen ? "hidden" : "w-full"} 
          ${isExpanded 
            ? "h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px]" 
            : "h-[400px] sm:h-[500px] md:h-[600px]"}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main carousel */}
        <div className="relative w-full h-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
              }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              <div className="relative max-w-full max-h-full w-auto h-auto">
                {/* Image with natural dimensions */}
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="max-w-full max-h-full mx-auto"
                  style={{ objectFit: 'none' }} // Prevents any automatic fitting behavior
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.src = "/images/placeholder-image.jpg";
                  }}
                />
                
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center text-blue-300 mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{images[currentIndex].location}</span>
                  </div>
                  <p className="text-white text-base md:text-lg">{images[currentIndex].caption}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
        
        {/* Pagination dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-colors 
                ${index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"}`}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen view */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center" 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Exit fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            {/* Image shown at natural dimensions */}
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-w-full max-h-full"
              style={{ objectFit: 'none' }} // Prevents any automatic fitting behavior
            />

            {/* Navigation buttons in fullscreen mode */}
            <button
              onClick={handlePrevious}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Caption overlay in fullscreen mode */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center text-blue-300 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-base">{images[currentIndex].location}</span>
              </div>
              <p className="text-white text-lg sm:text-xl">{images[currentIndex].caption}</p>
            </div>
          </div>

          {/* Pagination dots in fullscreen mode */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-4 h-4 rounded-full transition-colors 
                  ${index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"}`}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdventureCarousel;