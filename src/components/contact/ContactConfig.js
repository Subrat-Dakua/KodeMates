/**
 * Contact Configuration Module
 * Centralized, verifiable contact settings.
 * 
 * NOTE FOR PROJECT LEAD:
 * In accordance with repository guidelines, no unverified email addresses,
 * telephone numbers, physical office addresses, or response guarantees
 * have been fabricated. Update these fields once verified details are approved.
 */

export const CONTACT_CONFIG = {
  // Flag indicating whether production contact channels are finalized by project lead
  hasVerifiedContactDetails: false,

  // Configurable channels (placeholders clearly flagged for project lead review)
  channels: [
    {
      id: 'general',
      title: 'General Project Inquiries',
      description: 'Initial inquiries regarding digital products, system consulting, and project feasibility.',
      badge: 'Direct Channel',
      actionLabel: 'Use Contact Form Below',
      actionHref: '#contact-form'
    },
    {
      id: 'engineering',
      title: 'Service & Development Inquiries',
      description: 'Detailed technical briefs for web applications, Android development, APIs, and databases.',
      badge: 'Technical Scoping',
      actionLabel: 'Specify In Project Brief',
      actionHref: '#contact-form'
    },
    {
      id: 'collaboration',
      title: 'Partnerships & Collaboration',
      description: 'Strategic technology partnerships, vendor integration, and joint engineering ventures.',
      badge: 'Ecosystem',
      actionLabel: 'Submit Partnership Inquiry',
      actionHref: '#contact-form'
    }
  ],

  // Form options
  services: [
    { value: 'web', label: 'Web Applications & Systems' },
    { value: 'android', label: 'Native Android Applications' },
    { value: 'business', label: 'Custom Business Software & Automation' },
    { value: 'api', label: 'Backend APIs & Cloud Architecture' },
    { value: 'database', label: 'Database Design & Optimization' },
    { value: 'ui-ux', label: 'UI/UX Interface Engineering' }
  ],

  budgetRanges: [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 – $15,000' },
    { value: '15k-35k', label: '$15,000 – $35,000' },
    { value: '35k-plus', label: '$35,000+' },
    { value: 'undecided', label: 'To be determined / In scoping' }
  ],

  timelines: [
    { value: 'urgent', label: 'Less than 1 Month' },
    { value: 'standard', label: '1 – 3 Months' },
    { value: 'medium', label: '3 – 6 Months' },
    { value: 'flexible', label: 'Flexible / Phased Milestone' }
  ],

  // Response expectations policy
  responsePolicy: {
    notice: 'Project inquiry reviews are conducted directly by our technical engineering team. Inquiries submitted via this portal receive initial technical scoping feedback within our standard business evaluation window.',
    isGuaranteedTimeframeConfirmed: false
  },

  // Backend Integration status
  backendIntegration: {
    isAvailable: false,
    endpointUrl: null, // Set by project lead (e.g. '/api/contact' or serverless webhook)
    integrationNotice: 'No backend API endpoint or external email dispatch service is currently configured in this codebase repository. Submissions are rigorously validated on the client side, prepared for API transmission, and presented with transparent integration feedback.'
  }
};
