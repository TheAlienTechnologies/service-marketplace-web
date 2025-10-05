'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { CountrySelector, countries, Country } from '@/components/ui/country-selector';
import { apiService } from '@/lib/api';
import { toast } from 'react-toastify';

export type PhoneVerificationStep = 'input' | 'verify' | 'verified';

interface PhoneVerificationProps {
  value: string;
  onChange: (value: string) => void;
  onVerificationChange: (step: PhoneVerificationStep) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export function PhoneVerification({ 
  value, 
  onChange, 
  onVerificationChange, 
  disabled = false, 
  required = false,
  error 
}: PhoneVerificationProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Default to Ghana
  const [verificationStep, setVerificationStep] = useState<PhoneVerificationStep>('input');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [nextResendTime, setNextResendTime] = useState<Date | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  // Refs for timers
  const verificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resendTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect for resend countdown
  useEffect(() => {
    if (nextResendTime) {
      const updateTimer = () => {
        const now = new Date();
        const timeLeft = Math.max(0, Math.ceil((nextResendTime.getTime() - now.getTime()) / 1000));
        setResendTimer(timeLeft);
        
        if (timeLeft > 0) {
          resendTimerRef.current = setTimeout(updateTimer, 1000);
        } else {
          setNextResendTime(null);
        }
      };
      updateTimer();
    }
    
    return () => {
      if (resendTimerRef.current) {
        clearTimeout(resendTimerRef.current);
      }
    };
  }, [nextResendTime]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
      if (resendTimerRef.current) {
        clearTimeout(resendTimerRef.current);
      }
    };
  }, []);

  // Notify parent of verification step changes
  useEffect(() => {
    onVerificationChange(verificationStep);
  }, [verificationStep, onVerificationChange]);

  const handleSendVerification = async () => {
    if (!value) {
      toast.error('Please enter a phone number');
      return;
    }

    setIsVerifying(true);
    try {
      const fullPhoneNumber = selectedCountry.dialCode + value;
      await apiService.sendPhoneVerification(fullPhoneNumber);
      
      setVerificationStep('verify');
      
      // Set initial resend timer (30 seconds)
      const nextResend = new Date();
      nextResend.setSeconds(nextResend.getSeconds() + 30);
      setNextResendTime(nextResend);
      
      toast.success('Verification code sent to your phone');
    } catch (error) {
      console.error('Failed to send verification:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send verification code';
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeChange = (index: number, newValue: string) => {
    if (newValue.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = newValue;
    setVerificationCode(newCode);

    // Clear existing timeout
    if (verificationTimeoutRef.current) {
      clearTimeout(verificationTimeoutRef.current);
    }

    // Auto-focus next input
    if (newValue && index < 5) {
      const nextInput = document.querySelector(`input[name="phone-code-${index + 1}"]`) as HTMLInputElement;
      nextInput?.focus();
    }

    // Auto-verify when all fields are filled with delay
    if (newCode.every(digit => digit !== '')) {
      verificationTimeoutRef.current = setTimeout(() => {
        handleVerifyCode(newCode.join(''));
      }, 800);
    }
  };

  const handleVerifyCode = async (code: string) => {
    if (code.length !== 6) return;

    setIsVerifying(true);
    try {
      const fullPhoneNumber = selectedCountry.dialCode + value;
      await apiService.verifyPhone(fullPhoneNumber, code);
      
      setVerificationStep('verified');
      setNextResendTime(null);
      toast.success('Phone number verified successfully!');
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationCode(['', '', '', '', '', '']);
      
      const errorMessage = error instanceof Error ? error.message : 'Invalid verification code';
      toast.error(errorMessage);
      
      // Focus first input for retry
      const firstInput = document.querySelector(`input[name="phone-code-0"]`) as HTMLInputElement;
      firstInput?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (nextResendTime && new Date() < nextResendTime) {
      return;
    }

    setIsResending(true);
    try {
      const fullPhoneNumber = selectedCountry.dialCode + value;
      await apiService.resendPhoneVerification(fullPhoneNumber);
      
      setVerificationCode(['', '', '', '', '', '']);
      
      // Set new resend timer (60 seconds)
      const nextResend = new Date();
      nextResend.setSeconds(nextResend.getSeconds() + 60);
      setNextResendTime(nextResend);
      
      toast.success('Verification code sent to your phone');
      
      // Focus first input
      const firstInput = document.querySelector(`input[name="phone-code-0"]`) as HTMLInputElement;
      firstInput?.focus();
    } catch (error) {
      console.error('Failed to resend:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend verification code';
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Phone number
        {required && <span className="text-red-500 ml-1">*</span>}
        {verificationStep !== 'verified' && (
          <span className="text-xs text-orange-600 ml-2">(Verification required)</span>
        )}
      </label>
      
      {verificationStep === 'input' && (
        <>
          <div className="flex">
            <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              disabled={disabled}
            />
            
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="123 4567 890"
              className="rounded-l-none rounded-r-none flex-1 h-12"
              disabled={disabled}
            />
            
            <button
              type="button"
              onClick={handleSendVerification}
              disabled={isVerifying || !value || disabled}
              className="h-12 px-4 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-sm"
            >
              {isVerifying ? 'Sending...' : 'Verify'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            We&apos;ll send you a verification code
          </p>
        </>
      )}

      {verificationStep === 'verify' && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              We&apos;ve sent a verification code to <strong>{selectedCountry.dialCode} {value}</strong>
            </p>
          </div>
          
          {/* OTP Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Verification code
            </label>
            <div className="flex justify-center space-x-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  name={`phone-code-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-green-500 focus:outline-none bg-white dark:bg-gray-800"
                  placeholder="0"
                  disabled={disabled}
                />
              ))}
            </div>
          </div>
          
          {/* Resend */}
          <div className="text-center">
            {nextResendTime && resendTimer > 0 ? (
              <p className="text-sm text-gray-500">
                Resend code in {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending || disabled}
                className="text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
              >
                {isResending ? 'Resending...' : 'Resend code'}
              </button>
            )}
          </div>
        </div>
      )}

      {verificationStep === 'verified' && (
        <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <div>
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              Phone number verified
            </p>
            <p className="text-xs text-green-600 dark:text-green-300">
              {selectedCountry.dialCode} {value}
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}
