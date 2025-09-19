import { useEffect, useState } from 'react';
import { supabase } from '../lib/database';

export default function Dashboard() {
  const [castles, setCastles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : 'قائد';

  const fetchData = async () => {
    const { data, error } = await supabase.from('castles').select('*');
    if (error) console.error(error);
    setCastles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // تحديث البيانات في الـ state
  const handleFieldChange = (id, field, value) => {
    setCastles(castles.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // حفظ التعديلات
  const saveCastle = async (id) => {
    const castle = castles.find(c => c.id === id);
    const { error } = await supabase.from('castles').update(castle).eq('id', id);
    if (error) {
      alert("خطأ أثناء الحفظ: " + error.message);
      console.error(error);
    } else {
      setEditingId(null);
      fetchData();
    }
  };

  // إضافة قلعة
  const addCastle = async () => {
    await supabase.from('castles').insert([{ name: 'قلعة جديدة' }]);
    fetchData();
  };

  // حذف قلعة
  const deleteCastle = async (id) => {
    await supabase.from('castles').delete().eq('id', id);
    fetchData();
  };

  // إجماليات
  const totalArmorThakna = castles.reduce((sum, c) => sum + (c.armored_barracks || 0), 0);
  const totalArmorRamah = castles.reduce((sum, c) => sum + (c.armored_archers || 0), 0);
  const totalKhariqThakna = castles.reduce((sum, c) => sum + (c.piercing_barracks || 0), 0);
  const totalKhariqRamah = castles.reduce((sum, c) => sum + (c.piercing_archers || 0), 0);

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
              <th className="p-2">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {castles.map((c) => (
              <tr key={c.id} className="border-b">
                <td>
                  {editingId === c.id ? (
                    <input value={c.name || ''} onChange={e=>handleFieldChange(c.id,'name',e.target.value)} className="w-full text-center"/>
                  ) : c.name}
                </td>
                <td>
                  {editingId === c.id ? (
                    <select value={c.type || ''} onChange={e=>handleFieldChange(c.id,'type',e.target.value)}>
                      <option>رماه</option><option>ثكنة</option><option>خطين</option>
                    </select>
                  ) : c.type}
                </td>
                <td>
                  {editingId === c.id ? (
                    <select value={c.rank || ''} onChange={e=>handleFieldChange(c.id,'rank',e.target.value)}>
                      <option>صف أول</option><option>صف ثاني</option><option>صف ثالث</option>
                    </select>
                  ) : c.rank}
                </td>
                <td>
                  {editingId === c.id ? (
                    <input type="number" value={c.power || 0} onChange={e=>handleFieldChange(c.id,'power',e.target.value)} className="w-full text-center"/>
                  ) : c.power}
                </td>
                <td>
                  {editingId === c.id ? (
                    <input type="number" value={c.armored_barracks || 0} onChange={e=>handleFieldChange(c.id,'armored_barracks',e.target.value)} className="w-full text-center"/>
                  ) : c.armored_barracks}
                </td>
                <td>
                  {editingId === c.id ? (
                    <input type="number" value={c.armored_archers || 0} onChange={e=>handleFieldChange(c.id,'armored_archers',e.target.value)} className="w-full text-center"/>
                  ) : c.armored_archers}
                </td>
                <td>
                  {editingId === c.id ? (
                    <input type="number" value={c.piercing_barracks || 0} onChange={e=>handleFieldChange(c.id,'piercing_barracks',e.target.value)} className="w-full text-center"/>
                  ) : c.piercing_barracks}
                </td>
                <td>
                  {editingId === c.id ? (
                    <input type="number" value={c.piercing_archers || 0} onChange={e=>handleFieldChange(c.id,'piercing_archers',e.target.value)} className="w-full text-center"/>
                  ) : c.piercing_archers}
                </td>
                <td>
                  {editingId === c.id ? (
                    <select value={c.marid_type || ''} onChange={e=>handleFieldChange(c.id,'marid_type',e.target.value)}>
                      <option>قديم</option><option>جديد</option>
                    </select>
                  ) : c.marid_type}
                </td>
                <td>
                  {editingId === c.id ? (
                    <input type="number" value={c.marid_number || 0} onChange={e=>handleFieldChange(c.id,'marid_number',e.target.value)} className="w-full text-center"/>
                  ) : c.marid_number}
                </td>
                <td>
                  {editingId === c.id ? (
                    <input value={c.rally || ''} onChange={e=>handleFieldChange(c.id,'rally',e.target.value)} className="w-full text-center"/>
                  ) : c.rally}
                </td>
                <td>
                  {editingId === c.id ? (
                    <input value={c.super || ''} onChange={e=>handleFieldChange(c.id,'super',e.target.value)} className="w-full text-center"/>
                  ) : c.super}
                </td>
                {role === 'منسق' && (
                  <>
                    <td>
                      {editingId === c.id ? (
                        <input value={c.account || ''} onChange={e=>handleFieldChange(c.id,'account',e.target.value)} className="w-full text-center"/>
                      ) : c.account}
                    </td>
                    <td>
                      {editingId === c.id ? (
                        <input value={c.password || ''} onChange={e=>handleFieldChange(c.id,'password',e.target.value)} className="w-full text-center"/>
                      ) : c.password}
                    </td>
                  </>
                )}
                <td className="text-center">
                  {editingId === c.id ? (
                    <button onClick={() => saveCastle(c.id)} className="bg-green-500 text-white px-2 py-1 rounded">💾 حفظ</button>
                  ) : (
                    <button onClick={() => setEditingId(c.id)} className="bg-yellow-500 text-white px-2 py-1 rounded">✏️ تعديل</button>
                  )}
                  <button onClick={() => deleteCastle(c.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">🗑 حذف</button>
                </td>
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
