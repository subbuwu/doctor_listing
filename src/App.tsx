import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Doctor, FilterState } from '@/types/doctor';
import { fetchDoctors } from '@/services/doctorService';
import { SearchBar } from '@/components/SearchBar';
import { DocCard } from '@/components/DocCard';
import { FilterBox } from './components/FilterBox';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  

  const [filterState, setFilterState] = useState<FilterState>({
    search: searchParams.get('search') || '',
    consultationType: (searchParams.get('consultationType') as 'video_consult' | 'in_clinic' | null) || null,
    specialties: searchParams.getAll('specialty'),
    sortBy: (searchParams.get('sortBy') as 'fees' | 'experience' | null) || null,
  });
  
  // initial call we are doing here to get the doctors list
  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data);
      setLoading(false);
    };
    getDoctors();
  }, []);
  
  // here we update the url while filter params are changing
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filterState.search) {
      params.set('search', filterState.search);
    }
    
    if (filterState.consultationType) {
      params.set('consultationType', filterState.consultationType);
    }
    
    filterState.specialties.forEach(specialty => {
      params.append('specialty', specialty);
    });
    
    if (filterState.sortBy) {
      params.set('sortBy', filterState.sortBy);
    }
    
    setSearchParams(params);
  }, [filterState, setSearchParams]);
  
  // here we apply filters on the doctors list
  const filteredDoctors = useMemo(() => {
    if (doctors.length === 0) return [];
    
    let result = [...doctors];
    
    if (filterState.search) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(filterState.search.toLowerCase())
      );
    }
    
    if (filterState.consultationType) {
      result = result.filter(doctor => 
        doctor[filterState.consultationType as keyof Doctor] === true
      );
    }
    
    if (filterState.specialties.length > 0) {
      result = result.filter(doctor => 
        doctor.specialities.some(s => 
          filterState.specialties.includes(s.name)
        )
      );
    }
    
    // here we sort the doctors list based on the fees or experience
    if (filterState.sortBy === 'fees') {
      result.sort((a, b) => {
        const aFee = parseInt(a.fees.replace(/[^\d]/g, ''));
        const bFee = parseInt(b.fees.replace(/[^\d]/g, ''));
        return aFee - bFee;
      });
    } else if (filterState.sortBy === 'experience') {
      result.sort((a, b) => {
        const aExp = parseInt(a.experience.split(' ')[0]);
        const bExp = parseInt(b.experience.split(' ')[0]);
        return bExp - aExp; // Descending
      });
    }
    
    return result;
  }, [doctors, filterState]);
  
  // function for handling the filter changes in search bar
  const handleFilterChange = (changes: Partial<FilterState>) => {
    setFilterState(prev => ({ ...prev, ...changes }));
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#6e73d5] p-4">
        <div className="max-w-6xl mx-auto">
          <SearchBar 
            doctors={doctors} 
            value={filterState.search} 
            onChange={(search) => handleFilterChange({ search })} 
          />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-md shadow-sm p-4">
              <FilterBox
                doctors={doctors}
                filterState={filterState}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          
          
          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center py-10">Loading doctors...</div>
            ) : filteredDoctors.length === 0 ? (
              <div className="text-center py-10">No doctors found matching your criteria</div>
            ) : (
              filteredDoctors.map(doctor => (
                <DocCard key={doctor.id} doctor={doctor} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
