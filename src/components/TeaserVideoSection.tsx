
import { PlayCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const TeaserVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 bg-gradient-to-b from-boost-deep-purple/90 to-boost-purple/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <Dialog onOpenChange={(open) => setIsPlaying(open)}>
            <DialogTrigger asChild>
              <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Video Thumbnail */}
                <div className="aspect-video w-full bg-gradient-to-br from-boost-light-purple/20 to-boost-orange/20 rounded-xl overflow-hidden">
                  <img 
                    src="/photo-1605810230434-7631ac76ec81.jpg" 
                    alt="Boost Workshop Experience" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full transform transition-transform duration-300 group-hover:scale-110">
                    <PlayCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-lg" />
                  </div>
                </div>
                
                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                    See Boost in Action
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base">
                    Watch how our workshops transform teams and spark creativity
                  </p>
                </div>
              </div>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-3xl p-0 sm:p-6">
              {isPlaying && (
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Boost Workshop Experience"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default TeaserVideoSection;
