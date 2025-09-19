// lib/database.js
import { createClient } from '@supabase/supabase-js'

// مفاتيح مشروع Supabase
const SUPABASE_URL = "https://fregcugqlpkfgggjrtvf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZWdjdWdxbHBrZmdnZ2pydHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMDk1NjYsImV4cCI6MjA3Mzg4NTU2Nn0.6p60Jg_exUytFj1u4-uvVxPFCODRXHnPkFtBuj4wzWI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// === دوال التعامل مع جدول القلاع ===
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





// ...

// ==== التعامل مع جدول المستخدمين ====
export async function loginUser(username, password, role) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .eq('role', role)
    .single();

  if (error) throw error;
  return data;
}

export async function getAllUsers() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data;
}

export async function addUser(user) {
  const { error } = await supabase.from('users').insert([user]);
  if (error) throw error;
}

export async function updateUser(id, updatedFields) {
  const { error } = await supabase.from('users').update(updatedFields).eq('id', id);
  if (error) throw error;
}

export async function deleteUser(id) {
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) throw error;
}
