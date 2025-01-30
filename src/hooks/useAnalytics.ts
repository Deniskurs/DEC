// Analytics hook for tracking user interactions
import { useEffect } from 'react';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackEvent = ({ category, action, label, value }: AnalyticsEvent) => {
    // Implementation for your analytics service
    console.log('Analytics Event:', { category, action, label, value });
  };

  const trackPageView = (page: string) => {
    trackEvent({
      category: 'Page View',
      action: 'View',
      label: page,
    });
  };

  return {
    trackEvent,
    trackPageView,
  };
};