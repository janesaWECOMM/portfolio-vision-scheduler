
import { supabase } from "@/integrations/supabase/client";

/**
 * Check if a time slot is available on a given date
 */
export const checkTimeSlotAvailability = async (date: string, timeSlot: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('id')
    .eq('date', date)
    .eq('time_slot', timeSlot)
    .limit(1);
    
  if (error) {
    console.error('Error checking time slot availability:', error);
    return false;
  }
  
  return data.length === 0;
};

/**
 * Fetch all booked time slots for a given date
 */
export const getBookedTimeSlots = async (date: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('time_slot')
    .eq('date', date);
    
  if (error) {
    console.error('Error fetching booked time slots:', error);
    return [];
  }
  
  return data.map(appointment => appointment.time_slot);
};

/**
 * Formats a date for display
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Send appointment confirmation email
 */
export const sendAppointmentConfirmation = async (
  name: string,
  email: string,
  date: string,
  timeSlot: string
) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-appointment-confirmation', {
      body: { name, email, date, timeSlot }
    });

    if (error) {
      console.error('Error sending confirmation email:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error invoking send-appointment-confirmation function:', error);
    return false;
  }
};
