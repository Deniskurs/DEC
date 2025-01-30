import React, { useCallback, useRef, useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { RangeInputProps } from '../../../types/calculator';

const RangeInput: React.FC<RangeInputProps> = memo(({
  value,
  onChange,
  min,
  max,
  step,
  label,
  formatter
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(() => value.toString());
  const trackRef = useRef<HTMLDivElement>(null);
  
  const percentage = ((value - min) / (max - min)) * 100;

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!trackRef.current) return null;
    const { left, width } = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - left, width));
    const ratio = x / width;
    return Math.max(min, Math.min(max, 
      Math.round((min + (max - min) * ratio) / step) * step
    ));
  }, [min, max, step]);

  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const newValue = getValueFromPosition(e.clientX);
    if (newValue !== null) onChange(newValue);
  }, [getValueFromPosition, onChange]);

  const handleInputFinish = useCallback(() => {
    const newValue = Math.max(min, Math.min(max,
      Math.round(Number(inputValue) / step) * step
    ));
    if (!isNaN(newValue)) onChange(newValue);
    setInputValue(value.toString());
    setIsEditing(false);
  }, [inputValue, min, max, step, onChange, value]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleInputFinish();
    else if (e.key === 'Escape') {
      setIsEditing(false);
      setInputValue(value.toString());
    }
  }, [handleInputFinish, value]);

  useEffect(() => {
    if (!isDragging) return;
    
    const preventScroll = (e: TouchEvent) => e.preventDefault();
    const slider = trackRef.current;
    
    slider?.addEventListener('touchmove', preventScroll, { passive: false });
    return () => slider?.removeEventListener('touchmove', preventScroll);
  }, [isDragging]);

  useEffect(() => {
    if (!isEditing) setInputValue(value.toString());
  }, [value, isEditing]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    const newValue = getValueFromPosition(e.touches[0].clientX);
    if (newValue !== null) onChange(newValue);
  }, [getValueFromPosition, onChange]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const newValue = getValueFromPosition(e.touches[0].clientX);
    if (newValue !== null) onChange(newValue);
  }, [getValueFromPosition, onChange, isDragging]);

  return (
    <div className="relative group touch-none">
      <div className="absolute -inset-2 bg-gradient-to-r from-rich-blue-500/10 via-rich-blue-400/10 to-rich-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-rich-blue-50/90 to-white/90 rounded-xl backdrop-blur-xl relative border border-rich-blue-100/20 transition-all duration-500 hover:shadow-lg">
        <div className="text-base sm:text-lg lg:text-xl text-rich-blue-800 font-semibold mb-4 sm:mb-6">
          {label}
        </div>
        
        <div className="space-y-6 sm:space-y-8">
          <div className="relative h-12 sm:h-16">
            <div 
              ref={trackRef}
              className="absolute top-1/2 left-0 right-0 -mt-1 h-1.5 sm:h-2 bg-gradient-to-r from-rich-blue-100 to-rich-blue-200 rounded-full overflow-hidden cursor-pointer"
              onClick={handleTrackClick}
            />
            
            <div 
              className="absolute top-1/2 left-0 -mt-1 h-1.5 sm:h-2 bg-gradient-to-r from-rich-blue-500 to-rich-blue-600 rounded-full transition-all duration-75 ease-out"
              style={{ width: `${percentage}%` }}
            />

            <div 
              className="absolute top-1/2 -translate-y-1/2"
              style={{ 
                left: `${percentage}%`,
                transform: `translate(-50%, -50%) scale(${isDragging ? 1.25 : 1})`
              }}
            >
              <motion.div 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-white to-cream-50 border-2 border-rich-blue-500 shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 1.25 }}
              >
                <div className="absolute inset-1.5 bg-rich-blue-500/30 rounded-full transition-all duration-300 group-hover:bg-rich-blue-500/40" />
              </motion.div>
            </div>

            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setIsDragging(false)}
              className="absolute top-1/2 -translate-y-1/2 w-full h-16 opacity-0 cursor-pointer touch-none"
            />

            <div className="absolute -bottom-6 left-0 w-full flex justify-between text-xs sm:text-sm font-medium">
              <span className="text-rich-blue-600/80 transition-all duration-300 hover:text-rich-blue-600">
                {formatter(min)}
              </span>
              <span className="text-rich-blue-600/80 transition-all duration-300 hover:text-rich-blue-600">
                {formatter(max)}
              </span>
            </div>
          </div>

          <div className="relative flex justify-center">
            {isEditing ? (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleInputFinish}
                onKeyDown={handleInputKeyDown}
                className="w-36 sm:w-48 text-2xl sm:text-4xl font-bold text-center bg-transparent border-b-2 border-rich-blue-500 focus:outline-none focus:border-rich-blue-600 text-rich-blue-800"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="group relative"
              >
                <span className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-rich-blue-600 to-rich-blue-700 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                  {formatter(value)}
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-rich-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

RangeInput.displayName = 'RangeInput';

export default RangeInput;