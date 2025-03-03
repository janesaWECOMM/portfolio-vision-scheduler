
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    content: "The innovation workshop transformed how our team approaches problem-solving. We've seen a 30% increase in successful project outcomes since implementing the strategies.",
    author: "Sarah Johnson",
    position: "Head of Product",
    company: "TechInnovate",
    rating: 5
  },
  {
    content: "Boost's leadership program gave our managers the tools they needed to effectively guide their teams through our digital transformation. Highly recommended!",
    author: "Michael Chen",
    position: "CTO",
    company: "Future Systems",
    rating: 5
  },
  {
    content: "The team building workshop was exactly what we needed after transitioning to a hybrid work model. It helped restore our collaborative culture despite the physical distance.",
    author: "Lisa Rodriguez",
    position: "HR Director",
    company: "Global Connect",
    rating: 4
  },
  {
    content: "Our communication challenges were significantly reduced after Boost's workshop. The facilitators created a safe space for honest conversation and growth.",
    author: "David Kim",
    position: "Operations Manager",
    company: "Streamline Inc.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-background to-secondary/50 opacity-0"
      style={{ animationFillMode: 'forwards', animationDelay: "200ms" }}
    >
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Real feedback from organizations that have experienced our workshops.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="glass rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="text-boost-orange mb-8">
              {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                <Star key={i} size={20} className="inline-block fill-current mr-1" />
              ))}
            </div>
            
            <blockquote className="text-xl md:text-2xl mb-8 italic">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <div>
              <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
              <p className="text-muted-foreground">
                {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
              </p>
            </div>
            
            <div className="absolute right-8 bottom-8 md:right-12 md:bottom-12 flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevTestimonial}
                className="rounded-full h-10 w-10"
              >
                <ArrowLeft size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextTestimonial}
                className="rounded-full h-10 w-10"
              >
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-boost-purple" : "w-2 bg-muted"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
