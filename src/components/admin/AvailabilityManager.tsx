
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash, Save } from "lucide-react";

// Mapping for days of the week
const daysOfWeek = [
  { value: "0", label: "Sunday" },
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
];

// Generate time slots in 30-minute intervals
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const h = hour.toString().padStart(2, "0");
      const m = minute.toString().padStart(2, "0");
      const time = `${h}:${m}:00`;
      const label = new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      options.push({ value: time, label });
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

interface Availability {
  id?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  isNew?: boolean;
}

const AvailabilityManager = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      const { data, error } = await supabase
        .from("team_availability")
        .select("*")
        .eq("team_member_id", session.session.user.id)
        .order("day_of_week", { ascending: true });

      if (error) throw error;
      
      setAvailabilities(data || []);
    } catch (error: any) {
      console.error("Error fetching availability:", error);
      toast({
        title: "Error fetching availability",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAvailabilitySlot = () => {
    // Default to Monday, 9 AM - 5 PM
    setAvailabilities([
      ...availabilities,
      {
        day_of_week: 1,
        start_time: "09:00:00",
        end_time: "17:00:00",
        isNew: true,
      },
    ]);
  };

  const updateAvailability = (index: number, field: keyof Availability, value: any) => {
    const updatedAvailabilities = [...availabilities];
    updatedAvailabilities[index] = {
      ...updatedAvailabilities[index],
      [field]: field === "day_of_week" ? parseInt(value) : value,
    };
    setAvailabilities(updatedAvailabilities);
  };

  const removeAvailability = async (index: number) => {
    const slot = availabilities[index];
    const newAvailabilities = [...availabilities];
    newAvailabilities.splice(index, 1);
    setAvailabilities(newAvailabilities);

    // If it's an existing slot (has an ID), delete it from the database
    if (slot.id && !slot.isNew) {
      try {
        const { error } = await supabase
          .from("team_availability")
          .delete()
          .eq("id", slot.id);

        if (error) throw error;

        toast({
          title: "Availability slot removed",
        });
      } catch (error: any) {
        console.error("Error removing availability:", error);
        toast({
          title: "Error removing availability",
          description: error.message,
          variant: "destructive",
        });
        // Restore the slot if deletion fails
        fetchAvailability();
      }
    }
  };

  const saveAllAvailability = async () => {
    setSaving(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast({
          title: "Not authenticated",
          description: "Please sign in to save your availability",
          variant: "destructive",
        });
        return;
      }

      // Validate inputs
      const invalidSlots = availabilities.filter(
        (slot) => slot.start_time >= slot.end_time
      );

      if (invalidSlots.length > 0) {
        toast({
          title: "Invalid time slots",
          description: "End time must be after start time",
          variant: "destructive",
        });
        return;
      }

      // Identify which slots to update and which to insert
      const slotsToUpdate = availabilities.filter(
        (slot) => slot.id && !slot.isNew
      );
      const slotsToInsert = availabilities.filter(
        (slot) => !slot.id || slot.isNew
      ).map(slot => ({
        team_member_id: session.session.user.id,
        day_of_week: slot.day_of_week,
        start_time: slot.start_time,
        end_time: slot.end_time,
      }));

      // Perform updates
      if (slotsToUpdate.length > 0) {
        for (const slot of slotsToUpdate) {
          const { error } = await supabase
            .from("team_availability")
            .update({
              day_of_week: slot.day_of_week,
              start_time: slot.start_time,
              end_time: slot.end_time,
              updated_at: new Date().toISOString(),
            })
            .eq("id", slot.id);

          if (error) throw error;
        }
      }

      // Perform inserts
      if (slotsToInsert.length > 0) {
        const { error } = await supabase
          .from("team_availability")
          .insert(slotsToInsert);

        if (error) throw error;
      }

      toast({
        title: "Availability saved successfully",
      });

      // Refresh to get the new IDs
      fetchAvailability();
    } catch (error: any) {
      console.error("Error saving availability:", error);
      toast({
        title: "Error saving availability",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Your Availability</h2>
        <Button onClick={addAvailabilitySlot} size="sm" className="flex items-center gap-2">
          <Plus size={16} />
          Add Time Slot
        </Button>
      </div>

      {availabilities.length === 0 ? (
        <Card className="bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <p className="text-muted-foreground mb-4">
              You haven't set any availability yet. Add your first time slot to get started.
            </p>
            <Button onClick={addAvailabilitySlot} className="flex items-center gap-2">
              <Plus size={16} />
              Add Time Slot
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {availabilities.map((slot, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-secondary/50 p-4">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>Availability Slot {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive"
                    onClick={() => removeAvailability(index)}
                  >
                    <Trash size={16} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Day</Label>
                    <Select
                      value={slot.day_of_week.toString()}
                      onValueChange={(value) =>
                        updateAvailability(index, "day_of_week", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Select
                      value={slot.start_time}
                      onValueChange={(value) =>
                        updateAvailability(index, "start_time", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={`start-${time.value}`} value={time.value}>
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Select
                      value={slot.end_time}
                      onValueChange={(value) =>
                        updateAvailability(index, "end_time", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={`end-${time.value}`} value={time.value}>
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <Button
              onClick={saveAllAvailability}
              disabled={saving}
              className="flex items-center gap-2"
            >
              {saving ? (
                <>
                  <span>Saving...</span>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save All Changes
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityManager;
