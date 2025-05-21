
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Address } from '@/types';
import { countries } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface AddressFormProps {
  initialAddress?: Address;
  onSave: (address: Address) => void;
  onCancel?: () => void;
  hasExistingAddresses?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
  initialAddress,
  onSave,
  onCancel,
  hasExistingAddresses = false,
}) => {
  const [address, setAddress] = useState<Address>(
    initialAddress || {
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      district: '',
      postalCode: '',
      country: 'GB',
      isDefault: !hasExistingAddresses,
    }
  );
  
  const [isPostcodeLookupLoading, setIsPostcodeLookupLoading] = useState(false);
  const [postcodeSearch, setPostcodeSearch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    setAddress(prev => ({ ...prev, country: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setAddress(prev => ({ ...prev, isDefault: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(address);
  };

  const handlePostcodeLookup = async () => {
    if (!postcodeSearch.trim()) return;
    
    setIsPostcodeLookupLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // This is a mock response - in a real app, you would call a postcode lookup API
      if (postcodeSearch.toUpperCase() === 'SW1A 1AA') {
        setAddress(prev => ({
          ...prev,
          addressLine1: '10 Downing Street',
          city: 'London',
          district: 'Westminster',
          postalCode: 'SW1A 1AA',
          country: 'GB',
        }));
      }
      
      setIsPostcodeLookupLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={address.firstName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={address.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      {address.country === 'GB' && (
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Label htmlFor="postcodeSearch">Postcode Lookup (UK only)</Label>
            <Input
              id="postcodeSearch"
              value={postcodeSearch}
              onChange={(e) => setPostcodeSearch(e.target.value)}
              placeholder="Enter postcode"
            />
          </div>
          <div className="flex items-end">
            <Button 
              type="button" 
              onClick={handlePostcodeLookup}
              disabled={isPostcodeLookupLoading}
              className="mb-0.5"
            >
              {isPostcodeLookupLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : 'Search'}
            </Button>
          </div>
        </div>
      )}
      
      <div>
        <Label htmlFor="addressLine1">Address Line 1</Label>
        <Input
          id="addressLine1"
          name="addressLine1"
          value={address.addressLine1}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
        <Input
          id="addressLine2"
          name="addressLine2"
          value={address.addressLine2 || ''}
          onChange={handleChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="district">State/Province/District (Optional)</Label>
          <Input
            id="district"
            name="district"
            value={address.district || ''}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="country">Country</Label>
          <Select
            value={address.country}
            onValueChange={handleCountryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="isDefault" 
          checked={address.isDefault} 
          onCheckedChange={handleCheckboxChange} 
        />
        <Label htmlFor="isDefault" className="cursor-pointer">
          Set as default address
        </Label>
      </div>
      
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Save Address</Button>
      </div>
    </form>
  );
};

export default AddressForm;
