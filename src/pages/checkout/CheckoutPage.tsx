import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  Lock,
  ChevronDown,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { navigate } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('•••');
  const [summaryOpenMobile, setSummaryOpenMobile] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to payment result with success status
      navigate('/payment-result', { status: 'success' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#17102A] text-[#F3EEFF] flex flex-col justify-between">
      {/* Header */}
      <header className="h-16 px-6 border-b border-[#3A2E5C] flex items-center justify-between">
        <button
          onClick={() => navigate('/pricing')}
          className="flex items-center gap-2 text-xs text-[#A99CCB] hover:text-[#F3EEFF]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to pricing</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-[#2DD4BF]">
          <Lock className="w-3.5 h-3.5" />
          <span>256-bit Encrypted Checkout</span>
        </div>
      </header>

      {/* Main Two-Column */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Mobile collapsible summary */}
        <div className="lg:hidden mb-6 bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-4">
          <button
            onClick={() => setSummaryOpenMobile(!summaryOpenMobile)}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#F3EEFF]"
          >
            <span>Order Summary: Founding Builder (₹1,499)</span>
            <ChevronDown
              className={`w-4 h-4 text-[#A99CCB] transition-transform ${
                summaryOpenMobile ? 'rotate-180' : ''
              }`}
            />
          </button>
          {summaryOpenMobile && (
            <div className="mt-3 pt-3 border-t border-[#3A2E5C] space-y-2 text-xs text-[#A99CCB]">
              <p>• 8 Personal 30-min mentor sessions monthly</p>
              <p>• Find Your Four team constellation matching</p>
              <p>• Build Rooms, Kanban tasks & challenges</p>
              <p className="text-[#FFB547] font-semibold pt-1">Renewal: Dec 01, 2026</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Order Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 space-y-6">
            <div className="bg-[#1E1537] border border-[#3A2E5C] rounded-3xl p-6 space-y-5">
              <span className="text-xs font-bold text-[#FFB547] uppercase tracking-wider">
                Order Summary
              </span>

              <div className="space-y-1">
                <h3 className="font-heading font-bold text-xl text-[#F3EEFF]">
                  Founding Builder Membership
                </h3>
                <p className="text-xs text-[#A99CCB]">Monthly recurring membership</p>
              </div>

              <div className="py-4 border-y border-[#3A2E5C] space-y-3 text-xs text-[#A99CCB]">
                <div className="flex justify-between text-[#F3EEFF]">
                  <span>Subtotal</span>
                  <span>₹1,499.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Founding Cohort Discount</span>
                  <span className="text-[#2DD4BF]">- ₹500.00 (Applied)</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18% included)</span>
                  <span>₹228.66</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#F3EEFF] pt-2 border-t border-[#3A2E5C]/60">
                  <span>Total Due Today</span>
                  <span className="text-[#FFB547]">₹1,499.00</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#A99CCB]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB547]" />
                  <span>8 1-on-1 Mentor Credits (Active immediately)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB547]" />
                  <span>Find Your Four complementary algorithm</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB547]" />
                  <span>Next renewal date: Dec 01, 2026</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#17102A] border border-[#3A2E5C] flex items-center gap-3 text-xs text-[#A99CCB]">
              <ShieldCheck className="w-5 h-5 text-[#2DD4BF] shrink-0" />
              <span>
                14-day 100% money back guarantee. Cancel anytime in account settings.
              </span>
            </div>
          </div>

          {/* Right Column: Payment Form */}
          <div className="lg:col-span-7 bg-[#22183B] border border-[#3A2E5C] rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="font-heading font-bold text-xl text-[#F3EEFF]">Payment Details</h2>
              <p className="text-xs text-[#A99CCB] mt-0.5">
                Support for India UPI, Credit/Debit Cards, and Netbanking.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#F3EEFF]'
                    : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB] hover:border-[#A99CCB]'
                }`}
              >
                <QrCode className="w-4 h-4 text-[#FFB547]" />
                <span className="text-xs font-semibold">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#F3EEFF]'
                    : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB] hover:border-[#A99CCB]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-xs font-semibold">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#F3EEFF]'
                    : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB] hover:border-[#A99CCB]'
                }`}
              >
                <Building className="w-4 h-4 text-[#2DD4BF]" />
                <span className="text-xs font-semibold">Netbanking</span>
              </button>
            </div>

            <form onSubmit={handlePay} className="space-y-4 text-xs">
              {paymentMethod === 'upi' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#A99CCB] font-medium mb-1">
                      UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@okhdfcbank"
                      className="w-full nc-input"
                    />
                  </div>
                  <div className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] flex items-center justify-between text-[11px] text-[#A99CCB]">
                    <span>Popular Apps: GPay, PhonePe, Paytm, BHIM</span>
                    <span className="text-[#2DD4BF] font-semibold">Instant Approval</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#A99CCB] font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full nc-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#A99CCB] font-medium mb-1">Valid Thru</label>
                      <input
                        type="text"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full nc-input"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A99CCB] font-medium mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full nc-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-3">
                  <label className="block text-[#A99CCB] font-medium mb-1">Select Bank</label>
                  <select className="w-full nc-input">
                    <option className="bg-[#17102A]">HDFC Bank</option>
                    <option className="bg-[#17102A]">ICICI Bank</option>
                    <option className="bg-[#17102A]">State Bank of India (SBI)</option>
                    <option className="bg-[#17102A]">Axis Bank</option>
                    <option className="bg-[#17102A]">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Billing Location */}
              <div className="pt-2 border-t border-[#3A2E5C] space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C6F9B]">
                  Billing Information
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#A99CCB] font-medium mb-1">State</label>
                    <select className="w-full nc-input">
                      <option className="bg-[#17102A]">Telangana</option>
                      <option className="bg-[#17102A]">Andhra Pradesh</option>
                      <option className="bg-[#17102A]">Karnataka</option>
                      <option className="bg-[#17102A]">Tamil Nadu</option>
                      <option className="bg-[#17102A]">Maharashtra</option>
                      <option className="bg-[#17102A]">Other State</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#A99CCB] font-medium mb-1">PIN Code</label>
                    <input
                      type="text"
                      defaultValue="500081"
                      className="w-full nc-input"
                    />
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full nc-button-primary py-3.5 text-xs font-bold mt-2 shadow-glow-accent"
              >
                {isProcessing ? 'Authorizing payment...' : 'Pay ₹1,499 & Activate Membership'}
              </button>

              <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-[#7C6F9B]">
                <button
                  type="button"
                  onClick={() => navigate('/payment-result', { status: 'failed' })}
                  className="hover:underline"
                >
                  [Simulate Failure]
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/payment-result', { status: 'pending' })}
                  className="hover:underline"
                >
                  [Simulate Pending]
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="h-14 border-t border-[#3A2E5C] px-6 flex items-center justify-center text-xs text-[#7C6F9B]">
        <span>© 2026 Nightclub. Privacy-first network for Telugu AI builders.</span>
      </footer>
    </div>
  );
};
