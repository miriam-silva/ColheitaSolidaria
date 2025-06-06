import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pyjqpkkscqlokgmdtslk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5anFwa2tzY3Fsb2tnbWR0c2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDM5ODUsImV4cCI6MjA2NDYxOTk4NX0.9Kx1mTVvz7ZMH6Xi_e6ZBnQjNgaYQO28-cktBNE-Fso';

export const supabase = createClient(supabaseUrl, supabaseKey);
