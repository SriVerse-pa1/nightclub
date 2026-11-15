import React, { useState } from 'react';
import { Mentor } from '../../../types';
import { Sparkles, Calendar, Clock, X, Check, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  mentor: Mentor;
  creditsRemaining: number;
  creditsTotal: number;
  onConfirmBooking: (mentorId: string, slotId: string, goal: string) => void;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  mentor,
  creditsRemaining,
  creditsTotal,
  onConfirmBooking,
  onClose,
}) => {
  const [selectedSlotId, setSelectedSlotId] = useState(
    mentor.slots.find((s) => s.isAvailable)?.id || mentor.slots[0]?.id || ''
  );
  const [sessionGoal, setSessionGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSlot = mentor.slots.find((s) => s.id === selectedSlotId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionGoal.trim() || !selectedSlotId) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmBooking(mentor.id, selectedSlotId, sessionGoal.trim());
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#1F1735] border border-[#3A2E5C] rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-glow-card max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#3A2E5C]">
          <div className="flex items-center gap-3">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-12 h-12 rounded-full object-cover border border-[#FFB547]/40"
            />
            <div>
              <span className="text-[11px] text-[#FFB547] uppercase tracking-wider font-semibold">
                Book 1-on-1 Mentor Session
              </span>
              <h3 className="font-heading font-bold text-lg text-[#F3EEFF]">{mentor.name}</h3>
              <p className="text-xs text-[#A99CCB]">
                {mentor.title} • {mentor.company}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A99CCB] hover:text-[#F3EEFF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Credits Status Callout */}
        <div className="p-3.5 rounded-2xl bg-[#17102A] border border-[#3A2E5C] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFB547]" />
            <div>
              <span className="text-[#F3EEFF] font-medium">Monthly Mentor Allowance</span>
              <p className="text-[11px] text-[#A99CCB]">Credits reset on the 1st of every month</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-[#FFB547]">
              {creditsRemaining} / {creditsTotal} left
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Slot Picker */}
          <div>
            <label className="block text-[#A99CCB] font-medium mb-2">
              Select 30-Minute Open Slot
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mentor.slots.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.isAvailable}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                      isSelected
                        ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#F3EEFF]'
                        : slot.isAvailable
                        ? 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB] hover:border-[#A99CCB]'
                        : 'border-[#2D234A] bg-[#17102A]/40 text-[#7C6F9B] cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#F3EEFF]">
                        {slot.day}, {slot.date}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FFB547]" />}
                    </div>
                    <span className="text-[11px] text-[#A99CCB] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#2DD4BF]" />
                      {slot.time}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Goal Input */}
          <div>
            <label className="block text-[#A99CCB] font-medium mb-1.5">
              What is your primary goal for this 30-minute session?
            </label>
            <textarea
              required
              rows={3}
              value={sessionGoal}
              onChange={(e) => setSessionGoal(e.target.value)}
              placeholder="e.g. Review our Telugu NLP acoustic model pipeline, discuss scaling bottlenecks and advice on pre-seed investor pitches."
              className="w-full nc-input resize-none text-xs"
            />
            <p className="text-[10px] text-[#7C6F9B] mt-1">
              Mentors review this before your call to arrive prepared.
            </p>
          </div>

          {/* Deduction Confirmation Banner */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-[#FFB547] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              This booking uses <strong>1 credit</strong>. You will have{' '}
              <strong>{creditsRemaining - 1} credits</strong> remaining for this month.
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="nc-button-secondary py-2.5 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || creditsRemaining <= 0 || !sessionGoal.trim()}
              className="nc-button-primary py-2.5 px-5 disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Session (1 Credit)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
