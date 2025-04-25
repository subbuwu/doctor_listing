import { useState, useEffect } from 'react';
import { Doctor } from '@/types/doctor';
import { fetchDoctors } from '@/services/doctorService';
import { DocCard } from '@/components/DocCard';

export default function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  
  // call the API here for getting doctors list of data
  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data);
      setLoading(false);
    };
    getDoctors();
  }, []);
  

  
  return (
    <div className="min-h-screen bg-gray-100">

      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-6 mt-10">
        <div className="">
          
          {/* Doctor list */}
          <div className="md:col-span-3 space-y-4">
            {loading ? (
              <div className="text-center py-10">Loading doctors...</div>
            ) : doctors.length === 0 ? (
              <div className="text-center py-10">No doctors found matching your criteria</div>
            ) : (
              doctors.map(doctor => (
                <DocCard key={doctor.id} doctor={doctor} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
