import { useState } from 'react'
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "Who can donate blood?",
      answer: "Generally, anyone aged 18-65, weighing over 50kg, and in good health can donate blood. Specific medical conditions and recent activities may affect eligibility."
    },
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 12 weeks (3 months). This allows your body to replenish iron stores and maintain good health between donations."
    },
    {
      question: "How long does the donation process take?",
      answer: "The actual blood donation takes about 8-10 minutes. However, the entire process, including registration, screening, and recovery, takes about 45-60 minutes."
    },
    {
      question: "Is blood donation safe?",
      answer: "Yes, blood donation is very safe. All equipment is sterile and used only once. Our staff are trained professionals who follow strict safety protocols."
    },
    {
      question: "What should I do before donating blood?",
      answer: "Get adequate sleep, eat a healthy meal, drink plenty of fluids, and avoid fatty foods before donation. Bring a valid ID and list of medications you're taking."
    },
    {
      question: "How is my blood used?",
      answer: "Your donated blood helps patients needing transfusions during surgery, cancer treatment, after accidents, or for blood disorders. One donation can save up to three lives."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-600 text-sm font-semibold tracking-wide uppercase">
            Got Questions?
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about blood donation and our services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <FaQuestionCircle className={`flex-shrink-0 text-xl ${
                    openIndex === index ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <span className="text-left font-medium text-gray-900">
                    {faq.question}
                  </span>
                </div>
                <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  {openIndex === index ? (
                    <FaMinus className="text-red-600" />
                  ) : (
                    <FaPlus className="text-gray-400" />
                  )}
                </div>
              </button>
              
              <div className={`
                overflow-hidden transition-all duration-300
                ${openIndex === index ? 'max-h-96 mt-2' : 'max-h-0'}
              `}>
                <div className="p-6 bg-red-50 rounded-xl">
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  )
}

export default FAQ 