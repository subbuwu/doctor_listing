import { Doctor } from '@/types/doctor';
import { Card } from './ui/card';
import { Button } from './ui/button';

export function DocCard({ doctor }: { doctor: Doctor }) {

    
  // num part of exp is gathered here
  const yearsExp = doctor.experience.split(' ')[0];
  
  return (
    <Card 
      className="bg-white rounded-md shadow-sm p-4 mb-4" 
      // data-testid is used for testing purposes
      data-testid="doctor-card"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0">
          <img 
            src={doctor.photo || '/placeholder.png'} 
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-grow">
          <h2 className="text-lg font-medium" data-testid="doctor-name">
            {doctor.name}
          </h2>
          <p className="text-gray-600" data-testid="doctor-specialty">
            {doctor.specialities.map(s => s.name).join(', ')}
          </p>
          <p className="text-gray-600" data-testid="doctor-experience">
            {yearsExp} yrs exp.
          </p>
          <p className="text-sm mt-1">
            {doctor.clinic.name}, {doctor.clinic.address.locality}
          </p>
        </div>
        
        <div className="text-right">
          <p className="font-bold" data-testid="doctor-fee">{doctor.fees}</p>
          <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
}