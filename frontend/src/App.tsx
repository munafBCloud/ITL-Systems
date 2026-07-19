import { useState, type FormEvent } from 'react'
import itlLogo from './assets/itl-systems-logo.png'
import './App.css'

const services = [
  {
    icon: '🤖',
    title: 'AI Lead Follow-Up',
    description:
      'Respond to new leads faster, recover missed opportunities, and improve customer follow-up.',
  },
  {
    icon: '⚙️',
    title: 'Workflow Automation',
    description:
      'Reduce repetitive work by connecting business processes, customer data, and everyday tools.',
  },
  {
    icon: '☁️',
    title: 'Cloud Solutions',
    description:
      'Build secure, scalable forms, APIs, dashboards, and business applications in the cloud.',
  },
  {
    icon: '📊',
    title: 'Data & Dashboards',
    description:
      'Turn business information into clear reporting that supports faster and better decisions.',
  },
  {
    icon: '🌐',
    title: 'Digital Experiences',
    description:
      'Create modern websites and customer-facing tools that improve how people engage with your business.',
  },
  {
    icon: '🔐',
    title: 'Security & Reliability',
    description:
      'Strengthen business systems with practical security controls, validation, monitoring, and documentation.',
  },
]

const workflowSteps = [
  'Customer submits an inquiry',
  'Lead information is captured automatically',
  'The business receives the request immediately',
  'Customer data is stored for organized follow-up',
]

function App() {
  const [formMessage, setFormMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const inquiry = {
      companyName: String(formData.get('companyName') ?? '').trim(),
      contactName: String(formData.get('contactName') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      serviceType: String(formData.get('serviceType') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    }

    setIsSubmitting(true)
    setFormMessage('')

    try {
      const response = await fetch(
        'https://x7uxhbqddl.execute-api.us-east-1.amazonaws.com/dev/inquiries',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inquiry),
        },
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to submit your inquiry.')
      }

      form.reset()

      setFormMessage(
        'Thank you. Your consultation request has been submitted successfully.',
      )
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'

      setFormMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="site-shell">
      <header className="hero-section">
        <nav className="navbar">
          <a className="brand" href="#top" aria-label="ITL Systems home">
            <img
              className="brand-logo"
              src={itlLogo}
              alt="ITL Systems"
            />
          </a>

          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#work">Our Work</a>
            <a href="#contact">Contact</a>
          </div>

          <a className="nav-button" href="#contact">
            Request Consultation
          </a>
        </nav>

        <div className="hero-content" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              Business systems built for real-world growth
            </p>

            <h1>
              Smart systems.
              <span> Stronger businesses.</span>
            </h1>

            <p className="hero-description">
              ITL Systems helps small businesses modernize operations, automate
              workflows, capture more leads, and build scalable technology
              solutions without unnecessary complexity.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#contact">
                Request Consultation
              </a>

              <a className="secondary-button" href="#services">
                Explore Solutions
              </a>
            </div>

            <div className="hero-trust">
              <span>Cloud architecture</span>
              <span>Workflow automation</span>
              <span>Business modernization</span>
            </div>
          </div>

          <div className="workflow-card">
            <div className="workflow-card-header">
              <div>
                <p className="card-label">Example workflow</p>
                <h2>From inquiry to follow-up</h2>
              </div>

              <span className="status-badge">Automated</span>
            </div>

            <div className="workflow-list">
              {workflowSteps.map((step, index) => (
                <div className="workflow-step" key={step}>
                  <span className="step-number">{index + 1}</span>

                  <div>
                    <p>{step}</p>

                    <span>
                      {index === 0 && 'Website or customer portal'}
                      {index === 1 && 'API and validation layer'}
                      {index === 2 && 'Instant business notification'}
                      {index === 3 && 'Secure cloud database'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="workflow-note">
              Practical automation that improves response time and reduces
              manual work.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section className="services-section" id="services">
          <div className="section-heading">
            <p className="eyebrow">What we build</p>

            <h2>Technology solutions designed around your business</h2>

            <p>
              We focus on systems that solve operational problems, improve the
              customer experience, and create measurable business value.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <a href="#contact">Discuss this solution →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="section-heading">
            <p className="eyebrow">How we work</p>

            <h2>A practical process built around your business</h2>

            <p>
              We understand the workflow first, then design and build the right
              system. The goal is to reduce friction, improve visibility, and
              create measurable value.
            </p>
          </div>

          <div className="process-grid">
            <article className="process-card">
              <span>01</span>
              <h3>Discover</h3>

              <p>
                We review your current workflow, pain points, tools, customer
                journey, and business goals.
              </p>
            </article>

            <article className="process-card">
              <span>02</span>
              <h3>Design</h3>

              <p>
                We map the solution, data flow, integrations, security
                requirements, and expected business outcomes.
              </p>
            </article>

            <article className="process-card">
              <span>03</span>
              <h3>Build</h3>

              <p>
                We create the application, automation, dashboard, cloud
                infrastructure, or digital experience.
              </p>
            </article>

            <article className="process-card">
              <span>04</span>
              <h3>Improve</h3>

              <p>
                We test the system, review performance, collect feedback, and
                refine the solution over time.
              </p>
            </article>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>

            <h2>Systems designed to solve real business problems</h2>

            <p>
              These projects demonstrate cloud architecture, workflow
              automation, customer experience design, data management, and
              systems integration.
            </p>
          </div>

          <div className="work-grid">
            <article className="work-card featured">
              <div className="work-card-top">
                <span className="work-type">Cloud application</span>
                <span className="work-status">Operational</span>
              </div>

              <h3>YNJ Vend Inventory and Customer Request Platform</h3>

              <p>
                A serverless business application for managing inventory,
                customers, and product requests through a secure AWS backend and
                modern customer portal.
              </p>

              <div className="work-tags">
                <span>React</span>
                <span>TypeScript</span>
                <span>API Gateway</span>
                <span>Lambda</span>
                <span>DynamoDB</span>
              </div>

              <ul>
                <li>Centralized product and customer data</li>
                <li>Public inventory availability endpoint</li>
                <li>Request tracking and workflow management</li>
                <li>Secure validation and server-generated records</li>
              </ul>
            </article>

            <article className="work-card">
              <div className="work-card-top">
                <span className="work-type">Business automation</span>
                <span className="work-status">Operational</span>
              </div>

              <h3>ITL Systems Lead Capture Platform</h3>

              <p>
                A production-ready inquiry system that captures consultation
                requests, validates customer data, and stores leads in a
                scalable cloud database.
              </p>

              <div className="work-tags">
                <span>Terraform</span>
                <span>AWS</span>
                <span>Lambda</span>
                <span>DynamoDB</span>
                <span>CloudFront</span>
              </div>

              <ul>
                <li>Serverless inquiry processing</li>
                <li>Infrastructure managed through Terraform</li>
                <li>Custom domain and CDN deployment</li>
                <li>Secure input validation and error handling</li>
              </ul>
            </article>

            <article className="work-card">
              <div className="work-card-top">
                <span className="work-type">Workflow application</span>
                <span className="work-status">Portfolio project</span>
              </div>

              <h3>Architecture Decision Simulation</h3>

              <p>
                An interactive Power Apps assessment that evaluates architecture
                decisions, calculates hidden scores, and presents role-based
                results.
              </p>

              <div className="work-tags">
                <span>Power Apps</span>
                <span>Dataverse</span>
                <span>Power BI</span>
                <span>Automation</span>
              </div>

              <ul>
                <li>Scenario-based decision workflow</li>
                <li>Structured assessment data</li>
                <li>Automated scoring and career ranking</li>
                <li>Power BI performance reporting</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Request a consultation</p>

              <h2>Let’s discuss what is slowing your business down</h2>

              <p>
                Tell us about your current workflow, technology needs, or
                operational challenges. We’ll review the request and identify
                practical next steps.
              </p>

              <div className="contact-benefits">
                <div>
                  <span>01</span>
                  <p>Review your current process and business goals</p>
                </div>

                <div>
                  <span>02</span>
                  <p>
                    Identify automation and modernization opportunities
                  </p>
                </div>

                <div>
                  <span>03</span>
                  <p>Recommend a secure and cost-conscious solution</p>
                </div>
              </div>
            </div>

            <form className="consultation-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  Company name
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Your company"
                    maxLength={100}
                  />
                </label>

                <label>
                  Contact name
                  <input
                    type="text"
                    name="contactName"
                    placeholder="Your name"
                    maxLength={100}
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    maxLength={150}
                    required
                  />
                </label>

                <label>
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    maxLength={30}
                    required
                  />
                </label>
              </div>

              <label>
                Service needed
                <select name="serviceType" defaultValue="" required>
                  <option value="" disabled>
                    Select a service
                  </option>

                  <option value="AI Lead Follow-Up">
                    AI Lead Follow-Up
                  </option>

                  <option value="Workflow Automation">
                    Workflow Automation
                  </option>

                  <option value="Cloud Solutions">
                    Cloud Solutions
                  </option>

                  <option value="Data and Dashboards">
                    Data and Dashboards
                  </option>

                  <option value="Digital Experiences">
                    Digital Experiences
                  </option>

                  <option value="Security and Reliability">
                    Security and Reliability
                  </option>

                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                Tell us about your needs
                <textarea
                  name="message"
                  placeholder="Describe the workflow, challenge, or project you would like help with."
                  rows={6}
                  maxLength={2000}
                />
              </label>

              <button
                className="submit-button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Submitting…'
                  : 'Submit consultation request'}
              </button>

              {formMessage && (
                <p className="form-message" role="status">
                  {formMessage}
                </p>
              )}

              <p className="form-privacy">
                Your information is used only to respond to your consultation
                request.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <strong>ITL Systems</strong>

          <p>Business technology solutions for growing organizations.</p>
        </div>

        <p>© 2026 ITL Systems. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
