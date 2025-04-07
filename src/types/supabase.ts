import { Database as OriginalDatabase } from '@/integrations/supabase/types';

// Extend the original Database type with our new tables
export interface ExtendedDatabase extends OriginalDatabase {
  public: {
    Tables: {
      // Include original tables
      appointments: OriginalDatabase["public"]["Tables"]["appointments"];
      workshops: OriginalDatabase["public"]["Tables"]["workshops"];
      
      // Add our new tables
      team_members: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          role: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          role?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          role?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      team_availability: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          team_member_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          team_member_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          day_of_week?: number;
          start_time?: string;
          end_time?: string;
          team_member_id?: string;
        };
        Relationships: [];
      };
    };
    Views: OriginalDatabase["public"]["Views"];
    Functions: OriginalDatabase["public"]["Functions"];
    Enums: OriginalDatabase["public"]["Enums"];
    CompositeTypes: OriginalDatabase["public"]["CompositeTypes"];
  };
}

// Create a custom typed Supabase client
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://uaqpyjgkmydgdbglfvjz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcXB5amdrbXlkZ2RiZ2xmdmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0ODM3ODMsImV4cCI6MjA1OTA1OTc4M30.JMEyWCEjuQrpgLfQywXptWrTCeIiiGxWzFFQKV1LOKk";

// Extended supabase client with auth admin methods for team management
export const extendedSupabase = createClient<ExtendedDatabase>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Add a mock admin interface for client-side testing
// In a production app, these operations would be handled by server functions
extendedSupabase.auth.admin = {
  getUserByEmail: async (email: string) => {
    // This is a mock function that returns a user with the given email
    // In a real application, this would be handled by a server function
    const { data, error } = await extendedSupabase.auth.getSession();
    
    if (error) {
      return { data: null, error };
    }
    
    // Return a mocked user with the email
    return {
      data: {
        user: {
          id: 'mock-id', // We'll use a mock ID that will be replaced by the actual user_id
          email,
          // Other user properties would be here
        }
      },
      error: null
    };
  },
  // Add other admin methods as needed
  listUsers: async () => {
    // Mock function that would typically be handled server-side
    return {
      data: {
        users: []
      },
      error: null
    };
  }
};
