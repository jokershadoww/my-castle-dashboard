import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../lib/database";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("قائد");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password, role);
      if (user) {
        localStorage.setItem("role", user.role);
        localStorage.setItem("username", user.username);

        if (user.role === "ادمن") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError("❌ بيانات الدخول غير صحيحة");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold text-center mb-4">تسجيل الدخول</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="قائد">قائد</option>
          <option value="منسق">منسق</option>
        </select>
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          دخول
        </button>
      </div>
    </div>
  );
}
