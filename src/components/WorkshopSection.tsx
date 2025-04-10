
import { Clock, Users, Book, GraduationCap, Presentation, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const categoryDescriptions = {
  "101 Workshop": {
    title: "101 Workshops",
    description: "Our introductory workshops are perfect for teams looking to build fundamental skills in communication, creativity, and digital media. These accessible 2-hour sessions provide practical tools that participants can immediately apply to their work.",
    icon: <Book className="w-8 h-8 text-boost-purple mb-4" />,
    duration: "2 hours",
    capacity: "Up to 20 pax per session",
    price: "SGD 3,000"
  },
  "Deep-dive Series": {
    title: "Deep-dive Series",
    description: "Take your team's skills to the next level with our specialized deep-dive workshops. These intermediate sessions explore advanced concepts in storytelling, presentation skills, and feedback techniques that will transform how your team communicates.",
    icon: <Presentation className="w-8 h-8 text-boost-purple mb-4" />,
    duration: "2 hours",
    capacity: "Up to 20 pax per session",
    price: "SGD 4,500"
  },
  "Mastery Level": {
    title: "Mastery Level",
    description: "Designed for leadership and senior positions, our mastery level workshops provide executive-grade training in presence, delegation, and coaching. These premium sessions are limited to smaller groups to ensure personalized attention.",
    icon: <GraduationCap className="w-8 h-8 text-boost-purple mb-4" />,
    duration: "2 hours",
    capacity: "Up to 10 pax per session",
    price: "SGD 10,000"
  }
};

const workshops: Workshop[] = [
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
  const isMobile = useIsMobile();
  
  return (
    <section className="px-4 bg-gradient-to-b from-white to-secondary/30 py-[76px]">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <span className="text-boost-orange text-5xl font-bold">*</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            #getboosted
          </h2>
          <p className="text-xl text-muted-foreground mb-8">Our specialised workshops are designed to supercharge your skills in just 2 hours</p>
          
          <Tabs defaultValue="101" className="w-full">
            {isMobile ? (
              <div className="mb-8">
                <Select
                  defaultValue="101"
                  onValueChange={(value) => {
                    const tab = document.querySelector(`[data-value="${value}"]`);
                    if (tab) {
                      (tab as HTMLElement).click();
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select workshop category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101">
                      <div className="flex items-center">
                        <Book className="w-4 h-4 mr-2" />
                        <span>101 Workshops</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="deep-dive">
                      <div className="flex items-center">
                        <Presentation className="w-4 h-4 mr-2" />
                        <span>Deep-dive Series</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="mastery">
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        <span>Mastery Level</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <TabsList className="grid grid-cols-3 mb-8 w-full">
                <TabsTrigger 
                  value="101" 
                  className="data-[state=active]:button-gradient data-[state=active]:text-white px-3 py-2"
                  data-value="101"
                >
                  <Book className="w-4 h-4 mr-1" />
                  <span className="whitespace-nowrap">101 Workshops</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="deep-dive" 
                  className="data-[state=active]:button-gradient data-[state=active]:text-white px-3 py-2"
                  data-value="deep-dive"
                >
                  <Presentation className="w-4 h-4 mr-1" />
                  <span className="whitespace-nowrap">Deep-dive Series</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="mastery" 
                  className="data-[state=active]:button-gradient data-[state=active]:text-white px-3 py-2"
                  data-value="mastery"
                >
                  <GraduationCap className="w-4 h-4 mr-1" />
                  <span className="whitespace-nowrap">Mastery Level</span>
                </TabsTrigger>
              </TabsList>
            )}
            
            <TabsContent value="101" className="mt-0">
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{categoryDescriptions["101 Workshop"].title}</h3>
                  <p className="text-muted-foreground mb-6">{categoryDescriptions["101 Workshop"].description}</p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Clock size={18} className="mr-2 text-boost-purple" />
                        <span>{categoryDescriptions["101 Workshop"].duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users size={18} className="mr-2 text-boost-purple" />
                        <span>{categoryDescriptions["101 Workshop"].capacity}</span>
                      </div>
                    </div>
                    
                    <Badge className="bg-boost-orange/10 text-boost-orange border-boost-orange text-base px-4 py-2 text-center">
                      {categoryDescriptions["101 Workshop"].price}
                    </Badge>
                  </div>
                </div>
                <div>
                  {isMobile ? (
                    <ScrollArea className="w-full pb-6 overflow-visible">
                      <div className="flex space-x-4 pb-4 pl-1 min-w-full">
                        {workshops
                          .filter(workshop => workshop.category === "101 Workshop")
                          .map(workshop => (
                            <div key={workshop.id} className="min-w-[280px] max-w-[280px] shrink-0">
                              <SimpleWorkshopCard workshop={workshop} />
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {workshops
                        .filter(workshop => workshop.category === "101 Workshop")
                        .map(workshop => (
                          <SimpleWorkshopCard key={workshop.id} workshop={workshop} />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="deep-dive" className="mt-0">
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{categoryDescriptions["Deep-dive Series"].title}</h3>
                  <p className="text-muted-foreground mb-6">{categoryDescriptions["Deep-dive Series"].description}</p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Clock size={18} className="mr-2 text-boost-purple" />
                        <span>{categoryDescriptions["Deep-dive Series"].duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users size={18} className="mr-2 text-boost-purple" />
                        <span>{categoryDescriptions["Deep-dive Series"].capacity}</span>
                      </div>
                    </div>
                    
                    <Badge className="bg-boost-orange/10 text-boost-orange border-boost-orange text-base px-4 py-2 text-center">
                      {categoryDescriptions["Deep-dive Series"].price}
                    </Badge>
                  </div>
                </div>
                <div>
                  {isMobile ? (
                    <ScrollArea className="w-full pb-6 overflow-visible">
                      <div className="flex space-x-4 pb-4 pl-1 min-w-full">
                        {workshops
                          .filter(workshop => workshop.category === "Deep-dive Series")
                          .map(workshop => (
                            <div key={workshop.id} className="min-w-[280px] max-w-[280px] shrink-0">
                              <SimpleWorkshopCard workshop={workshop} />
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {workshops
                        .filter(workshop => workshop.category === "Deep-dive Series")
                        .map(workshop => (
                          <SimpleWorkshopCard key={workshop.id} workshop={workshop} />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mastery" className="mt-0">
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{categoryDescriptions["Mastery Level"].title}</h3>
                  <p className="text-muted-foreground mb-6">{categoryDescriptions["Mastery Level"].description}</p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Clock size={18} className="mr-2 text-boost-purple" />
                        <span>{categoryDescriptions["Mastery Level"].duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users size={18} className="mr-2 text-boost-purple" />
                        <span>{categoryDescriptions["Mastery Level"].capacity}</span>
                      </div>
                    </div>
                    
                    <Badge className="bg-boost-orange/10 text-boost-orange border-boost-orange text-base px-4 py-2 text-center">
                      {categoryDescriptions["Mastery Level"].price}
                    </Badge>
                  </div>
                </div>
                <div>
                  {isMobile ? (
                    <ScrollArea className="w-full pb-6 overflow-visible">
                      <div className="flex space-x-4 pb-4 pl-1 min-w-full">
                        {workshops
                          .filter(workshop => workshop.category === "Mastery Level")
                          .map(workshop => (
                            <div key={workshop.id} className="min-w-[280px] max-w-[280px] shrink-0">
                              <SimpleWorkshopCard workshop={workshop} />
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {workshops
                        .filter(workshop => workshop.category === "Mastery Level")
                        .map(workshop => (
                          <SimpleWorkshopCard key={workshop.id} workshop={workshop} />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

const SimpleWorkshopCard = ({ workshop }: { workshop: Workshop }) => {
  return (
    <div key={workshop.id} className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-lg flex flex-col h-full items-center justify-center text-center relative pt-10">
      {workshop.popular && (
        <Badge className="bg-boost-orange text-white px-3 py-1 absolute top-4 right-4 rounded-full z-10">
          <Star className="w-3 h-3 mr-1 fill-current" /> POPULAR
        </Badge>
      )}
      <div className="mb-auto flex flex-col items-center justify-center w-full">
        <h3 className="text-xl font-bold mb-3">{workshop.title}</h3>
        <p className="text-muted-foreground mb-5">{workshop.description}</p>
        <div className="flex items-center mb-4">
          <Star className="w-4 h-4 text-boost-orange fill-current" />
          <Star className="w-4 h-4 text-boost-orange fill-current" />
          <Star className="w-4 h-4 text-boost-orange fill-current" />
          <Star className="w-4 h-4 text-boost-orange fill-current" />
          <Star className="w-4 h-4 text-boost-orange/50 fill-current" />
        </div>
      </div>
      <Button size="sm">
        Schedule Now
      </Button>
    </div>
  );
};

export default WorkshopSection;
