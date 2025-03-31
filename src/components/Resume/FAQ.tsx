import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is Mock Ready Resume Builder really free?",
    answer: "Yes! Mock Ready Resume Builder is completely free for basic use. You can create, edit, and download your resume in PDF format without any cost."
  },
  {
    question: "Do I need to create an account?",
    answer: "No, you don't need to create an account to use our resume builder. You can start creating your resume right away without any registration."
  },
  {
    question: "What formats can I download my resume in?",
    answer: "Currently, we support PDF format for all resumes. This ensures your resume maintains consistent formatting across all devices and platforms."
  },
  {
    question: "Can I create multiple resumes?",
    answer: "Yes! You can create as many different versions of your resume as you need, all for free."
  },
  {
    question: "Is my data secure?",
    answer: "We take data privacy seriously. Since we don't require account creation, your data remains in your browser and is not stored on our servers."
  },
  {
    question: "Can I customize the design of my resume?",
    answer: "Yes, you can customize colors, fonts, and layout options to make your resume stand out while maintaining professional standards."
  }
]

export function FAQ() {
  return (
    <section className="py-24 bg-background" id="faq">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Everything you need to know about Mock Ready Resume Builder
          </p>
        </div>
        <div className="mx-auto max-w-3xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
} 