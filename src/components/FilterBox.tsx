import { useEffect, useState } from 'react';
import { Doctor, FilterState } from '@/types/doctor';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

type FilterBoxProps = {
  doctors: Doctor[];
  filterState: FilterState;
  onChange: (newState: Partial<FilterState>) => void;
};

export function FilterBox({ doctors, filterState, onChange }: FilterBoxProps) {
  const [specialties, setSpecialties] = useState<string[]>([]);
  
  useEffect(() => {
    if (doctors.length > 0) {
      const uniqueSpecialties = new Set<string>();
      doctors.forEach(doctor => {
        doctor.specialities.forEach(s => uniqueSpecialties.add(s.name));
      });
      setSpecialties(Array.from(uniqueSpecialties).sort());
    }
  }, [doctors]);
  
  return (
    <div className="">
      <CardHeader className="pb-2">
        <CardTitle className="flex text-lg font-medium items-center gap-2" data-testid="filter-header-sort">
          Sort by
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <RadioGroup 
          value={filterState.sortBy || ""} 
          onValueChange={(value) => onChange({ sortBy: value as 'fees' | 'experience' | null })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fees" id="sort-fees" data-testid="sort-fees" />
            <Label htmlFor="sort-fees" className="cursor-pointer">Price: Low-High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="experience" id="sort-experience" data-testid="sort-experience" />
            <Label htmlFor="sort-experience" className="cursor-pointer">Experience: Most Experience first</Label>
          </div>
        </RadioGroup>
      </CardContent>

      <Separator className="my-2" />

      <CardHeader className="pb-2">
        <CardTitle className="flex text-lg font-medium items-center gap-2" data-testid="filter-header-moc">
          Mode of consultation
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <RadioGroup 
          value={filterState.consultationType || ""} 
          onValueChange={(value) => onChange({ 
            consultationType: value ? value as 'video_consult' | 'in_clinic' : null 
          })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video_consult" id="video-consult" data-testid="filter-video-consult" />
            <Label htmlFor="video-consult" className="cursor-pointer">Video Consult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in_clinic" id="in-clinic" data-testid="filter-in-clinic" />
            <Label htmlFor="in-clinic" className="cursor-pointer">In Clinic</Label>
          </div>
        </RadioGroup>
      </CardContent>

      <Separator className="my-2" />

      <CardHeader className="pb-2">
        <CardTitle className="flex text-lg font-medium items-center gap-2" data-testid="filter-header-speciality">
          Specialities
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 overflow-y-auto pr-2 ">
          {specialties.map(specialty => {
            const testId = `filter-specialty-${specialty.replace('/', '-')}`;
            const isChecked = filterState.specialties.includes(specialty);
            
            return (
              <div key={specialty} className="flex items-center space-x-2 py-1">
                <Checkbox 
                  id={specialty}
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    const newSpecialties = checked
                      ? [...filterState.specialties, specialty]
                      : filterState.specialties.filter(s => s !== specialty);
                    onChange({ specialties: newSpecialties });
                  }}
                  data-testid={testId}
                />
                <Label 
                  htmlFor={specialty} 
                  className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {specialty}
                </Label>
              </div>
            );
          })}
        </div>
      </CardContent>

    </div>
  );
}