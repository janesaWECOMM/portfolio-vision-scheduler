
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/utils/appointmentUtils";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface Appointment {
  id: string;
  name: string;
  email: string;
  company: string;
  date: string;
  time_slot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  meeting_type: string;
  message: string | null;
  attendees: number | null;
}

const statusIcons = {
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  confirmed: <CheckCircle className="h-4 w-4 text-green-500" />,
  cancelled: <XCircle className="h-4 w-4 text-red-500" />,
};

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAppointments();
    
    // Subscribe to changes in appointments table
    const appointmentsSubscription = supabase
      .channel('appointments-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'appointments' 
        }, 
        () => {
          fetchAppointments();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(appointmentsSubscription);
    };
  }, []);

  const fetchAppointments = async () => {
    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: false });
        
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
        
      const { data, error } = await query;
      
      if (error) throw error;
      setAppointments(data as Appointment[]);
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Error fetching appointments",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Appointment updated",
        description: `Appointment status changed to ${status}`
      });
      
      fetchAppointments();
    } catch (error: any) {
      console.error('Error updating appointment:', error);
      toast({
        title: "Error updating appointment",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatAppointmentDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return formatDate(date);
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
        <h2 className="text-2xl font-semibold">Appointments</h2>
        <div className="flex items-center gap-2">
          <Select value={statusFilter || ""} onValueChange={value => setStatusFilter(value === "" ? null : value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchAppointments}>
            Refresh
          </Button>
        </div>
      </div>

      {appointments.length === 0 ? (
        <Card className="bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <p className="text-muted-foreground">
              No appointments found.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="bg-secondary/50 py-4 px-6">
            <CardTitle className="text-xl">Appointment Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id} className="group">
                    <TableCell>
                      <div className="font-medium">{appointment.name}</div>
                      <div className="text-sm text-muted-foreground">{appointment.email}</div>
                      <div className="text-sm text-muted-foreground">{appointment.company}</div>
                    </TableCell>
                    <TableCell>
                      <div>{formatAppointmentDate(appointment.date)}</div>
                      <div className="text-sm text-muted-foreground">{appointment.time_slot}</div>
                      {appointment.attendees && (
                        <div className="text-xs mt-1">
                          <Badge variant="outline" className="bg-primary/10">
                            {appointment.attendees} attendees
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[appointment.status] || ''}>
                        <span className="flex items-center gap-1">
                          {statusIcons[appointment.status]}
                          <span className="capitalize">{appointment.status}</span>
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{appointment.meeting_type}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      {appointment.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          >
                            Decline
                          </Button>
                        </div>
                      )}
                      {appointment.status === 'confirmed' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      )}
                      {appointment.status === 'cancelled' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                        >
                          Restore
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppointmentsTable;
