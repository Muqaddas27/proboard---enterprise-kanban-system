/**
 * Email Service
 * In production, this would integrate with an email service like SendGrid, Mailgun, or AWS SES
 * For now, it simulates email sending and logs to console
 */

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  timestamp: string;
}

// Simulate email sending
const sentEmails: EmailPayload[] = [];

export const emailService = {
  /**
   * Send invitation email
   * In production, this would call your backend API endpoint
   */
  sendInvitationEmail: async (email: string, boardName: string, inviterName: string = 'John Doe'): Promise<boolean> => {
    try {
      const payload: EmailPayload = {
        to: email,
        subject: `${inviterName} invited you to ${boardName} on ProBoard`,
        body: `
Hi there,

${inviterName} has invited you to collaborate on the "${boardName}" board in ProBoard.

Click the link below to accept the invitation:
https://proboard.io/invitations/accept/inv-${Date.now()}

This invitation will expire in 7 days.

Best regards,
ProBoard Team
        `,
        timestamp: new Date().toISOString()
      };

      // Log email for demonstration (in production, post to backend)
      console.log('📧 Email would be sent:', payload);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Store in memory for tracking
      sentEmails.push(payload);

      // In production, POST to your backend:
      // const response = await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // return response.ok;

      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  },

  /**
   * Get all sent emails (for demo/admin purposes)
   */
  getSentEmails: (): EmailPayload[] => {
    return [...sentEmails];
  },

  /**
   * Clear sent emails log
   */
  clearSentEmails: () => {
    sentEmails.length = 0;
  }
};
