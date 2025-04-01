
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface SchedulingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const SchedulingDialog = ({ open, onOpenChange }: SchedulingDialogProps) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.company || !defaultWorkshop) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert the appointment into Supabase
      const { error } = await supabase
        .from('appointments')
        .insert({
          workshop_id: defaultWorkshop.id,
          date: selectedDate,
          time_slot: selectedTime,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message || null,
          meeting_type: 'virtual',
          status: 'pending',
          attendees: null
        });
      
      if (error) {
        console.error('Error submitting appointment:', error);
        
        if (error.message.includes('appointment scheduled for this time')) {
          toast({
            title: "Time slot unavailable",
            description: "This time slot is already booked. Please select another time.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        } else {
          throw error;
        }
      }
      
      // Show success message and reset form
      setStep(3);
      
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

  const resetForm = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      name: "",
      email: "",
      company: "",
      message: ""
    });
    onOpenChange(false);
  };

  // Get current date and next 14 days for the calendar
  const today = new Date();
  const nextTwoWeeks = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            {step === 1 && "Schedule a Meeting"}
            {step === 2 && "Your Information"}
            {step === 3 && "Thank You!"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Select a date and time that works for you."}
            {step === 2 && "Please provide your details so we can confirm your booking."}
            {step === 3 && "We've received your request and will be in touch soon."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <Label className="font-medium">Select a Date</Label>
              <div className="grid grid-cols-7 gap-1 text-center">
                {daysOfWeek.map(day => (
                  <div key={day} className="py-1 text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                {/* Placeholders for correct day alignment */}
                {Array.from({ length: today.getDay() === 0 ? 6 : today.getDay() - 1 }, (_, i) => (
                  <div key={i} className="p-2"></div>
                ))}
                {nextTwoWeeks.map((date, i) => {
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                  const dateStr = date.toISOString().split('T')[0];
                  
                  if (isWeekend) return null;
                  
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(dateStr)}
                      className={cn(
                        "aspect-square p-2 flex items-center justify-center rounded-md hover:bg-accent text-sm",
                        selectedDate === dateStr 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-background"
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="font-medium">Select a Time</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "flex items-center justify-center gap-2 p-2 border rounded-md hover:bg-accent",
                      selectedTime === time 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-background border-input"
                    )}
                  >
                    <Clock className="h-4 w-4" />
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={() => setStep(2)} 
              disabled={!selectedDate || !selectedTime}
              className="w-full button-gradient text-white"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Input
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-boost-purple" />
                  <span className="font-medium">Your selected time:</span>
                </div>
                <p>
                  {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  {selectedTime && ` at ${selectedTime}`}
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button 
                type="submit"
                className="button-gradient text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Scheduling...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </>
                ) : (
                  "Schedule Meeting"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === 3 && (
          <div className="py-6 space-y-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-boost-purple" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Meeting Request Sent!</h3>
              <p className="text-muted-foreground">
                We'll review your request and get back to you shortly with a confirmation.
              </p>
              {selectedDate && selectedTime && (
                <p className="font-medium">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {selectedTime}
                </p>
              )}
            </div>
            <Button 
              onClick={resetForm}
              className="button-gradient text-white"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
