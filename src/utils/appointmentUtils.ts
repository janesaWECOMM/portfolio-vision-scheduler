
import { supabase } from "@/integrations/supabase/client";
import { extendedSupabase } from "@/types/supabase";

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

/**
 * Check if a team member is available at a specific day and time
 */
export const checkTeamAvailability = async (dayOfWeek: number, timeSlot: string): Promise<boolean> => {
  try {
    // Convert timeSlot (e.g. "9:00 AM") to 24-hour format for comparison ("09:00:00")
    const timeFormat = new Date(`2000-01-01 ${timeSlot}`);
    const formattedTime = timeFormat.toTimeString().split(' ')[0];

    // Query team_availability table to find any team members available at this day/time
    const { data, error } = await extendedSupabase
      .from('team_availability')
      .select('*')
      .eq('day_of_week', dayOfWeek)
      .lte('start_time', formattedTime)
      .gte('end_time', formattedTime);
    
    if (error) {
      console.error('Error checking team availability:', error);
      return false;
    }
    
    // If any team member is available during this time slot, return true
    return data.length > 0;
  } catch (error) {
    console.error('Error in checkTeamAvailability:', error);
    return false;
  }
};

/**
 * Get all available time slots for a specific date based on team availability
 */
export const getAvailableTimeSlots = async (
  date: string, 
  defaultTimeSlots: string[]
): Promise<string[]> => {
  try {
    // Convert date string to day of week (0-6, where 0 is Sunday)
    const dayOfWeek = new Date(date).getDay();
    
    // Get booked appointments for this date
    const bookedSlots = await getBookedTimeSlots(date);
    
    // Filter available slots based on team availability and existing appointments
    const availableSlots = [];
    
    for (const slot of defaultTimeSlots) {
      if (!bookedSlots.includes(slot)) {
        // Check if any team member is available for this slot
        const isTeamAvailable = await checkTeamAvailability(dayOfWeek, slot);
        
        if (isTeamAvailable) {
          availableSlots.push(slot);
        }
      }
    }
    
    return availableSlots;
  } catch (error) {
    console.error('Error getting available time slots:', error);
    return [];
  }
};
