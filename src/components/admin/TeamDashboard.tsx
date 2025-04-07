
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { extendedSupabase, findUserByEmail } from "@/types/supabase";
import { UserPlus, X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface TeamDashboardProps {
  currentUserId: string;
}

const TeamDashboard = ({ currentUserId }: TeamDashboardProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState({
    email: '',
    name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await extendedSupabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTeamMembers(data || []);
    } catch (error: any) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error fetching team data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMemberForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First check if the user exists in auth using our mock function
      const { data: existingUsers, error: userQueryError } = await findUserByEmail(newMemberForm.email);
      
      if (userQueryError) {
        throw userQueryError;
      }

      // Check if we found a user with this email
      if (!existingUsers || !existingUsers.user) {
        toast({
          title: "User not found",
          description: "This email is not registered. Ask them to create an account first.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const userToAdd = existingUsers.user;

      // Check if already a team member
      const { data: existingMember, error: checkError } = await extendedSupabase
        .from('team_members')
        .select('*')
        .eq('email', newMemberForm.email)
        .single();

      if (existingMember) {
        toast({
          title: "Team member already exists",
          description: "This email is already registered as a team member.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Add to team_members table
      const { data, error } = await extendedSupabase
        .from('team_members')
        .insert([
          { 
            user_id: userToAdd.id,
            name: newMemberForm.name,
            email: newMemberForm.email,
            role: 'team_member'
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Team member added",
        description: `${newMemberForm.name} has been added to the team.`
      });

      setNewMemberForm({ email: '', name: '' });
      setIsAddDialogOpen(false);
      fetchTeamMembers();
    } catch (error: any) {
      console.error('Error adding team member:', error);
      toast({
        title: "Error adding team member",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveMember = async (member: TeamMember) => {
    // Don't allow removing yourself
    if (member.id === currentUserId) {
      toast({
        title: "Cannot remove yourself",
        description: "You cannot remove your own account.",
        variant: "destructive"
      });
      return;
    }

    if (!confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
      return;
    }

    try {
      const { error } = await extendedSupabase
        .from('team_members')
        .delete()
        .eq('id', member.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Team member removed",
        description: `${member.name} has been removed from the team.`
      });
      
      fetchTeamMembers();
    } catch (error: any) {
      console.error('Error removing team member:', error);
      toast({
        title: "Error removing team member",
        description: error.message,
        variant: "destructive"
      });
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
        <h2 className="text-2xl font-semibold">Team Members</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <UserPlus size={16} />
          Add Team Member
        </Button>
      </div>

      {teamMembers.length === 0 ? (
        <Card className="bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <p className="text-muted-foreground mb-4">
              No team members found. Add your first team member to get started.
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <UserPlus size={16} />
              Add Team Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="bg-secondary/50 py-4 px-6">
            <CardTitle className="text-xl">Team Roster</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell className="capitalize">{member.role}</TableCell>
                    <TableCell>
                      {new Date(member.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground"
                        onClick={() => handleRemoveMember(member)}
                        disabled={member.id === currentUserId}
                      >
                        <X size={16} />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddMember} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={newMemberForm.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={newMemberForm.email}
                onChange={handleInputChange}
                required
              />
              <p className="text-sm text-muted-foreground">
                The person must already have an account in the system.
              </p>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Adding...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </>
                ) : (
                  "Add Team Member"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamDashboard;
