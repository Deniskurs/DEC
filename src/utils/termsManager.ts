const TERMS_VERSION = "1.0.0"; // Internal version tracking
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

interface TermsStatus {
  hasAccepted: boolean;
  needsReaccept: boolean;
}

export const termsManager = {
  checkAcceptance(): TermsStatus {
    try {
      // Check session storage first
      const sessionAccepted = sessionStorage.getItem('termsAccepted');
      if (!sessionAccepted) {
        return { hasAccepted: false, needsReaccept: true };
      }

      // Check version and timestamp from localStorage
      const storedVersion = localStorage.getItem('termsVersion');
      const acceptanceTimestamp = localStorage.getItem('termsTimestamp');
      const currentTime = new Date().getTime();

      if (!storedVersion || !acceptanceTimestamp) {
        return { hasAccepted: false, needsReaccept: true };
      }

      // Check if 30 days have passed
      const hasExpired = currentTime - parseInt(acceptanceTimestamp) > THIRTY_DAYS_MS;
      
      // Version mismatch or expired
      if (storedVersion !== TERMS_VERSION || hasExpired) {
        return { hasAccepted: false, needsReaccept: true };
      }

      return { hasAccepted: true, needsReaccept: false };
    } catch (e) {
      console.error('Error checking terms acceptance:', e);
      return { hasAccepted: false, needsReaccept: true };
    }
  },

  acceptTerms(): void {
    try {
      const timestamp = new Date().getTime();
      localStorage.setItem('termsVersion', TERMS_VERSION);
      localStorage.setItem('termsTimestamp', timestamp.toString());
      sessionStorage.setItem('termsAccepted', 'true');
    } catch (e) {
      console.error('Error saving terms acceptance:', e);
    }
  },

  resetAcceptance(): void {
    try {
      localStorage.removeItem('termsVersion');
      localStorage.removeItem('termsTimestamp');
      sessionStorage.removeItem('termsAccepted');
    } catch (e) {
      console.error('Error resetting terms acceptance:', e);
    }
  },
  
  // Helper to get acceptance info (useful for debugging)
  getAcceptanceInfo(): { version: string | null; timestamp: string | null; sessionAccepted: boolean } {
    return {
      version: localStorage.getItem('termsVersion'),
      timestamp: localStorage.getItem('termsTimestamp'),
      sessionAccepted: sessionStorage.getItem('termsAccepted') === 'true'
    };
  }
};