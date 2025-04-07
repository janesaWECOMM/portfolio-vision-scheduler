
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/admin/AuthForm";
import AvailabilityManager from "@/components/admin/AvailabilityManager";
import TeamDashboard from "@/components/admin/TeamDashboard";
import AppointmentsTable from "@/components/admin/AppointmentsTable";
import { LogOut, Calendar, Settings, Users } from "lucide-react";

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTeamMember, setIsTeamMember] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const fetchSessionAndUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        if (session) {
          // Check if user is a team member
          const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (data) {
            setIsTeamMember(true);
          } else if (error && error.code !== 'PGRST116') {
            // PGRST116 is for no rows returned
            console.error("Error checking team member status:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setLoading(true);
        
        if (session) {
          // Check if user is a team member
          const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (data) {
            setIsTeamMember(true);
          } else {
            setIsTeamMember(false);
          }
        } else {
          setIsTeamMember(false);
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out successfully"
      });
      navigate("/admin");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
          <span className="ml-2">Loading...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Team Administration
        </h1>

        {!session ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <AuthForm />
            </CardContent>
          </Card>
        ) : !isTeamMember ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h2 className="text-xl font-medium">Not Authorized</h2>
                <p className="text-muted-foreground">
                  Your account is not authorized as a team member. Please contact an administrator.
                </p>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                Signed in as: <span className="font-medium">{session?.user?.email}</span>
              </p>
              <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
                <LogOut size={16} /> Sign Out
              </Button>
            </div>
            
            <Tabs defaultValue="availability">
              <TabsList className="mb-4">
                <TabsTrigger value="availability" className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="hidden sm:inline">Availability</span>
                </TabsTrigger>
                <TabsTrigger value="appointments" className="flex items-center gap-2">
                  <Settings size={16} />
                  <span className="hidden sm:inline">Appointments</span>
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users size={16} />
                  <span className="hidden sm:inline">Team</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="availability" className="bg-card rounded-md p-4">
                <AvailabilityManager />
              </TabsContent>
              
              <TabsContent value="appointments" className="bg-card rounded-md p-4">
                <AppointmentsTable />
              </TabsContent>
              
              <TabsContent value="team" className="bg-card rounded-md p-4">
                <TeamDashboard currentUserId={session.user.id} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
