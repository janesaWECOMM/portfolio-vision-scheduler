
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="py-24 px-4 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">Boost</span> Workshops
            </h1>
            <p className="text-xl text-muted-foreground">
              We're dedicated to helping teams unlock their full potential through innovative and effective workshop experiences.
            </p>
          </div>
        </div>
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="glass rounded-xl p-8 md:p-12 mb-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    At Boost Workshops, we believe that exceptional teams are at the heart of every successful organization. Our mission is to provide transformative learning experiences that empower teams to innovate, collaborate, and achieve remarkable results.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Through carefully designed workshops and expert facilitation, we help organizations unlock the full potential of their teams, fostering environments where creativity, communication, and leadership thrive.
                  </p>
                </div>
                <div className="relative h-full flex items-center justify-center">
                  <div className="aspect-square w-full max-w-md rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                      alt="Team workshop session" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 relative h-full flex items-center justify-center">
                  <div className="aspect-square w-full max-w-md rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                      alt="Team collaboration" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    We take a human-centered approach to workshop design, focusing on creating experiences that are engaging, relevant, and impactful. Our workshops blend proven methodologies with innovative techniques to address the unique challenges and opportunities facing your team.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Whether you're looking to enhance communication, foster innovation, develop leadership skills, or navigate change, our tailored workshops provide the insights, tools, and practices your team needs to excel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
