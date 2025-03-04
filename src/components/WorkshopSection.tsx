
import { useState } from "react";
import { Clock, Users, Check, Star, Book, GraduationCap, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const workshops: Workshop[] = [
  // 101 Workshops
  {
    id: "creative-magic-genai",
    title: "Creative Magic with GenAI",
    category: "101 Workshop",
    description: "Unlock the power of AI for creative work with tools like ChatGPT and Adobe Firefly.",
    duration: "2 hours",
    capacity: "Up to 20 pax per session",
    price: "SGD 3,000",
    popular: true,
    image: "/lovable-uploads/de03f0f5-d4a3-4510-9366-7e1bfb892be7.png"
  }, 
  {
    id: "social-media-launchpad",
    title: "Your Social Media Launchpad",
    category: "101 Workshop",
    description: "Build your personal brand and leverage content marketing trends on social media.",
    duration: "2 hours",
    capacity: "Up to 20 pax per session",
    price: "SGD 3,000",
    popular: false,
    image: "/lovable-uploads/4dd2c0c4-7e03-41f8-bcc2-b0d67a5e25e2.png"
  }, 
  {
    id: "pocket-sized-content",
    title: "Pocket-sized Content Creation",
    category: "101 Workshop",
    description: "Unlock your phone's potential to create captivating bite-sized social media content.",
    duration: "2 hours",
    capacity: "Up to 20 pax per session",
    price: "SGD 3,000",
    popular: false,
    image: "/lovable-uploads/bfea2060-5a1f-4f00-893d-a227f094a79b.png"
  },
  {
    id: "active-listening",
    title: "Active Listening & Powerful Questions",
    category: "101 Workshop",
    description: "Master the art of listening and asking questions that drive meaningful conversations and insights.",
    duration: "2 hours",
    capacity: "Up to 20 pax per session",
    price: "SGD 3,000",
    popular: false,
    image: "/lovable-uploads/2c72ee4d-a664-4080-83e4-11cc69257155.png"
  },
  
  // Deep-dive Series
  {
    id: "crafting-sticky-stories",
    title: "Crafting Sticky Stories",
    category: "Deep-dive Series",
    description: "Impactful social media narratives and storytelling techniques that captivate audiences.",
    duration: "2 hours",
    capacity: "Up to 20 pax per session",
    price: "SGD 4,500",
    popular: true,
    image: "/lovable-uploads/a73dec9a-5403-453d-8875-4ae3344ca831.png"
  }, 
  {
    id: "presentations-own-room",
    title: "Presentations: Own Any Room",
    category: "Deep-dive Series",
    description: "Master the art of body language, vocal expression, and confidence for powerful presentations.",
    duration: "2 hours",
    capacity: "Up to 20 pax per session",
    price: "SGD 4,500",
    popular: false,
    image: "/lovable-uploads/01a4f59d-3c7f-4d14-b737-76de3317ff38.png"
  },
  {
    id: "fearless-feedback",
    title: "Fearless Feedback",
    category: "Deep-dive Series",
    description: "Learn to give and receive feedback effectively to foster growth and improvement.",
    duration: "2 hours",
    capacity: "Up to 20 pax per session",
    price: "SGD 4,500",
    popular: false,
    image: "/lovable-uploads/2e27ac3e-af50-4d23-89f3-1255623f32ff.png"
  },
  
  // Mastery Level
  {
    id: "media-training",
    title: "Media Training",
    category: "Mastery Level",
    description: "Professional media training for C-suite executives and leadership roles.",
    duration: "2 hours",
    capacity: "Up to 10 pax per session",
    price: "SGD 10,000",
    popular: false,
    image: "/lovable-uploads/87590080-d4e4-45f7-982a-5f9785b379a6.png"
  },
  {
    id: "building-presence",
    title: "Building Presence and Gravitas",
    category: "Mastery Level",
    description: "Develop executive presence that commands attention and inspires confidence in any setting.",
    duration: "2 hours",
    capacity: "Up to 10 pax per session",
    price: "SGD 10,000",
    popular: true,
    image: "/lovable-uploads/e499411f-5714-4ade-a3d6-6336b0f93d15.png"
  },
  {
    id: "leading-wisely",
    title: "Leading Wisely By Letting Go",
    category: "Mastery Level",
    description: "Learn the art of delegation and empowering your team to achieve greater results.",
    duration: "2 hours",
    capacity: "Up to 10 pax per session",
    price: "SGD 10,000",
    popular: false,
    image: "/lovable-uploads/87590080-d4e4-45f7-982a-5f9785b379a6.png"
  },
  {
    id: "coaching-performance",
    title: "Coaching For Performance & The Mentor Mindset",
    category: "Mastery Level",
    description: "Develop coaching skills to unlock your team's full potential and foster a growth mindset.",
    duration: "2 hours",
    capacity: "Up to 10 pax per session",
    price: "SGD 10,000",
    popular: false,
    image: "/lovable-uploads/87590080-d4e4-45f7-982a-5f9785b379a6.png"
  }
];

const WorkshopSection = () => {
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
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all" className="data-[state=active]:button-gradient data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="101" className="data-[state=active]:button-gradient data-[state=active]:text-white">
                <Book className="w-4 h-4 mr-1" />
                101 Workshops
              </TabsTrigger>
              <TabsTrigger value="deep-dive" className="data-[state=active]:button-gradient data-[state=active]:text-white">
                <Presentation className="w-4 h-4 mr-1" />
                Deep-dive Series
              </TabsTrigger>
              <TabsTrigger value="mastery" className="data-[state=active]:button-gradient data-[state=active]:text-white">
                <GraduationCap className="w-4 h-4 mr-1" />
                Mastery Level
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workshops.map(workshop => (
                  <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="101" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workshops
                  .filter(workshop => workshop.category === "101 Workshop")
                  .map(workshop => (
                    <WorkshopCard key={workshop.id} workshop={workshop} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="deep-dive" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workshops
                  .filter(workshop => workshop.category === "Deep-dive Series")
                  .map(workshop => (
                    <WorkshopCard key={workshop.id} workshop={workshop} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mastery" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workshops
                  .filter(workshop => workshop.category === "Mastery Level")
                  .map(workshop => (
                    <WorkshopCard key={workshop.id} workshop={workshop} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>;
};

// Extract the workshop card into a separate component for better readability
const WorkshopCard = ({ workshop }: { workshop: Workshop }) => {
  return (
    <div key={workshop.id} className="glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
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
    </div>
  );
};

export default WorkshopSection;
