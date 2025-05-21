
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DeliveryOption, DeliveryMethod } from '@/types';
import { formatCurrency } from '@/utils/helpers';

interface DeliveryOptionsProps {
  options: DeliveryOption[];
  selectedMethod: DeliveryMethod | null;
  onSelectMethod: (method: DeliveryMethod) => void;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  options,
  selectedMethod,
  onSelectMethod,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Delivery Method</h3>
      
      <RadioGroup
        value={selectedMethod || undefined}
        onValueChange={(value) => onSelectMethod(value as DeliveryMethod)}
      >
        <div className="space-y-3">
          {options.map((option) => (
            <div
              key={option.id}
              className={`flex items-start border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
                selectedMethod === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => onSelectMethod(option.id)}
            >
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="mt-1"
              />
              <div className="ml-3 flex-1">
                <Label
                  htmlFor={option.id}
                  className="text-base font-medium cursor-pointer"
                >
                  {option.name}
                </Label>
                <p className="text-gray-500 text-sm">{option.description}</p>
                <div className="flex justify-between mt-1 text-sm">
                  <span>{option.estimatedDays}</span>
                  <span className="font-medium">{formatCurrency(option.price)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
      
      {!selectedMethod && (
        <p className="text-sm text-red-500 mt-2">
          Please select a delivery method to continue.
        </p>
      )}
    </div>
  );
};

export default DeliveryOptions;
