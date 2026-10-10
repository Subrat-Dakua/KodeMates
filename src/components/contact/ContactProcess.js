/**
 * ContactProcess Component
 * Step 05: Visual breakdown of the KodMates technical onboarding workflow.
 */

export function createContactProcess() {
  const steps = [
    {
      num: '01',
      title: 'Technical Discovery & Scoping',
      desc: 'We review your business goals, target user workflows, and constraints. An engineering lead schedules a 30-minute discovery session to clarify deliverables.'
    },
    {
      num: '02',
      title: 'Architecture & Transparent Proposal',
      desc: 'We define the data model, system contracts, cloud infrastructure, and milestone timeline. You receive a fixed-scope technical roadmap before commitment.'
    },
    {
      num: '03',
      title: 'Milestone Execution & Delivery',
      desc: 'Development proceeds in test-driven two-week sprints with staging previews, weekly asynchronous video walkthroughs, and production deployment checklists.'
    }
  ];

  const stepsMarkup = steps.map((s, idx) => `
    <div class="contact-process-card" data-step="${s.num}">
      <div class="contact-process-num">${s.num}</div>
      <h3 class="contact-process-card__title">${s.title}</h3>
      <p class="contact-process-card__desc">${s.desc}</p>
      ${idx < steps.length - 1 ? '<div class="contact-process-connector" aria-hidden="true"></div>' : ''}
    </div>
  `).join('');

  return `
    <section class="contact-process-section" id="inquiry-process" aria-label="Project Engagement Process">
      <div class="contact-process__container">
        <div class="contact-section-heading">
          <span class="contact-section-eyebrow">HOW WE ENGAGE</span>
          <h2 class="contact-section-title">What Happens After You Reach Out</h2>
          <p class="contact-section-sub">
            A disciplined, engineer-led process designed to minimize ambiguity, prevent scope creep, and accelerate production delivery.
          </p>
        </div>

        <div class="contact-process-grid">
          ${stepsMarkup}
        </div>
      </div>
    </section>
  `;
}
