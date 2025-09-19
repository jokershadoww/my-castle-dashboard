// pages/admin.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/database';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'قائد' });

  // بيانات الأدمن (تقدر تغيرهم يدوي)
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "123456";

  const [form, setForm] = useState({ username: '', password: '' });

  // تسجيل الدخول للأدمن
  const handleLogin = () => {
    if (form.username === ADMIN_USER && form.password === ADMIN_PASS) {
      setLoggedIn(true);
      fetchUsers();
    } else {
      alert("❌ اسم المستخدم أو كلمة السر غير صحيحة");
    }
  };

  // جلب المستخدمين من جدول users
  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) console.error(error);
    else setUsers(data);
  };

  // إضافة مستخدم جديد
  const addUser = async () => {
    if (!newUser.username || !newUser.password) {
      alert("⚠️ املأ كل الحقول");
      return;
    }
    const { error } = await supabase.from('users').insert([newUser]);
    if (error) console.error(error);
    else {
      setNewUser({ username: '', password: '', role: 'قائد' });
      fetchUsers();
    }
  };

  // حذف مستخدم
  const deleteUser = async (id) => {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) console.error(error);
    else fetchUsers();
  };

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md p-6 rounded-lg w-80 text-center">
          <h1 className="text-xl font-bold mb-4 text-purple-600">🔐 دخول الأدمن</h1>
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="border p-2 mb-3 w-full rounded"
          />
          <input
            type="password"
            placeholder="كلمة السر"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2 mb-3 w-full rounded"
          />
          <button
            onClick={handleLogin}
            className="bg-purple-500 text-white w-full py-2 rounded hover:bg-purple-600"
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">👑 لوحة تحكم الأدمن</h1>

      {/* إضافة مستخدم جديد */}
      <div className="mb-6 bg-white shadow p-4 rounded">
        <h2 className="font-bold mb-3">➕ إضافة مستخدم جديد</h2>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="password"
          placeholder="كلمة السر"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border p-2 mr-2 rounded"
        >
          <option value="قائد">قائد</option>
          <option value="منسق">منسق</option>
        </select>
        <button
          onClick={addUser}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          إضافة
        </button>
      </div>

      {/* عرض المستخدمين */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="font-bold mb-3">📋 المستخدمين</h2>
        <table className="min-w-full border">
          <thead>
            <tr className="bg-purple-100">
              <th className="p-2 border">اسم المستخدم</th>
              <th className="p-2 border">الدور</th>
              <th className="p-2 border">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="border p-2">{u.username}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
