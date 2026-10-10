/**
 * Article: How to Plan a Web Application Before Development
 * Author: KodMates Technical Team
 */

export const webAppPlanningArticle = {
  id: 'art-001',
  slug: 'how-to-plan-a-web-application',
  title: 'How to Plan a Web Application Before Development',
  summary: 'A disciplined engineering blueprint covering requirements scoping, architecture tradeoffs, state and data flow modelling, and dependency mapping before writing the first line of code.',
  category: 'Web Development',
  author: {
    name: 'KodMates Technical Team',
    role: 'Core Systems & Architecture'
  },
  publishedAt: '2026-09-15',
  updatedAt: '2026-09-18',
  readTime: '7 min read',
  featured: true,
  tags: ['Web Development', 'Architecture', 'Scoping', 'Software Engineering'],
  coverGradient: 'linear-gradient(135deg, rgba(254, 239, 184, 0.18) 0%, rgba(20, 26, 26, 0.85) 100%)',
  accentColor: '#FEEFB8',
  sections: [
    {
      id: 'scoping-operational-boundaries',
      title: '1. Establish Clear Operational Boundaries',
      content: `
        <p>The majority of software development delays stem from ambiguity at the perimeter of the application. Before selecting frameworks or defining schemas, software teams must define what the system will <em>not</em> do during its initial release.</p>
        <p>A rigorous operational boundary document specifies:</p>
        <ul>
          <li><strong>Primary user personas and their access tiers</strong>: Admin, standard operator, read-only auditor, API integration client.</li>
          <li><strong>Data throughput expectations</strong>: Baseline concurrent active users, daily read/write volume, peak traffic windows.</li>
          <li><strong>External interface contracts</strong>: Third-party authentication, payment processors, telemetry providers, and storage buckets.</li>
        </ul>
        <div class="article-callout">
          <div class="article-callout__title">Engineering Takeaway</div>
          <p>Treat unstated requirements as potential technical debt. If a requirement cannot be expressed as an observable input/output contract, it is not yet ready for the backlog.</p>
        </div>
      `
    },
    {
      id: 'evaluating-architectural-tradeoffs',
      title: '2. Evaluate Architectural Tradeoffs Early',
      content: `
        <p>Decisions around client-side rendering (CSR), server-side rendering (SSR), and static site generation (SSG) should be determined by data mutation frequency and search indexability needs, not developer convenience.</p>
        <div class="article-comparison-table-wrapper">
          <table class="article-table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Ideal Workload</th>
                <th>Tradeoff</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Client-Side SPA</strong></td>
                <td>Data-dense operational dashboards, internal SaaS tools</td>
                <td>Slower first-contentful-paint, complex client caching</td>
              </tr>
              <tr>
                <td><strong>Server-Driven SSR</strong></td>
                <td>Dynamic e-commerce, content platforms, multi-tenant portals</td>
                <td>Higher server compute load, server hydration overhead</td>
              </tr>
              <tr>
                <td><strong>Decoupled Micro-Frontends</strong></td>
                <td>Enterprise multi-team distributed release cadences</td>
                <td>Substantial operational overhead, coordination complexity</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'data-modeling-and-state-boundaries',
      title: '3. Model Data Lifecycles and State Boundaries',
      content: `
        <p>Before designing database tables, map the complete lifecycle of core business entities from creation to archival. Identify which state transitions are atomic and which can be eventual.</p>
        <pre class="code-block" data-language="txt"><code>[User Input / Webhook]
        ↓
  [Edge Validation & Sanitization]
        ↓
  [Domain Service / Transaction Boundary]
   ├── Write Primary Record (PostgreSQL / Relational)
   ├── Enqueue Async Work (Redis / Worker Queue)
   └── Broadcast Real-Time Delta (WebSockets / SSE)
        ↓
  [Idempotent Audit Log]</code></pre>
        <p>Clearly segregating transactional writes from asynchronous side-effects prevents cascading failures when external notification systems or analytics pipelines experience latency.</p>
      `
    },
    {
      id: 'security-and-compliance-foundations',
      title: '4. Security and Compliance Foundations',
      content: `
        <p>Security is difficult to retrofit into an established codebase. The initial technical plan must address five fundamental controls:</p>
        <ol>
          <li><strong>Authentication & Token Management:</strong> HttpOnly secure cookies with short-lived access tokens and refresh rotation.</li>
          <li><strong>Strict Content Security Policy (CSP):</strong> Explicit allow-lists for scripts, styles, fonts, and WebSocket endpoints.</li>
          <li><strong>Input Boundary Sanitization:</strong> Schema validation at the controller layer (e.g. Zod, Joi) prior to database execution.</li>
          <li><strong>CORS & Rate Limiting:</strong> Granular IP and authenticated user token rate quotas.</li>
          <li><strong>Role-Based Access Control (RBAC):</strong> Declared permission sets checked at middleware entry points.</li>
        </ol>
      `
    },
    {
      id: 'delivery-milestones',
      title: '5. Phased Delivery & Measurable Milestones',
      content: `
        <p>Break the implementation into verifiable technical releases rather than broad visual stages:</p>
        <ul>
          <li><strong>Milestone 1 — Core Data Layer & Identity:</strong> Schemas deployed, migrations repeatable, auth contracts passing integration tests.</li>
          <li><strong>Milestone 2 — Critical User Journey (CUJ):</strong> Single end-to-end transaction pathway functioning with zero mocked services.</li>
          <li><strong>Milestone 3 — Edge Cases & Resilience:</strong> Network timeout simulations, concurrent submission handling, rate-limit responses.</li>
          <li><strong>Milestone 4 — Production Hardening:</strong> CDN caching, performance auditing, telemetry dashboards, automated database snapshots.</li>
        </ul>
      `
    }
  ]
};
