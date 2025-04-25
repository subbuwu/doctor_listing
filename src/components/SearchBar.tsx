import { useState, useEffect } from 'react';
import { Doctor } from '@/types/doctor';
import { Input } from './ui/input';

type SearchBarProps = {
  doctors: Doctor[];
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ doctors, value, onChange }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (newValue.trim()) {
      const matches = doctors
        .filter(d => d.name.toLowerCase().includes(newValue.toLowerCase()))
        .slice(0, 3);
      
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(inputValue);
    setShowSuggestions(false);
  };
  
  return (
    <div className="relative text-lg">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="w-full p-2 py-6 text-lg border rounded-sm bg-white border-none placeholder:text-gray-400 text-black"
          data-testid="autocomplete-input"
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onFocus={() => inputValue && suggestions.length > 0 && setShowSuggestions(true)}
        />
      </form>
      
      {showSuggestions && (
        <div className="absolute w-full bg-white mt-1 border rounded-md shadow-lg z-10">
          {suggestions.map(doctor => (
            <div
              key={doctor.id}
              className="p-2 hover:bg-gray-100 text-lg text-black cursor-pointer"
              onClick={() => {
                setInputValue(doctor.name);
                onChange(doctor.name);
                setShowSuggestions(false);
              }}
              data-testid="suggestion-item"
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}