
import React, { useState } from 'react';
import { MaterialGroup } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MaterialFilterProps {
  groups: MaterialGroup[];
  selectedGroup: string | null;
  onGroupSelect: (groupId: string | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const MaterialFilter: React.FC<MaterialFilterProps> = ({
  groups,
  selectedGroup,
  onGroupSelect,
  searchTerm,
  onSearchChange,
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  return (
    <div>
      {/* Mobile View */}
      <div className="md:hidden">
        <Button
          variant="outline"
          className="w-full mb-4"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
        
        {isMobileFilterOpen && (
          <div className="mb-4 bg-white p-4 border rounded-lg">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <h3 className="font-medium mb-2">Material Groups</h3>
            <div className="space-y-2">
              <div 
                className={`p-2 rounded-md cursor-pointer ${!selectedGroup ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => onGroupSelect(null)}
              >
                All Materials
              </div>
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`p-2 rounded-md cursor-pointer ${selectedGroup === group.id ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                  onClick={() => onGroupSelect(group.id)}
                >
                  {group.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Desktop View */}
      <div className="hidden md:block sticky top-4">
        <div className="bg-white p-6 rounded-lg border">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <h3 className="font-medium mb-3 text-gray-800">Material Groups</h3>
          <div className="space-y-1">
            <div 
              className={`px-3 py-2 rounded-md cursor-pointer ${!selectedGroup ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => onGroupSelect(null)}
            >
              All Materials
            </div>
            {groups.map((group) => (
              <div
                key={group.id}
                className={`px-3 py-2 rounded-md cursor-pointer ${selectedGroup === group.id ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
                onClick={() => onGroupSelect(group.id)}
              >
                {group.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialFilter;
