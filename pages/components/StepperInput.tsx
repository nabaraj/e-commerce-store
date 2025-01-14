import React, { useState } from "react";

interface StepperInputProps {
  max?: number;
  min?: number;
  value?: number;
  productId: number | string; // Add productId to identify the product
  updateValue: (id: number | string, quantity: number) => void; // Pass id and quantity
}

enum Sign {
  plus = "plus",
  minus = "minus"
}

export const StepperInput: React.FC<StepperInputProps> = ({
  max,
  min,
  value = 0,
  productId,
  updateValue
}) => {
  const [inputValue, setInputValue] = useState(value);

  const changeNumber = (changeType: Sign) => {
    let newValue = inputValue;

    if (changeType === Sign.plus && (!max || newValue + 1 <= max)) {
      newValue++;
    } else if (changeType === Sign.minus && (!min || newValue - 1 >= min)) {
      newValue--;
    } else {
      return;
    }

    setInputValue(newValue);
    updateValue(productId, newValue); // Call updateValue with the productId
  };

  return (
    <div className='flex items-center'>
      <button
        className='text-center border p-2'
        onClick={() => changeNumber(Sign.minus)}
      >
        -
      </button>
      <input
        type='text'
        value={inputValue}
        readOnly
        className='border rounded w-16 text-center mx-2'
      />
      <button
        className='text-center border p-2'
        onClick={() => changeNumber(Sign.plus)}
      >
        +
      </button>
    </div>
  );
};
