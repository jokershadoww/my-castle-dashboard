import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [role, setRole] = useState('قائد');
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem('role', role);
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-80 text-center">
        <h1 className="text-2xl font-bold mb-6 text-purple-600">تسجيل الدخول</h1>
        <select
          className="border rounded p-2 mb-4 w-full text-center"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>قائد</option>
          <option>منسق</option>
        </select>
        <button
          onClick={handleLogin}
          className="bg-purple-500 text-white w-full py-2 rounded hover:bg-purple-600 transition"
        >
          دخول
        </button>
      </div>
    </div>
  );
}