
import { PlayCircle } from "lucide-react";

const TeaserVideoSection = () => {
  // Vimeo video source
  const videoSrc = "https://player.vimeo.com/video/1074211616";
  
  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 bg-gradient-to-b from-boost-deep-purple/90 to-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Video Container */}
            <div className="aspect-video w-full">
              <iframe
                src={`${videoSrc}?badge=0&autopause=0&player_id=0&app_id=58479`}
                title="Boost Teaser Video"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
              ></iframe>
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
        </div>
      </div>
    </section>
  );
};

export default TeaserVideoSection;
