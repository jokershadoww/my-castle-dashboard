// lib/database.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ضع مفاتيح مشروعك هنا 👇
const SUPABASE_URL = "https://fregcugqlpkfgggjrtvf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZWdjdWdxbHBrZmdnZ2pydHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMDk1NjYsImV4cCI6MjA3Mzg4NTU2Nn0.6p60Jg_exUytFj1u4-uvVxPFCODRXHnPkFtBuj4wzWI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ==== دوال التعامل مع جدول القلاع ====

export async function getAllCastles() {
  const { data, error } = await supabase.from('castles').select('*');
  if (error) throw error;
  return data;
}

export async function addCastle(castle) {
  const { error } = await supabase.from('castles').insert([castle]);
  if (error) throw error;
}

export async function updateCastle(id, updatedFields) {
  const { error } = await supabase.from('castles').update(updatedFields).eq('id', id);
  if (error) throw error;
}

export async function deleteCastle(id) {
  const { error } = await supabase.from('castles').delete().eq('id', id);
  if (error) throw error;
}
