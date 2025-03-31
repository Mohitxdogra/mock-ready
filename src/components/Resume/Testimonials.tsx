import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    image: "https://i.pravatar.cc/150?img=1",
    content: "Mock Ready helped me create a stunning resume that landed me my dream job. The interface is intuitive and the results are professional.",
  },
  {
    name: "Michael Chen",
    role: "Product Manager at Microsoft",
    image: "https://i.pravatar.cc/150?img=2",
    content: "The best resume builder I've ever used. The dark theme and modern design make it a pleasure to work with. Highly recommended!",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer at Apple",
    image: "https://i.pravatar.cc/150?img=3",
    content: "Mock Ready's attention to design and typography made my resume stand out. I received multiple interview calls within a week!",
  },
  {
    name: "David Kim",
    role: "Data Scientist at Amazon",
    image: "https://i.pravatar.cc/150?img=4",
    content: "The PDF export feature is fantastic. The resumes look professional and maintain perfect formatting across different devices.",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-[#0A1929]" id="testimonials">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-pink-500 sm:text-5xl">
            What Our Users Say
          </h2>
          <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Don't just take our word for it. Here's what professionals who've used Mock Ready have to say.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-pink-500">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-pink-500 text-white">{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-300">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 