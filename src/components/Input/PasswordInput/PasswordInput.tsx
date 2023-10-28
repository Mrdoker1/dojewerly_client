import React, { useState } from 'react';
import Input from '../Input';

interface PasswordInputProps {
    value: string;
    placeholder?: string;
    hasError?: boolean;
    message?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
  }
  
  const PasswordInput: React.FC<PasswordInputProps> = ({
    value,
    placeholder,
    hasError,
    message,
    onChange,
    label,
  }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const iconRight = showPassword ? 'eyeOff' : 'eyeOn';
  
    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        label={label}
        value={value}
        placeholder={placeholder}
        hasError={hasError}
        message={message}
        iconRight={iconRight}
        iconRightClick={handleShowPassword}
        onChange={onChange}
      />
    );
  };
  
  export default PasswordInput;