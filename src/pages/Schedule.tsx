
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, Clock, Users, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const timeSlots = [
  "9:00 AM", "9:30 AM", 
  "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM"
];

const Schedule = () => {
  const [searchParams] = useSearchParams();
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [attendees, setAttendees] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [meetingType, setMeetingType] = useState("virtual");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  // Fetch default workshop
  const { data: defaultWorkshop } = useQuery({
    queryKey: ['default-workshop'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workshops')
        .select('id')
        .limit(1)
        .single();
      
      if (error) {
        console.error('Error fetching default workshop:', error);
        return null;
      }
      
      return data;
    }
  });
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!date || !timeSlot) {
        toast({
          title: "Please complete all fields",
          description: "Please select a date and time before proceeding.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!name || !email || !company) {
        toast({
          title: "Please complete all fields",
          description: "Please fill in your name, email, and company before proceeding.",
          variant: "destructive"
        });
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot || !name || !email || !company || !defaultWorkshop) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format date as YYYY-MM-DD for Supabase
      const formattedDate = date.toISOString().split('T')[0];
      
      // Insert the appointment into Supabase
      const { error } = await supabase
        .from('appointments')
        .insert({
          workshop_id: defaultWorkshop.id,
          date: formattedDate,
          time_slot: timeSlot,
          name,
          email,
          company,
          attendees: attendees ? parseInt(attendees, 10) : null,
          meeting_type: meetingType,
          message: message || null,
          status: 'pending'
        });
      
      if (error) {
        console.error('Error submitting appointment:', error);
        
        if (error.message.includes('appointment scheduled for this time')) {
          toast({
            title: "Time slot unavailable",
            description: "This time slot is already booked. Please select another time.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Failed to schedule appointment",
            description: "An error occurred. Please try again later.",
            variant: "destructive"
          });
        }
        
        setIsSubmitting(false);
        return;
      }
      
      // Show success message
      toast({
        title: "Meeting scheduled!",
        description: "We've received your request and will contact you shortly to confirm.",
      });
      
      // Reset form
      setDate(undefined);
      setTimeSlot(undefined);
      setAttendees("");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setMeetingType("virtual");
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Schedule a <span className="text-gradient">Workshop Consultation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Book a time to discuss how our workshops can help your team grow and succeed.
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex justify-between mb-8 border-b border-border pb-4">
              <div className={`flex items-center ${currentStep >= 1 ? "text-boost-purple" : "text-muted-foreground"}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-boost-purple/10 mr-2">
                  <Calendar size={18} className={currentStep >= 1 ? "text-boost-purple" : "text-muted-foreground"} />
                </div>
                <span className="font-medium">Select Date & Time</span>
              </div>
              <div className={`hidden md:flex items-center ${currentStep >= 2 ? "text-boost-purple" : "text-muted-foreground"}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-boost-purple/10 mr-2">
                  <Users size={18} className={currentStep >= 2 ? "text-boost-purple" : "text-muted-foreground"} />
                </div>
                <span className="font-medium">Your Information</span>
              </div>
              <div className={`flex items-center ${currentStep >= 3 ? "text-boost-purple" : "text-muted-foreground"}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-boost-purple/10 mr-2">
                  <Check size={18} className={currentStep >= 3 ? "text-boost-purple" : "text-muted-foreground"} />
                </div>
                <span className="font-medium">Confirmation</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Choose a Date</h2>
                      <div className="border rounded-lg overflow-hidden bg-white">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md"
                          disabled={(date) => {
                            const day = date.getDay();
                            // Disable weekends
                            return day === 0 || day === 6 || date < new Date();
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Select a Time</h2>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant="outline"
                            className={`justify-start ${
                              timeSlot === time ? "bg-boost-purple text-white hover:bg-boost-purple" : ""
                            }`}
                            onClick={() => setTimeSlot(time)}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="attendees">Expected Number of Attendees</Label>
                    <Input
                      id="attendees"
                      type="number"
                      placeholder="e.g., 10"
                      value={attendees}
                      onChange={(e) => setAttendees(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      className="button-gradient text-white px-8"
                      onClick={handleNextStep}
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Acme Inc."
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label>Preferred Meeting Type</Label>
                      <RadioGroup 
                        value={meetingType} 
                        onValueChange={setMeetingType}
                        className="mt-2 space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="virtual" id="virtual" />
                          <Label htmlFor="virtual">Virtual Meeting (Zoom)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone" id="phone" />
                          <Label htmlFor="phone">Phone Call</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Additional Information (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Let us know about your team's specific needs or any questions you have"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handlePreviousStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      className="button-gradient text-white px-8"
                      onClick={handleNextStep}
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="bg-secondary/50 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-6">Confirm Your Appointment</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">
                          {date ? date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          }) : "Not selected"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{timeSlot || "Not selected"}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Attendees:</span>
                        <span className="font-medium">{attendees || "Not specified"}</span>
                      </div>
                      
                      <div className="border-t border-border my-2"></div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{name}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{email}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Company:</span>
                        <span className="font-medium">{company}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Meeting Type:</span>
                        <span className="font-medium capitalize">{meetingType}</span>
                      </div>
                      
                      {message && (
                        <>
                          <div className="border-t border-border my-2"></div>
                          <div>
                            <span className="text-muted-foreground">Additional Information:</span>
                            <p className="mt-1">{message}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-6">
                    <h3 className="font-medium mb-2">What happens next?</h3>
                    <p className="text-muted-foreground mb-4">
                      Once you submit your request, we'll review it and send you a confirmation email within 24 hours. If your requested time is unavailable, we'll suggest alternative slots.
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={16} className="mr-2" />
                      <span>Consultations typically last 30 minutes</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handlePreviousStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="button-gradient text-white px-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Scheduling...</span>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        </>
                      ) : (
                        "Confirm & Schedule"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;

