import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nsrkgrmdxmaiqvzbiyxh.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcmtncm1keG1haXF2emJpeXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1ODIzOTYsImV4cCI6MjA3MTE1ODM5Nn0.ZINES1XFBGEXvbz9P0N51AH_26umqdchk07iY17IEeo";  

export const supabase = createClient(supabaseUrl, supabaseKey);
