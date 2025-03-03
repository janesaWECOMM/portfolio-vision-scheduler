import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
  companyLogo?: string;
  rating: number;
}
const testimonials: Testimonial[] = [{
  content: "As someone with a personal interest in AI, I was excited to learn more about GenAI and ChatGPT in the highly interactive, cosy setting. It was insightful and useful to learn how these tools can be applied in the workplace, especially with the hands-on activities and cheat sheets!",
  author: "Margaret Tan",
  position: "Marketing Manager",
  company: "IMDA",
  companyLogo: "/lovable-uploads/2e27ac3e-af50-4d23-89f3-1255623f32ff.png",
  rating: 5
}, {
  content: "I was impressed by the facilitators' expertise and industry knowledge. It was clear that they were experienced professionals who are up to date with the latest market trends. I only wish that the session could have been longer!",
  author: "Kenneth Ng",
  position: "Manager, Content Development & Strategy",
  company: "Sembcorp Industries",
  companyLogo: "/lovable-uploads/2c72ee4d-a664-4080-83e4-11cc69257155.png",
  rating: 5
}];
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const nextTestimonial = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-white to-boost-purple/5 opacity-0" style={{
    animationFillMode: 'forwards',
    animationDelay: "200ms"
  }}>
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <span className="text-boost-orange text-5xl font-bold">*</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Boosties Say...
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            Read what our attendees have to say about their Boost experience
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center">
              <div className="text-boost-orange mr-2">
                {Array.from({
                length: 5
              }).map((_, i) => <Star key={i} size={16} className="inline-block fill-current" />)}
              </div>
              <span className="text-2xl font-bold text-boost-orange">4.8/5</span>
            </div>
            <div className="text-muted-foreground">|</div>
            <div className="flex items-center">
              <div className="text-boost-orange mr-2">
                {Array.from({
                length: 5
              }).map((_, i) => <Star key={i} size={16} className="inline-block fill-current" />)}
              </div>
              <span className="text-2xl font-bold text-boost-orange">4.5/5</span>
            </div>
            <div className="text-muted-foreground">|</div>
            <div className="flex items-center">
              <div className="text-boost-orange mr-2">
                {Array.from({
                length: 5
              }).map((_, i) => <Star key={i} size={16} className="inline-block fill-current" />)}
              </div>
              <span className="text-2xl font-bold text-boost-orange">4.5/5</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            
            <p className="mt-1">*All ratings presented are directly from the feedback of Boost attendees.</p>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="glass rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="text-boost-orange mb-8">
              {Array.from({
              length: testimonials[currentIndex].rating
            }).map((_, i) => <Star key={i} size={20} className="inline-block fill-current mr-1" />)}
            </div>
            
            <blockquote className="text-xl md:text-2xl mb-8 italic">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <div className="flex items-center">
              {testimonials[currentIndex].companyLogo && <img src={testimonials[currentIndex].companyLogo} alt={testimonials[currentIndex].company} className="h-12 mr-4" />}
              <div>
                <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
                <p className="text-muted-foreground">
                  {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
            
            <div className="absolute right-8 bottom-8 md:right-12 md:bottom-12 flex space-x-2">
              <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full h-10 w-10">
                <ArrowLeft size={18} />
              </Button>
              <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full h-10 w-10">
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center space-x-2">
            {testimonials.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-boost-purple" : "w-2 bg-muted"}`} aria-label={`Go to testimonial ${index + 1}`} />)}
          </div>
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;