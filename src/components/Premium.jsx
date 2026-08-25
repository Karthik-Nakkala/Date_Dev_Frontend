import { useState } from 'react';
import { Check, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import PremiumSuccess from './PremiumSuccess';
import { useSelector } from 'react-redux';


const Premium = () => {
  const [activePlan, setActivePlan] = useState('gold');

  const isPremiumfromGlobalState=useSelector((store)=>store.user?.isPremium);


  const [premiumState,setPremiumState]=useState(isPremiumfromGlobalState);

  const plans = [
    {
      id: 'silver',
      name: 'Silver',
      tagline: 'For getting started',
      price: '149',
      buttonText: 'Choose Silver',
      popular: false,
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none" className="shrink-0">
          <defs>
            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="silverStar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
          <path d="M24 4L8 12V24C8 34 16.5 40.5 24 44C31.5 40.5 40 34 40 24V12L24 4Z" fill="url(#silverGrad)" stroke="#E2E8F0" strokeWidth="1" />
          <path d="M24 7L11 13.5V23.5C11 31.5 17.8 36.8 24 39.8C30.2 36.8 37 31.5 37 23.5V13.5L24 7Z" fill="#1E293B" opacity="0.3" />
          <path d="M24 15L27 21H33.5L28.5 25L30.5 31.5L24 27.5L17.5 31.5L19.5 25L14.5 21H21L24 15Z" fill="url(#silverStar)" />
        </svg>
      ),
      features: [
        { text: '10 Connection Requests / day' },
        { text: 'See who viewed your profile' },
        { text: 'Basic profile customization' },
        { text: 'Access to public posts' },
        { text: 'Join up to 5 group chats' },
        { text: 'Standard support' }
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      tagline: 'For active builders',
      price: '299',
      buttonText: 'Choose Gold',
      popular: true,
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none" className="shrink-0">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>
            <linearGradient id="goldStar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFDE7" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>
          </defs>
          <path d="M24 4L8 12V24C8 34 16.5 40.5 24 44C31.5 40.5 40 34 40 24V12L24 4Z" fill="url(#goldGrad)" stroke="#FEF08A" strokeWidth="1" />
          <path d="M24 7L11 13.5V23.5C11 31.5 17.8 36.8 24 39.8C30.2 36.8 37 31.5 37 23.5V13.5L24 7Z" fill="#451A03" opacity="0.3" />
          <path d="M24 15L27 21H33.5L28.5 25L30.5 31.5L24 27.5L17.5 31.5L19.5 25L14.5 21H21L24 15Z" fill="url(#goldStar)" />
        </svg>
      ),
      features: [
        { text: '30 Connection Requests / day' },
        { text: 'See who viewed your profile' },
        { text: 'Advanced profile customization' },
        { text: 'Access to public & premium posts' },
        { text: 'Join unlimited group chats' },
        { text: 'Highlight your profile', badge: 'New' },
        { text: 'Priority support' }
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond',
      tagline: 'For serious developers',
      price: '599',
      buttonText: 'Choose Diamond',
      popular: false,
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none" className="shrink-0">
          <defs>
            <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#31108F" />
            </linearGradient>
          </defs>
          <path d="M24 4L38 16L24 44L10 16L24 4Z" fill="url(#diamondGrad)" />
          <path d="M24 4L31 16H17L24 4Z" fill="#A5B4FC" opacity="0.7" />
          <path d="M10 16H17L24 44L10 16Z" fill="#312E81" opacity="0.5" />
          <path d="M38 16H31L24 44L38 16Z" fill="#4338CA" opacity="0.6" />
          <path d="M17 16H31L24 44L17 16Z" fill="#6366F1" opacity="0.4" />
        </svg>
      ),
      features: [
        { text: 'Unlimited Connection Requests' },
        { text: 'See who viewed your profile' },
        { text: 'Advanced profile customization' },
        { text: 'Access to all premium posts' },
        { text: 'Join unlimited group chats' },
        { text: 'Profile boost (higher visibility)', badge: 'New' },
        { text: 'Early access to new features' },
        { text: 'Priority support + 1:1 help' }
      ]
    }
  ];

  const verifyPremium=async ()=>{
    const premiumTest=await axios.get(BASE_URL+'/premium/verify',{
        withCredentials:true
    });
    const {isPremium}=premiumTest.data;
    setPremiumState(isPremium);
  }

  async function handleSubscription(type){
    const order=await axios.post(BASE_URL+'/payment/create',{subscriptionType:type},
    {withCredentials:true}
    );
     const options = {
        key: order.data.keyId,
        amount: order.data.amount,
        currency: order.data.currency,
        name: 'DateDev',
        description: 'Now connect with premium Tick',
        order_id: order.data.orderId,
        prefill: {
          name: order.data.notes.firstName+' '+order.data.notes.lastName,
          email: order.data.notes.emailId,
          contact: '7093179378'
        },
        theme: {
          color: '#F37254'
        },
        handler:verifyPremium,
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
  }

  return premiumState ? (<PremiumSuccess/>) : (
    <div className="min-h-screen bg-[#070B18] text-slate-200 flex flex-col items-center justify-center  font-sans selection:bg-purple-500/30">
      
      {/* Container with a subtle border */}
      <div className="w-full max-w-6xl mx-auto border border-[#1E2640]/60 rounded-3xl p-5 sm:p-7 md:p-10 bg-[#090D1F]/50 backdrop-blur-md relative overflow-hidden">
        
        {/* Glow Effects in Background */}
        <div className="absolute top-[-20%] left-[20%] w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[20%] w-[300px] h-[300px] rounded-full bg-pink-600/10 blur-[120px] pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8 md:mb-10 relative z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            Choose the <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">plan</span> that's right for you 👑
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            All plans are billed monthly. Cancel anytime.
          </p>
        </div>

        {/* Desktop & Tablet Layout (Visible on md and up) */}
        <div className="hidden md:grid grid-cols-3 gap-5 relative z-10 items-stretch">
          {plans.map((plan) => {
            const isActive = activePlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`relative flex flex-col justify-between rounded-xl p-5 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#0F1530] border-2 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.12)] scale-[1.01] z-20'
                    : 'bg-[#0A0E24] border border-[#1E2640] hover:border-purple-500/40'
                }`}
              >
                {/* Popular Badge for Gold */}
                {plan.popular && (
                  <div className="absolute top-3.5 right-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                    <span>★</span> Most Popular
                  </div>
                )}

                {/* Plan Header */}
                <div>
                  <div className="mb-4">{plan.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-0.5">{plan.name}</h3>
                  <p className="text-[11px] text-slate-400 mb-4">{plan.tagline}</p>
                  
                  <div className="flex items-baseline gap-0.5 mb-4 border-b border-[#1E2640]/60 pb-4">
                    <span className="text-2xl font-extrabold text-white">₹{plan.price}</span>
                    <span className="text-[11px] text-slate-500">/ month</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="shrink-0 w-4 h-4 rounded-full bg-purple-950/80 border border-purple-500/40 flex items-center justify-center mt-[1px]">
                          <Check className="w-2.5 h-2.5 text-purple-400" strokeWidth={3} />
                        </span>
                        <span className="flex items-center gap-1.5">
                          {feature.text}
                          {feature.badge && (
                            <span className="bg-purple-900/60 text-purple-300 border border-purple-500/40 text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                              {feature.badge}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Action Button */}
                <div>
                  <button
                    className={`w-full py-2.5 rounded-lg font-semibold text-xs transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:brightness-110'
                        : 'border border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                    }`}
                  onClick={()=>handleSubscription(plan.name)}>
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Accordion Layout (Visible on sm/mobile only) */}
        <div className="md:hidden space-y-3 relative z-10">
          {plans.map((plan) => {
            const isExpanded = activePlan === plan.id;
            const isGold = plan.id === 'gold';
            
            return (
              <div
                key={plan.id}
                className={`rounded-xl transition-all duration-300 border ${
                  isExpanded
                    ? isGold
                      ? 'bg-[#0F1530] border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.1)]'
                      : 'bg-[#0F1530] border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.1)]'
                    : 'bg-[#0A0E24] border-[#1E2640]'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => setActivePlan(isExpanded ? '' : plan.id)}
                  className="flex items-center justify-between p-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5">
                    {plan.icon}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm">{plan.name}</span>
                        {plan.popular && (
                          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center scale-90">
                            ★ Pop
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">{plan.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="text-right">
                      <div className="font-bold text-white text-sm">₹{plan.price}</div>
                      <div className="text-[8px] text-slate-500">/ month</div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-3 pb-4 border-t border-[#1E2640]/40 pt-3 animate-[fadeIn_0.2s_ease-out]">
                    {/* Features List */}
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="shrink-0 w-4 h-4 rounded-full bg-purple-950/80 border border-purple-500/40 flex items-center justify-center mt-[1px]">
                            <Check className="w-2.5 h-2.5 text-purple-400" strokeWidth={3} />
                          </span>
                          <span className="flex items-center gap-1">
                            {feature.text}
                            {feature.badge && (
                              <span className="bg-purple-900/60 text-purple-300 border border-purple-500/40 text-[7px] font-bold px-1 py-0.5 rounded-md uppercase tracking-wider">
                                {feature.badge}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <button
                      className={`w-full py-2 rounded-lg font-semibold text-[11px] transition-all duration-300 cursor-pointer ${
                        isGold
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm hover:brightness-110'
                          : 'border border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                      }`}
                    onClick={()=>handleSubscription(plan.name)}>
                      {plan.buttonText}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Guarantee */}
        <div className="flex items-center justify-center gap-1.5 mt-6 md:mt-8 text-[10px] text-slate-500 relative z-10">
          <Lock className="w-3 h-3" />
          <span>Secure payments. Cancel anytime.</span>
        </div>

      </div>
    </div>
  );
};

export default Premium;