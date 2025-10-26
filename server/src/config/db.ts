import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const projectUrl = process.env.SUPABASE_URL || "";
const apiKey = process.env.SUPABASE_ANON_KEY || "";

if (!projectUrl || !apiKey) {
  console.error("Supabase credentials are missing!");
  throw new Error("Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file");
}

export const database = createClient(projectUrl, apiKey);

console.log("Connected to Supabase successfully!");

export default database;