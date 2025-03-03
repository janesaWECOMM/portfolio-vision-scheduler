import { useState } from "react";
import { Clock, Users, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface Workshop {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  capacity: string;
  price: string;
  popular: boolean;
  image: string;
}
const workshops: Workshop[] = [{
  id: "creative-magic-genai",
  title: "Creative Magic with GenAI",
  category: "101 Workshop",
  description: "Unlock the power of AI for creative work with tools like ChatGPT and Adobe Firefly.",
  duration: "2 hours",
  capacity: "Up to 20 pax per session",
  price: "SGD 3,000",
  popular: true,
  image: "/lovable-uploads/de03f0f5-d4a3-4510-9366-7e1bfb892be7.png"
}, {
  id: "social-media-launchpad",
  title: "Your Social Media Launchpad",
  category: "101 Workshop",
  description: "Build your personal brand and leverage content marketing trends on social media.",
  duration: "2 hours",
  capacity: "Up to 20 pax per session",
  price: "SGD 3,000",
  popular: false,
  image: "/lovable-uploads/4dd2c0c4-7e03-41f8-bcc2-b0d67a5e25e2.png"
}, {
  id: "pocket-sized-content",
  title: "Pocket-sized Content Creation",
  category: "101 Workshop",
  description: "Unlock your phone's potential to create captivating bite-sized social media content.",
  duration: "2 hours",
  capacity: "Up to 20 pax per session",
  price: "SGD 3,000",
  popular: false,
  image: "/lovable-uploads/bfea2060-5a1f-4f00-893d-a227f094a79b.png"
}, {
  id: "crafting-sticky-stories",
  title: "Crafting Sticky Stories",
  category: "Deep-dive Series",
  description: "Impactful social media narratives and storytelling techniques that captivate audiences.",
  duration: "2 hours",
  capacity: "Up to 20 pax per session",
  price: "SGD 4,500",
  popular: true,
  image: "/lovable-uploads/a73dec9a-5403-453d-8875-4ae3344ca831.png"
}, {
  id: "presentations-own-room",
  title: "Presentations: Own Any Room",
  category: "Deep-dive Series",
  description: "Master the art of body language, vocal expression, and confidence for powerful presentations.",
  duration: "2 hours",
  capacity: "Up to 20 pax per session",
  price: "SGD 4,500",
  popular: false,
  image: "/lovable-uploads/01a4f59d-3c7f-4d14-b737-76de3317ff38.png"
}, {
  id: "media-training",
  title: "Media Training",
  category: "Mastery Level",
  description: "Professional media training for C-suite executives and leadership roles.",
  duration: "2 hours",
  capacity: "Up to 10 pax per session",
  price: "SGD 10,000",
  popular: false,
  image: "/lovable-uploads/87590080-d4e4-45f7-982a-5f9785b379a6.png"
}];
const WorkshopSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filteredWorkshops = activeCategory ? workshops.filter(workshop => workshop.category === activeCategory) : workshops;
  return <section className="px-4 bg-gradient-to-b from-white to-secondary/30 py-[76px]">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <span className="text-boost-orange text-5xl font-bold">*</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            #getboosted
          </h2>
          <p className="text-xl text-muted-foreground mb-8">Our specialised workshops are designed to supercharge your skills in just 2 hours</p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button variant={activeCategory === null ? "default" : "outline"} onClick={() => setActiveCategory(null)} className={activeCategory === null ? "button-gradient text-white" : ""}>
              All Workshops
            </Button>
            <Button variant={activeCategory === "101 Workshop" ? "default" : "outline"} onClick={() => setActiveCategory("101 Workshop")} className={activeCategory === "101 Workshop" ? "button-gradient text-white" : ""}>
              101 Workshops
            </Button>
            <Button variant={activeCategory === "Deep-dive Series" ? "default" : "outline"} onClick={() => setActiveCategory("Deep-dive Series")} className={activeCategory === "Deep-dive Series" ? "button-gradient text-white" : ""}>
              Deep-dive Series
            </Button>
            <Button variant={activeCategory === "Mastery Level" ? "default" : "outline"} onClick={() => setActiveCategory("Mastery Level")} className={activeCategory === "Mastery Level" ? "button-gradient text-white" : ""}>
              Mastery Level
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkshops.map(workshop => <div key={workshop.id} className="glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 bg-boost-purple/10 overflow-hidden">
                {workshop.image && <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover" />}
                {workshop.popular && <div className="absolute top-4 right-4">
                    <Badge className="bg-boost-orange text-white hover:bg-boost-orange/90 px-3 py-1">
                      <Star className="w-4 h-4 mr-1 fill-current" /> MOST POPULAR
                    </Badge>
                  </div>}
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-boost-purple/20 backdrop-blur-sm text-white">
                    {workshop.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{workshop.title}</h3>
                <p className="text-muted-foreground mb-4">{workshop.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm">
                    <Clock size={18} className="mr-2 text-boost-purple" />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users size={18} className="mr-2 text-boost-purple" />
                    <span>{workshop.capacity}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge className="bg-boost-orange/10 text-boost-orange border-boost-orange">{workshop.price}</Badge>
                  <Button>
                    Schedule Now
                  </Button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default WorkshopSection;