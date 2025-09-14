'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth-store';
import { apiService } from '@/lib/api';
import { toast } from 'react-toastify';

const profileSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name'),
  lastName: z.string().min(1, 'Please enter your last name'),
  phoneNumber: z.string().min(1, 'Please enter your phone number'),
  language: z.string().min(1, 'Please select a language'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const languages = [
  { value: 'en-GB', label: 'English-GB' },
  { value: 'en-US', label: 'English-US' },
  { value: 'tw', label: 'Twi' },
  { value: 'ga', label: 'Ga' },
];

const countryCodes = [
  { code: '+233', country: 'GH', flag: '🇬🇭' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
];

export function OnboardingProfileForm() {
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneVerificationStep, setPhoneVerificationStep] = useState<'input' | 'verify' | 'verified'>('input');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const [nextResendTime, setNextResendTime] = useState<Date | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { setAuthStep } = useAuthStore();

  // Refs for timers and file input
  const verificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resendTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  // Cleanup timers and avatar preview on unmount
  useEffect(() => {
    return () => {
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
      if (resendTimerRef.current) {
        clearTimeout(resendTimerRef.current);
      }
      // Cleanup avatar preview URL to prevent memory leaks
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      language: 'en-GB',
    },
  });

  const selectedLanguage = watch('language');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const phoneNumber = watch('phoneNumber');

  // Check if all required fields are completed
  const isFormValid = () => {
    return (
      selectedAvatar &&
      firstName?.trim() &&
      lastName?.trim() &&
      phoneNumber?.trim() &&
      phoneVerificationStep === 'verified' &&
      selectedLanguage
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    // Check if phone is verified
    if (phoneVerificationStep !== 'verified') {
      toast.error('Please verify your phone number before continuing');
      return;
    }

    // Check if avatar is selected (mandatory)
    if (!selectedAvatar) {
      toast.error('Please upload a profile picture before continuing');
      return;
    }

    // Check if all required fields are filled
    if (!data.firstName.trim()) {
      toast.error('Please enter your first name');
      return;
    }

    if (!data.lastName.trim()) {
      toast.error('Please enter your last name');
      return;
    }

    if (!data.phoneNumber.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    setIsLoading(true);
    try {
      const profileData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        countryCode: selectedCountryCode.code,
        preferredLanguage: data.language,
      };

      // Update profile with avatar if selected
      const result = await apiService.updateProfile(profileData, selectedAvatar || undefined);
      
      toast.success('Profile updated successfully!');
      setAuthStep('onboarding-interests');
    } catch (error) {
      console.error('Failed to save profile:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    setAuthStep('onboarding-location');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    processAvatarFile(file);
  };

  const removeAvatar = () => {
    setSelectedAvatar(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file) {
      // Process the file directly instead of simulating an event
      processAvatarFile(file);
    }
  };

  const processAvatarFile = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setSelectedAvatar(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSendVerification = async () => {
    const phoneNumber = watch('phoneNumber');
    if (!phoneNumber) {
      return;
    }

    setIsVerifying(true);
    try {
      const fullPhoneNumber = selectedCountryCode.code + phoneNumber;
      await apiService.sendPhoneVerification(fullPhoneNumber);
      
      setPhoneVerificationStep('verify');
      setVerificationAttempts(0);
      
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

  const handleVerifyCode = async () => {
    const code = verificationCode.join('');
    await handleVerifyCodeWithCode(code);
  };

  const handleResendCode = async () => {
    if (nextResendTime && new Date() < nextResendTime) {
      return; // Still in cooldown
    }

    setIsResending(true);
    try {
      const fullPhoneNumber = selectedCountryCode.code + watch('phoneNumber');
      await apiService.resendPhoneVerification(fullPhoneNumber);
      
      setVerificationCode(['', '', '', '', '', '']);
      
      // Exponential backoff: 30s, 60s, 120s, 240s, max 300s (5min)
      const backoffSeconds = Math.min(30 * Math.pow(2, verificationAttempts), 300);
      const nextResend = new Date();
      nextResend.setSeconds(nextResend.getSeconds() + backoffSeconds);
      setNextResendTime(nextResend);
      
      toast.success('Verification code sent to your phone');
      
      // Focus first input
      const firstInput = document.querySelector(`input[name="code-0"]`) as HTMLInputElement;
      firstInput?.focus();
    } catch (error) {
      console.error('Failed to resend:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend verification code';
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Clear existing timeout
    if (verificationTimeoutRef.current) {
      clearTimeout(verificationTimeoutRef.current);
    }

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="code-${index + 1}"]`) as HTMLInputElement;
      nextInput?.focus();
    }

    // Auto-verify when all fields are filled with delay
    if (newCode.every(digit => digit !== '')) {
      verificationTimeoutRef.current = setTimeout(() => {
        handleVerifyCodeWithCode(newCode.join(''));
      }, 800); // 800ms delay after user stops typing
    }
  };

  const handleVerifyCodeWithCode = async (code: string) => {
    if (code.length !== 6) return;

    setIsVerifying(true);
    try {
      const fullPhoneNumber = selectedCountryCode.code + watch('phoneNumber');
      await apiService.verifyPhone(fullPhoneNumber, code);
      
      setPhoneVerificationStep('verified');
      setNextResendTime(null); // Clear timer
      toast.success('Phone number verified successfully!');
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationCode(['', '', '', '', '', '']);
      setVerificationAttempts(prev => prev + 1);
      
      const errorMessage = error instanceof Error ? error.message : 'Invalid verification code';
      toast.error(errorMessage);
      
      // Focus first input for retry
      const firstInput = document.querySelector(`input[name="code-0"]`) as HTMLInputElement;
      firstInput?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[30px] font-bold leading-[38px] text-gray-900 dark:text-white font-inter tracking-[0%] mb-6">
          Let's finish setting up your account
        </h1>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Basic Profile Details
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A few details to personalize your experience and build trust.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Upload Picture */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <div 
              className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-200 ${
                isDragging 
                  ? 'bg-green-100 dark:bg-green-900/20 border-2 border-green-500 border-dashed' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={handleAvatarClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className={`w-10 h-10 ${isDragging ? 'text-green-500' : 'text-gray-400'}`} />
              )}
            </div>
            {avatarPreview && (
              <button
                type="button"
                onClick={removeAvatar}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 z-10"
              >
                ×
              </button>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={handleAvatarClick}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
            >
              {avatarPreview ? 'Change picture' : 'Upload picture'}
            </button>
            {avatarPreview ? (
              <p className="text-xs text-gray-500">
                {selectedAvatar?.name} ({Math.round((selectedAvatar?.size || 0) / 1024)}KB)
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                Click or drag & drop an image
              </p>
            )}
          </div>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First name
            </label>
            <div className="relative">
              <Input
                {...register('firstName')}
                placeholder="John"
                className="pl-10 h-12"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.firstName && (
              <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last name
            </label>
            <div className="relative">
              <Input
                {...register('lastName')}
                placeholder="Doe"
                className="pl-10 h-12"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.lastName && (
              <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone number
            {phoneVerificationStep !== 'verified' && (
              <span className="text-xs text-orange-600 ml-2">(Verification required)</span>
            )}
          </label>
          
          {phoneVerificationStep === 'input' && (
            <>
              <div className="flex">
                {/* Country Code Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="h-12 px-4 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 min-w-[100px]"
                  >
                    <span className="text-sm">{selectedCountryCode.flag}</span>
                    <span className="text-sm font-medium">{selectedCountryCode.code}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountryCode(country);
                            setShowCountryDropdown(false);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2 text-sm"
                        >
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Phone Input */}
                <Input
                  {...register('phoneNumber')}
                  placeholder="123 4567 890"
                  className="rounded-l-none rounded-r-none flex-1 h-12"
                />
                
                {/* Verify Button */}
                <button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={isVerifying || !watch('phoneNumber')}
                  className="h-12 px-4 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-sm"
                >
                  {isVerifying ? 'Sending...' : 'Verify'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter a number between 0 and 9
              </p>
            </>
          )}

          {phoneVerificationStep === 'verify' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  We've sent a verification code to <strong>{selectedCountryCode.code} {watch('phoneNumber')}</strong>
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
                      name={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-green-500 focus:outline-none bg-white dark:bg-gray-800"
                      placeholder="0"
                    />
                  ))}
                </div>
              </div>
              
              {/* Auto-verification status and Resend */}
              <div className="text-center space-y-2">
                {isVerifying && (
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Verifying code...
                  </p>
                )}
                
                <div>
                  {nextResendTime && resendTimer > 0 ? (
                    <p className="text-sm text-gray-500">
                      Resend code in {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={isResending}
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      {isResending ? 'Resending...' : 'Resend code'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {phoneVerificationStep === 'verified' && (
            <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Phone number verified
                </p>
                <p className="text-xs text-green-600 dark:text-green-300">
                  {selectedCountryCode.code} {watch('phoneNumber')}
                </p>
              </div>
            </div>
          )}

          {errors.phoneNumber && (
            <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs">🌐</span>
                </div>
                <span className="text-sm">
                  {languages.find(lang => lang.value === selectedLanguage)?.label || 'Select language'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
                {languages.map((language) => (
                  <button
                    key={language.value}
                    type="button"
                    onClick={() => {
                      setValue('language', language.value);
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.language && (
            <p className="text-sm text-red-600 mt-1">{errors.language.message}</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <Button
            type="button"
            variant="ghost"
            onClick={handlePrevious}
            className="text-gray-600 hover:text-gray-700 font-medium"
          >
            ← Previous
          </Button>
          
            <Button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 h-12 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 
               phoneVerificationStep !== 'verified' ? 'Verify Phone First' :
               !selectedAvatar ? 'Upload Profile Picture' :
               !firstName?.trim() || !lastName?.trim() ? 'Complete Required Fields' :
               'Next →'}
            </Button>
        </div>
      </form>
    </div>
  );
}
