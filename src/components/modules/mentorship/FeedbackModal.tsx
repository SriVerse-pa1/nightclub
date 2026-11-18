import React, { useState } from 'react';
import { BookedSession } from '../../../types';
import { Star, X } from 'lucide-react';

interface FeedbackModalProps {
  session: BookedSession;
  onSubmit: (sessionId: string, rating: number, feedback: string) => void;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  session,
  onSubmit,
  onClose,
}) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [wouldBookAgain, setWouldBookAgain] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      session.id,
      rating,
      `${feedback.trim()} (${wouldBookAgain ? 'Would book again' : 'Would not book again'})`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29251F]/40 backdrop-blur-md">
      <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-card-hover">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCD1C0]">
          <h3 className="font-heading font-bold text-base text-[#29251F]">
            Session Feedback: {session.mentorName}
          </h3>
          <button onClick={onClose} className="text-[#665E54] hover:text-[#29251F] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#665E54] mb-2 font-medium">How helpful was this session?</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'text-[#805536] fill-[#805536]' : 'text-[#DCD1C0]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#665E54] mb-1.5 font-medium">What helped you the most?</label>
            <textarea
              rows={3}
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g. Mentor gave direct, actionable feedback on our tokenizer and connected us with an open benchmark."
              className="w-full nc-input resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="bookAgain"
              checked={wouldBookAgain}
              onChange={(e) => setWouldBookAgain(e.target.checked)}
              className="accent-[#805536] w-4 h-4 rounded"
            />
            <label htmlFor="bookAgain" className="text-[#29251F] text-xs cursor-pointer font-medium">
              I would enthusiastically book another session with this mentor
            </label>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="nc-button-secondary py-2 px-4">
              Skip
            </button>
            <button type="submit" className="nc-button-primary py-2 px-5">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
