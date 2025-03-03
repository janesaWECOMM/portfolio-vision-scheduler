
import { useEffect, useRef } from "react";
import { 
  Users, 
  Lightbulb, 
  LineChart, 
  MessageCircle, 
  Rocket, 
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <div 
    className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-lg opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
  >
    <div className="h-12 w-12 rounded-full bg-boost-purple/10 flex items-center justify-center mb-4">
      <div className="text-boost-purple">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
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

  const features = [
    {
      icon: <Users size={24} />,
      title: "Team Building",
      description: "Foster stronger connections and improve collaboration within your teams.",
      delay: 100
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Innovation Workshops",
      description: "Unlock creative thinking and develop innovative solutions to complex problems.",
      delay: 200
    },
    {
      icon: <LineChart size={24} />,
      title: "Performance Optimization",
      description: "Identify bottlenecks and streamline processes to enhance team productivity.",
      delay: 300
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Communication Skills",
      description: "Improve interpersonal communication and presentation abilities.",
      delay: 400
    },
    {
      icon: <Rocket size={24} />,
      title: "Leadership Development",
      description: "Cultivate leadership qualities and management skills at all organizational levels.",
      delay: 500
    },
    {
      icon: <Zap size={24} />,
      title: "Rapid Skill Acquisition",
      description: "Accelerate learning and adoption of new skills and technologies.",
      delay: 600
    }
  ];

  return (
    <section className="py-24 px-4" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transformative <span className="text-gradient">Workshop Experiences</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Our specialized programs are designed to address specific needs and challenges faced by modern teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
