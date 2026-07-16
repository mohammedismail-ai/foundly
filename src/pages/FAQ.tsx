import { useState } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const FAQ_ITEMS = [
  {
    question: 'How do Foundly Smart QR tags work?',
    answer: 'Each Foundly tag contains a unique, weather-proof QR code. When you receive your tag, scan it using your smartphone and link it to your name, phone number, and optionally your email and address. If you lose your item, a finder scans the code and is prompted to call or WhatsApp you instantly.'
  },
  {
    question: 'Is my personal contact information safe?',
    answer: 'Yes. Foundly is privacy-first. When a finder scans your tag, they will only see the contact details you chose to share. We do not expose your email address or phone number publicly on the scan page unless you explicitly verify those details for direct calls.'
  },
  {
    question: 'Are there any monthly subscription or registration fees?',
    answer: 'No. Foundly is a one-time purchase. Once you buy a tag, card, or sticker, activation is free for life. There are absolutely no hidden costs, monthly fees, or subscription charges.'
  },
  {
    question: 'Do I need a special app to scan or activate the QR code?',
    answer: 'No apps are required. Any smartphone with a standard built-in camera app can scan our QR tags. It opens directly in the mobile browser.'
  },
  {
    question: 'Can I change my registered phone number or address later?',
    answer: 'Absolutely. You can log into your dashboard at any time to update your contact information, add notes, or change the active state of your tag.'
  },
  {
    question: 'Are the stickers and tags waterproof and durable?',
    answer: 'Yes. Our keychains are made from premium marine-grade stainless steel and zinc alloys. Stickers and decals use 3M industrial adhesives and a weather-proof, scratch-proof protective laminate designed to withstand water, heat, and sunlight.'
  },

];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(prev => prev === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-accent/10 mb-4 text-accent">
            <HelpCircle className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Got questions? We have answers. Find everything you need to know about Foundly QR tags.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-base sm:text-lg focus:outline-none"
                >
                  <span>{item.question}</span>
                  <span className="ml-4 p-1 hover:bg-muted rounded-lg transition-colors flex-shrink-0">
                    {isOpen ? <Minus className="h-5 w-5 text-accent" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
