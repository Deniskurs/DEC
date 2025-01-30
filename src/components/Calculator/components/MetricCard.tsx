import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { AdaptiveTooltip } from '../../ui/adaptive-tooltip';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  tooltip: string;
  highlight?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  description,
  tooltip,
  highlight = false
}) => {
  // Base classes with proper type checking for highlight prop
  const baseClasses = "relative p-8 rounded-xl overflow-hidden group transition-all duration-500 ease-out transform hover:-translate-y-1 hover:shadow-lg";
  const backgroundClasses = highlight
    ? "bg-gradient-to-br from-rich-blue-600 to-rich-blue-700 text-white"
    : "bg-gradient-to-br from-rich-blue-50/80 to-white/80";
    
  // Dynamic color classes based on highlight prop
  const iconWrapperClasses = highlight
    ? "p-4 bg-white/10 rounded-xl backdrop-blur-sm"
    : "p-4 bg-rich-blue-100/80 rounded-xl backdrop-blur-sm";
  
  const iconColor = highlight ? "text-white" : "text-rich-blue-600";
  const labelColor = highlight ? "text-white/90" : "text-rich-blue-600";
  const valueColor = highlight ? "text-white" : "text-rich-blue-800";
  const descriptionColor = highlight ? "text-white/80" : "text-rich-blue-600/80";

  return (
    <AdaptiveTooltip content={tooltip}>
      <motion.div 
        className={`${baseClasses} ${backgroundClasses}`}
        whileHover={{ y: -4 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Animated Gradient Overlay */}
        <div className={`absolute inset-0 ${
          highlight 
            ? 'bg-gradient-to-r from-rich-blue-400/30 via-rich-blue-300/30 to-rich-blue-400/30' 
            : 'bg-gradient-to-r from-rich-blue-500/10 via-rich-blue-400/10 to-rich-blue-500/10'
        } opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl`} />

        {/* Interactive Highlight Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>

        {/* Main Content */}
        <div className="relative h-full flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Icon Container with Animation */}
            <motion.div 
              className={`${iconWrapperClasses} transition-all duration-500`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-8 h-8 ${iconColor}`} />
            </motion.div>

            {/* Text Content */}
            <div>
              <div className={`text-sm font-medium ${labelColor} mb-2 uppercase tracking-wider`}>
                {label}
              </div>
              
              {/* Animated Value Display */}
              <motion.div 
                key={value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.165, 0.84, 0.44, 1],
                  delay: 0.1
                }}
                className={`text-3xl font-bold ${valueColor} mb-1`}
              >
                {value}
              </motion.div>
              
              {/* Description with Hover Effect */}
              <div className={`text-sm ${descriptionColor} transition-all duration-300 group-hover:opacity-90`}>
                {description}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Optimization: Touch Feedback */}
        <div className="absolute inset-0 bg-current opacity-0 active:opacity-10 md:hidden transition-opacity duration-200" />
      </motion.div>
    </AdaptiveTooltip>
  );
};

// Performance optimization
export default React.memo(MetricCard);