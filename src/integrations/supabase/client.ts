// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://uaqpyjgkmydgdbglfvjz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcXB5amdrbXlkZ2RiZ2xmdmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0ODM3ODMsImV4cCI6MjA1OTA1OTc4M30.JMEyWCEjuQrpgLfQywXptWrTCeIiiGxWzFFQKV1LOKk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);