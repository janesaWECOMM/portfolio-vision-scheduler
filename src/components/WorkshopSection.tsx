
import { useState } from "react";
import { Check, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Workshop {
  id: string;
  title: string;
  description: string;
  duration: string;
  capacity: string;
  format: "In-person" | "Virtual" | "Hybrid";
  topics: string[];
  popular: boolean;
}

const workshops: Workshop[] = [
  {
    id: "innovation-sprint",
    title: "Innovation Sprint",
    description: "A high-energy workshop designed to generate breakthrough ideas and solutions for specific business challenges.",
    duration: "1-2 days",
    capacity: "10-30 participants",
    format: "Hybrid",
    topics: ["Design Thinking", "Rapid Prototyping", "User Testing"],
    popular: true
  },
  {
    id: "team-synergy",
    title: "Team Synergy",
    description: "Build stronger connections and improve collaboration among team members through interactive exercises.",
    duration: "1 day",
    capacity: "8-20 participants",
    format: "In-person",
    topics: ["Trust Building", "Communication", "Conflict Resolution"],
    popular: false
  },
  {
    id: "leadership-excellence",
    title: "Leadership Excellence",
    description: "Develop key leadership competencies and learn to inspire and motivate high-performing teams.",
    duration: "2 days",
    capacity: "5-15 participants",
    format: "Hybrid",
    topics: ["Emotional Intelligence", "Strategic Thinking", "Coaching Skills"],
    popular: true
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    description: "Navigate the challenges of digital change and leverage technology to enhance team performance.",
    duration: "1-3 days",
    capacity: "10-30 participants",
    format: "Virtual",
    topics: ["Change Management", "Digital Tools", "Agile Methodologies"],
    popular: false
  }
];

const WorkshopSection = () => {
  const [activeFormat, setActiveFormat] = useState<string | null>(null);
  
  const filteredWorkshops = activeFormat 
    ? workshops.filter(workshop => workshop.format === activeFormat)
    : workshops;

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient">Workshop Programs</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Choose from our carefully designed workshops to address your team's specific needs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button 
              variant={activeFormat === null ? "default" : "outline"}
              onClick={() => setActiveFormat(null)}
              className={activeFormat === null ? "button-gradient text-white" : ""}
            >
              All Formats
            </Button>
            <Button 
              variant={activeFormat === "In-person" ? "default" : "outline"}
              onClick={() => setActiveFormat("In-person")}
              className={activeFormat === "In-person" ? "button-gradient text-white" : ""}
            >
              In-person
            </Button>
            <Button 
              variant={activeFormat === "Virtual" ? "default" : "outline"}
              onClick={() => setActiveFormat("Virtual")}
              className={activeFormat === "Virtual" ? "button-gradient text-white" : ""}
            >
              Virtual
            </Button>
            <Button 
              variant={activeFormat === "Hybrid" ? "default" : "outline"}
              onClick={() => setActiveFormat("Hybrid")}
              className={activeFormat === "Hybrid" ? "button-gradient text-white" : ""}
            >
              Hybrid
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredWorkshops.map((workshop) => (
            <div key={workshop.id} className="glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{workshop.title}</h3>
                  {workshop.popular && (
                    <Badge className="bg-boost-orange text-white hover:bg-boost-orange/90">Popular</Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-6">{workshop.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Clock size={18} className="mr-2 text-boost-purple" />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users size={18} className="mr-2 text-boost-purple" />
                    <span>{workshop.capacity}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {workshop.topics.map((topic, index) => (
                    <div key={index} className="flex items-center text-sm bg-secondary px-3 py-1 rounded-full">
                      <Check size={14} className="mr-1 text-boost-purple" />
                      {topic}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{workshop.format}</Badge>
                  <Button asChild>
                    <Link to={`/schedule?workshop=${workshop.id}`}>Schedule Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="button-gradient text-white px-8 py-6 text-lg rounded-full" asChild>
            <Link to="/workshops">View All Workshop Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkshopSection;
