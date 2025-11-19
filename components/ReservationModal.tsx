'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, Users2, CalendarDays, Clock, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';

interface ReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TimeSlot = {
  time: string;
  available: boolean;
  spotsLeft?: number;
};

// Mock reserved dates/times
const reservedSlots = new Set([
  '2025-11-20-18:00',
  '2025-11-20-18:30',
  '2025-11-20-19:00',
  '2025-11-21-19:30',
  '2025-11-22-20:00',
  '2025-11-23-18:00',
]);

const generateTimeSlots = (selectedDate: Date | undefined): TimeSlot[] => {
  if (!selectedDate) return [];
  
  const slots: TimeSlot[] = [];
  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  
  // Generate time slots from 12:00 PM to 10:00 PM
  for (let hour = 12; hour <= 22; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 22 && minute === 30) break; // Last slot is 10:00 PM
      
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const slotKey = `${dateStr}-${timeStr}`;
      const isReserved = reservedSlots.has(slotKey);
      
      slots.push({
        time: timeStr,
        available: !isReserved,
        spotsLeft: isReserved ? 0 : Math.floor(Math.random() * 5) + 1,
      });
    }
  }
  
  return slots;
};

const getGuestIcon = (count: number) => {
  if (count === 1) return User;
  if (count === 2) return Users2;
  return Users;
};

const getGuestLabel = (count: number, language: string) => {
  if (language === 'en') {
    return count === 1 ? 'Solo' : count === 2 ? 'Couple' : count <= 4 ? 'Small' : count <= 6 ? 'Group' : 'Large';
  }
  return count === 1 ? '單人' : count === 2 ? '情侶' : count <= 4 ? '小組' : count <= 6 ? '團體' : '大團';
};

export function ReservationModal({ open, onOpenChange }: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { language } = useLanguage();

  const timeSlots = generateTimeSlots(selectedDate);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setGuests(2);
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setIsSubmitted(false);
    }, 300);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  // Disable past dates
  const disabledDays = { before: new Date() };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-primary'>
            {language === 'en' ? 'Reserve Your Table' : '預訂座位'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en'
              ? 'Select your party size and preferred date & time'
              : '選擇人數及日期時間'}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode='wait'>
          {!isSubmitted ? (
            <motion.div
              key='form'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className='space-y-6 py-4'>
              {/* Step 1: Guest Count */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                    1
                  </div>
                  <span className='font-medium'>
                    {language === 'en' ? 'Party Size' : '人數'}
                  </span>
                </div>

                <div className='grid grid-cols-4 gap-3'>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                    const Icon = getGuestIcon(num);
                    const label = getGuestLabel(num, language);
                    return (
                      <motion.button
                        key={num}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setGuests(num)}
                        className={`p-3 rounded-xl border-2 transition-all relative overflow-hidden ${
                          guests === num
                            ? 'border-secondary bg-secondary/20 text-secondary shadow-lg'
                            : 'border-border hover:border-secondary/50 hover:bg-secondary/5'
                        }`}>
                        <div className='relative z-10'>
                          <Icon className='w-6 h-6 mx-auto mb-1' />
                          <div className='text-xl font-bold mb-0.5'>{num}</div>
                          <div className='text-[10px] font-medium opacity-70'>{label}</div>
                        </div>
                        {guests === num && (
                          <motion.div
                            layoutId='activeGuest'
                            className='absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent'
                            transition={{ type: 'spring', duration: 0.5 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & Time Selection */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                    2
                  </div>
                  <span className='font-medium'>
                    {language === 'en' ? 'Date & Time' : '日期及時間'}
                  </span>
                </div>

                {/* Calendar */}
                <div className='border rounded-xl p-4 bg-gradient-to-br from-card to-muted/20 shadow-sm'>
                  <div className='flex items-center gap-2 text-sm font-medium mb-3 text-muted-foreground'>
                    <CalendarDays className='w-4 h-4' />
                    {language === 'en' ? 'Select Date' : '選擇日期'}
                  </div>
                  <Calendar
                    mode='single'
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={disabledDays}
                    className='rounded-md w-full'
                  />
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className='space-y-3'>
                    <div className='flex items-center gap-2 text-sm font-medium'>
                      <Clock className='w-4 h-4' />
                      {language === 'en' ? 'Available Times' : '可選時間'}
                    </div>
                    <div className='grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2'>
                      {timeSlots.map((slot) => (
                        <motion.button
                          key={slot.time}
                          whileHover={slot.available ? { scale: 1.05 } : {}}
                          whileTap={slot.available ? { scale: 0.95 } : {}}
                          disabled={!slot.available}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          className={`p-3 rounded-lg border text-sm transition-all ${
                            selectedTime === slot.time
                              ? 'border-primary bg-primary text-primary-foreground'
                              : slot.available
                                ? 'border-border hover:border-primary/50'
                                : 'border-border bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
                          }`}>
                          <div className='font-medium'>{slot.time}</div>
                          {slot.available && slot.spotsLeft && (
                            <div className='text-xs mt-1 opacity-70'>
                              {slot.spotsLeft} {language === 'en' ? 'left' : '剩餘'}
                            </div>
                          )}
                          {!slot.available && (
                            <div className='text-xs mt-1'>
                              {language === 'en' ? 'Full' : '已滿'}
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3 pt-4 border-t'>
                <Button variant='outline' onClick={handleClose} className='flex-1'>
                  {language === 'en' ? 'Cancel' : '取消'}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!guests || !selectedDate || !selectedTime}
                  className='flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground'>
                  {language === 'en' ? 'Confirm Reservation' : '確認預訂'}
                </Button>
              </div>

              {/* Summary */}
              {(guests || selectedDate || selectedTime) && (
                <div className='bg-primary/5 rounded-lg p-4 border border-primary/20'>
                  <h4 className='font-semibold text-sm mb-2 text-primary'>
                    {language === 'en' ? 'Reservation Summary' : '預訂摘要'}
                  </h4>
                  <div className='space-y-1 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        {language === 'en' ? 'Guests:' : '人數：'}
                      </span>
                      <span className='font-medium'>{guests}</span>
                    </div>
                    {selectedDate && (
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>
                          {language === 'en' ? 'Date:' : '日期：'}
                        </span>
                        <span className='font-medium'>{format(selectedDate, 'PPP')}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>
                          {language === 'en' ? 'Time:' : '時間：'}
                        </span>
                        <span className='font-medium'>{selectedTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key='success'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className='py-12 text-center'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Check className='w-10 h-10 text-green-600' />
              </motion.div>
              <h3 className='text-2xl font-bold mb-2'>
                {language === 'en' ? 'Reservation Confirmed!' : '預訂已確認！'}
              </h3>
              <p className='text-muted-foreground'>
                {language === 'en'
                  ? 'We look forward to serving you.'
                  : '期待為您服務。'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
