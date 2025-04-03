const TERMS_VERSION = "1.0.0"; // Internal version tracking
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export interface TermsStatus {
  hasAccepted: boolean;
  needsReaccept: boolean;
  daysRemaining?: number;
  expiryDate?: string;
}

export const termsManager = {
  checkAcceptance(): TermsStatus {
    try {
      // Check localStorage first as it persists between browser sessions
      const storedVersion = localStorage.getItem("termsVersion");
      const acceptanceTimestamp = localStorage.getItem("termsTimestamp");
      const currentTime = new Date().getTime();

      // If we have valid localStorage data
      if (storedVersion && acceptanceTimestamp) {
        const timestampMs = parseInt(acceptanceTimestamp);
        const expiryDate = new Date(timestampMs + THIRTY_DAYS_MS);
        const daysRemaining = Math.ceil(
          (expiryDate.getTime() - currentTime) / (24 * 60 * 60 * 1000)
        );
        const hasExpired = currentTime - timestampMs > THIRTY_DAYS_MS;

        // Version mismatch or expired
        if (storedVersion !== TERMS_VERSION || hasExpired) {
          return {
            hasAccepted: false,
            needsReaccept: true,
            daysRemaining: hasExpired ? 0 : daysRemaining,
            expiryDate: expiryDate.toISOString(),
          };
        }

        // Valid acceptance in localStorage - update sessionStorage for this session if needed
        if (!sessionStorage.getItem("termsAccepted")) {
          sessionStorage.setItem("termsAccepted", "true");
        }

        return {
          hasAccepted: true,
          needsReaccept: false,
          daysRemaining,
          expiryDate: expiryDate.toISOString(),
        };
      }

      // No valid localStorage data
      return { hasAccepted: false, needsReaccept: true };
    } catch (e) {
      console.error("Error checking terms acceptance:", e);
      return { hasAccepted: false, needsReaccept: true };
    }
  },

  acceptTerms(): void {
    try {
      const timestamp = new Date().getTime();
      localStorage.setItem("termsVersion", TERMS_VERSION);
      localStorage.setItem("termsTimestamp", timestamp.toString());
      sessionStorage.setItem("termsAccepted", "true");

      // Store expiry date for reference
      const expiryDate = new Date(timestamp + THIRTY_DAYS_MS);
      localStorage.setItem("termsExpiryDate", expiryDate.toISOString());
    } catch (e) {
      console.error("Error saving terms acceptance:", e);
    }
  },

  resetAcceptance(): void {
    try {
      localStorage.removeItem("termsVersion");
      localStorage.removeItem("termsTimestamp");
      localStorage.removeItem("termsExpiryDate");
      sessionStorage.removeItem("termsAccepted");
    } catch (e) {
      console.error("Error resetting terms acceptance:", e);
    }
  },

  getRemainingDays(): number | null {
    try {
      const acceptanceTimestamp = localStorage.getItem("termsTimestamp");
      if (!acceptanceTimestamp) return null;

      const timestampMs = parseInt(acceptanceTimestamp);
      const currentTime = new Date().getTime();
      const expiryDate = new Date(timestampMs + THIRTY_DAYS_MS);
      const daysRemaining = Math.ceil(
        (expiryDate.getTime() - currentTime) / (24 * 60 * 60 * 1000)
      );

      return daysRemaining > 0 ? daysRemaining : null;
    } catch (e) {
      console.error("Error calculating remaining days:", e);
      return null;
    }
  },

  // Enhanced debug info
  getAcceptanceInfo(): {
    version: string | null;
    timestamp: string | null;
    sessionAccepted: boolean;
    daysRemaining: number | null;
    expiryDate: string | null;
    hasExpired: boolean;
    formattedAcceptanceDate: string | null;
    formattedExpiryDate: string | null;
  } {
    const timestamp = localStorage.getItem("termsTimestamp");
    const daysRemaining = this.getRemainingDays();
    const timestampMs = timestamp ? parseInt(timestamp) : null;
    const expiryDate = timestampMs
      ? new Date(timestampMs + THIRTY_DAYS_MS)
      : null;

    return {
      version: localStorage.getItem("termsVersion"),
      timestamp,
      sessionAccepted: sessionStorage.getItem("termsAccepted") === "true",
      daysRemaining,
      expiryDate: expiryDate?.toISOString() || null,
      hasExpired: daysRemaining !== null ? daysRemaining <= 0 : true,
      formattedAcceptanceDate: timestampMs
        ? new Date(timestampMs).toLocaleString()
        : null,
      formattedExpiryDate: expiryDate ? expiryDate.toLocaleString() : null,
    };
  },
};
