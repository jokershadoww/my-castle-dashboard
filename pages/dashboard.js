import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [castles, setCastles] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : 'قائد';

  const fetchData = async () => {
    const { data } = await supabase.from('castles').select('*');
    setCastles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateCastle = async (id, field, value) => {
    await supabase.from('castles').update({ [field]: value }).eq('id', id);
    fetchData();
  };

  const addCastle = async () => {
    await supabase.from('castles').insert([{ name: 'قلعة جديدة' }]);
    fetchData();
  };

  const totalArmorThakna = castles.reduce((sum, c) => sum + (c.armor_thakna || 0), 0);
  const totalArmorRamah = castles.reduce((sum, c) => sum + (c.armor_ramah || 0), 0);
  const totalKhariqThakna = castles.reduce((sum, c) => sum + (c.khariq_thakna || 0), 0);
  const totalKhariqRamah = castles.reduce((sum, c) => sum + (c.khariq_ramah || 0), 0);

  if (loading) return <p className="text-center mt-10">جاري التحميل...</p>;

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl font-bold text-purple-700 mb-6">قاعدة بيانات السيرفر 326</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-2xl">
          <thead>
            <tr className="bg-purple-100 text-purple-800">
              <th className="p-2">اسم القلعة</th>
              <th className="p-2">النوع</th>
              <th className="p-2">الصف</th>
              <th className="p-2">البور</th>
              <th className="p-2">مدرع ثكنة</th>
              <th className="p-2">مدرع رماه</th>
              <th className="p-2">خارق ثكنة</th>
              <th className="p-2">خارق رماه</th>
              <th className="p-2">المارد</th>
              <th className="p-2">عدد المارد</th>
              <th className="p-2">الحشد</th>
              <th className="p-2">السوبر</th>
              {role === 'منسق' && <th className="p-2">حساب القلعة</th>}
              {role === 'منسق' && <th className="p-2">باسورد القلعة</th>}
            </tr>
          </thead>
          <tbody>
            {castles.map((c) => (
              <tr key={c.id} className="border-b">
                <td><input defaultValue={c.name} onBlur={e=>updateCastle(c.id,'name',e.target.value)} className="w-full text-center"/></td>
                <td>
                  <select defaultValue={c.type} onChange={e=>updateCastle(c.id,'type',e.target.value)}>
                    <option>رماه</option><option>ثكنة</option><option>خطين</option>
                  </select>
                </td>
                <td>
                  <select defaultValue={c.rank} onChange={e=>updateCastle(c.id,'rank',e.target.value)}>
                    <option>صف أول</option><option>صف ثاني</option><option>صف ثالث</option>
                  </select>
                </td>
                <td><input type="number" defaultValue={c.power} onBlur={e=>updateCastle(c.id,'power',e.target.value)} className="w-full text-center"/></td>
                <td><input type="number" defaultValue={c.armor_thakna} onBlur={e=>updateCastle(c.id,'armor_thakna',e.target.value)} className="w-full text-center"/></td>
                <td><input type="number" defaultValue={c.armor_ramah} onBlur={e=>updateCastle(c.id,'armor_ramah',e.target.value)} className="w-full text-center"/></td>
                <td><input type="number" defaultValue={c.khariq_thakna} onBlur={e=>updateCastle(c.id,'khariq_thakna',e.target.value)} className="w-full text-center"/></td>
                <td><input type="number" defaultValue={c.khariq_ramah} onBlur={e=>updateCastle(c.id,'khariq_ramah',e.target.value)} className="w-full text-center"/></td>
                <td>
                  <select defaultValue={c.mard_type} onChange={e=>updateCastle(c.id,'mard_type',e.target.value)}>
                    <option>قديم</option><option>جديد</option>
                  </select>
                </td>
                <td><input type="number" defaultValue={c.mard_number} onBlur={e=>updateCastle(c.id,'mard_number',e.target.value)} className="w-full text-center"/></td>
                <td><input defaultValue={c.hasht} onBlur={e=>updateCastle(c.id,'hasht',e.target.value)} className="w-full text-center"/></td>
                <td><input defaultValue={c.super} onBlur={e=>updateCastle(c.id,'super',e.target.value)} className="w-full text-center"/></td>
                {role === 'منسق' && <td><input defaultValue={c.account} onBlur={e=>updateCastle(c.id,'account',e.target.value)} className="w-full text-center"/></td>}
                {role === 'منسق' && <td><input defaultValue={c.password} onBlur={e=>updateCastle(c.id,'password',e.target.value)} className="w-full text-center"/></td>}
              </tr>
            ))}
            <tr className="bg-purple-50 font-bold">
              <td colSpan="4" className="text-center">الإجمالي</td>
              <td className="text-center">{totalArmorThakna}</td>
              <td className="text-center">{totalArmorRamah}</td>
              <td className="text-center">{totalKhariqThakna}</td>
              <td className="text-center">{totalKhariqRamah}</td>
              <td colSpan={role === 'منسق' ? 7 : 5}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={addCastle} className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">إضافة قلعة</button>
    </div>
  );
}