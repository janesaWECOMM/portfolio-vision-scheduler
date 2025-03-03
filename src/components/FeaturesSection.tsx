
import { useEffect, useRef } from "react";
import { Award, Users, Zap, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <div 
    className="glass rounded-xl p-5 transition-all duration-300 hover:shadow-lg opacity-0 animate-fade-in flex-shrink-0 w-[280px]"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
  >
    <div className="h-10 w-10 rounded-full bg-boost-purple/10 flex items-center justify-center mb-3">
      <div className="text-boost-purple">{icon}</div>
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
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
      icon: <Award size={20} />,
      title: "Industry Experts",
      description: "Led by a team in the award-winning WE Communications, our experts and facilitators are industry practitioners well-versed in the current market trends and demand.",
      delay: 100
    },
    {
      icon: <Users size={20} />,
      title: "Community",
      description: "Make meaningful connections and find new opportunities with other industry professionals, students, and learners through our Boost network.",
      delay: 200
    },
    {
      icon: <Zap size={20} />,
      title: "Supercharge in 2 hours",
      description: "With our short, supercharged sessions, you'll get to go home a different person—with newfound knowledge and skills, as well as our favourite cheat sheets from our workshops!",
      delay: 300
    },
    {
      icon: <Heart size={20} />,
      title: "Catered for You",
      description: "Don't be shy with what you don't know! Whether you are a beginner or an experienced professional, we're sure to have something for everyone.",
      delay: 400
    }
  ];

  return (
    <section className="py-24 px-4" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: 'forwards' }}>
          <div className="flex justify-center mb-4">
            <span className="text-boost-orange text-5xl font-bold">*</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Boost?
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the difference with our specialized programs designed for modern professionals.
          </p>
        </div>

        <div className="overflow-x-auto pb-6 -mx-4 px-4">
          <div className="flex space-x-5 w-max">
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
      </div>
    </section>
  );
};

export default FeaturesSection;
