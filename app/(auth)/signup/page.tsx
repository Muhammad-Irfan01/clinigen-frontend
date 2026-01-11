"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import {
  Check, Search, ChevronDown, X,
  ArrowLeft, Phone, Mail, HelpCircle
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

// --- Types ---
type SignupStep = 1 | 2 | 3;

export default function ClinigenSignupFlow() {
  const [currentStep, setCurrentStep] = useState<SignupStep>(1);
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>([]);
  const {signup, isLoading} = useAuthStore();
  const router = useRouter();

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "", lastName: "", email: "", phone: "", jobRole: "", licenseNumber: "", extension: "",
      instituteSearch: "", instituteName: "", addressLine1: "", townCity: "", country: "United Kingdom",
      medicineSearch: "", password: ""
    }
  });

  // Dynamic Watchers
  const watchJob = useWatch({ control, name: "jobRole" });
  const watchInstituteSearch = useWatch({ control, name: "instituteSearch" });

  const nextStep = () => setCurrentStep((prev) => (prev as number) + 1 as SignupStep);
  const prevStep = () => setCurrentStep((prev) => (prev as number) - 1 as SignupStep);

  const onSubmit = async (data: any) => {
    // e.preventDefault();
    // console.log("Final Registration Data:", { ...data, selectedMedicines });
    try {
      await signup({ ...data, medicineSearch: selectedMedicines.join(', ') });
      // Redirect to email verification page after successful signup
      router.push('/verify-email');
    } catch (error) {
      console.error("Signup failed:", error);
      // The error is already handled in the auth store
    }
  };

  // --- UI Sub-Components ---
  const Sidebar = () => (
    <div className="w-full md:w-95 bg-[#F3F2FF] p-10 flex flex-col justify-between relative overflow-hidden">
      <div className="z-10">
        <div className="mb-10 flex items-center gap-1 text-xl font-black italic tracking-tighter">
          <span className="text-[#6FCF97]">CLINIGEN</span>
          <span className="text-[#7B3FE4]">DIRECT</span>
        </div>

        <h1 className="text-3xl font-bold text-[#1A1A3F] leading-tight mb-12">
          Sign up for access to Clinigen Direct in two minutes
        </h1>

        <div className="space-y-10 relative">
          <div className="absolute left-3.75 top-4 bottom-4 w-0.5 bg-slate-200 z-0" />
          <StepIndicator step={1} current={currentStep} title="About you" desc="Provide your name and contact" />
          <StepIndicator step={2} current={currentStep} title="Your institute" desc="Confirm your place of work" />
          <StepIndicator step={3} current={currentStep} title="Medicines" desc="Select medicines you're looking for" />
        </div>
      </div>

      {/* Decorative Phone UI from Image */}
      <div className="mt-10 relative flex justify-center opacity-90 scale-90">
        <div className="w-44 h-72 bg-slate-800 rounded-[2.5rem] border-[6px] border-slate-900 shadow-2xl relative overflow-hidden">
          <div className="bg-[#7B3FE4] h-full w-full p-4 flex flex-col gap-2">
            <div className="bg-white/20 h-6 rounded w-full" />
            <div className="bg-white/10 h-16 rounded w-full mt-4" />
          </div>
          <div className="absolute top-1/2 -right-3 w-8 h-8 bg-[#FF5E62] rounded-full border-2 border-white flex items-center justify-center text-[10px]">💊</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-4 md:p-10 font-sans text-slate-800">
      <motion.div layout className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden min-h-187.5">

        <Sidebar />

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-8 md:p-16 flex flex-col">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-xl mx-auto w-full">
                <h2 className="text-2xl font-bold mb-8">Please provide your details</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input label="First name" {...register("firstName")} />
                  <Input label="Last name" {...register("lastName")} />
                </div>
                <Input label="Your work email address" sub="Individual email rather than shared department" {...register("email")} />
                <div className="grid grid-cols-2 gap-4 my-4">
                  <Input label="Work phone" placeholder="+44" {...register("phone")} />
                  <Input label="Extension (opt)" {...register("extension")} />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600">Your job</label>
                    <select {...register("jobRole")} className="w-full border border-slate-300 rounded-lg p-3 bg-white outline-none focus:ring-2 focus:ring-[#7B3FE4]">
                      <option value="">Please select</option>
                      <option value="Physician">Physician</option>
                      <option value="Pharmacist">Pharmacist</option>
                    </select>
                  </div>
                  {watchJob === "Physician" && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <Input label="License number" placeholder="admj9725732" {...register("licenseNumber")} />
                    </motion.div>
                  )}
                </div>
                <Input label="Password" type="password" {...register("password")} />
                <button type="button" onClick={nextStep} className="w-full md:w-auto self-end float-right bg-[#7B3FE4] text-white px-12 py-3 rounded-full font-bold">Next</button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-xl mx-auto w-full">
                <h2 className="text-2xl font-bold mb-8">Please confirm your place of work</h2>
                <div className="relative mb-6">
                  <label className="text-sm font-semibold text-slate-600 block mb-1">Enter your institute address</label>
                  <input {...register("instituteSearch")} placeholder="Start typing address..." className="w-full border border-slate-300 rounded-lg p-3 pr-10 outline-none" />
                  <Search className="absolute right-3 top-9 text-slate-400" size={18} />
                </div>

                <AnimatePresence>
                  {watchInstituteSearch.length > 0 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="space-y-4 overflow-hidden">
                      <Input label="Institute name" {...register("instituteName")} />
                      <Input label="Address line 1" {...register("addressLine1")} />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Town or city" {...register("townCity")} />
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-slate-600">Country</label>
                          <select {...register("country")} className="w-full border border-slate-300 rounded-lg p-3 bg-white outline-none">
                            <option>United Kingdom</option>
                            <option>Canada</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex justify-between mt-10">
                  <button type="button" onClick={prevStep} className="border-2 border-[#7B3FE4] text-[#7B3FE4] px-10 py-2.5 rounded-full font-bold">Previous</button>
                  <button type="button" onClick={nextStep} className="bg-[#7B3FE4] text-white px-12 py-3 rounded-full font-bold">Next</button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-xl mx-auto w-full">
                <h2 className="text-2xl font-bold mb-2">Which medicines you are looking for?</h2>
                <p className="text-slate-500 mb-8">Search for medicines (optional)</p>
                <div className="relative mb-6">
                  <input
                    {...register("medicineSearch")}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value;
                        if (val) { setSelectedMedicines([...selectedMedicines, val]); setValue("medicineSearch", ""); }
                      }
                    }}
                    placeholder="Start typing to find medicine..."
                    className="w-full border border-slate-300 rounded-lg p-4 outline-none"
                  />
                  <Search className="absolute right-4 top-4.5 text-slate-400" size={20} />
                </div>
                <div className="flex flex-wrap gap-2 mb-10">
                  {selectedMedicines.map(m => (
                    <span key={m} className="bg-[#F3F2FF] text-[#7B3FE4] px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                      {m} <X size={14} className="cursor-pointer" onClick={() => setSelectedMedicines(selectedMedicines.filter(x => x !== m))} />
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button type="button" onClick={prevStep} className="border-2 border-[#7B3FE4] text-[#7B3FE4] px-10 py-2.5 rounded-full font-bold">Previous</button>
                  <button type="submit" disabled={isLoading} className={`bg-[#7B3FE4] text-white px-12 py-3 rounded-full font-bold ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </form>
      </motion.div>

      {/* Persistent Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#E9E4F5] text-[#63499E] px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 font-bold text-sm">
        👋 Need help?
      </button>
    </div>
  );
}

// --- Helper UI Components ---
const Input = React.forwardRef(({ label, sub, type = "text", ...props }: any, ref) => (
  <div className="flex-1 space-y-1">
    <label className="text-sm font-semibold text-slate-600 block">{label}</label>
    <input type={type} ref={ref as any} {...props} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#7B3FE4]/20 focus:border-[#7B3FE4]" />
    {sub && <p className="text-[10px] text-slate-400">{sub}</p>}
  </div>
));

const StepIndicator = ({ step, current, title, desc }: any) => {
  const isDone = current === "final" || (typeof current === "number" && current > step);
  const isActive = current === step;
  return (
    <div className="flex items-start gap-4 z-10 relative">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-all
        ${isDone ? 'bg-[#7B3FE4] text-white' : isActive ? 'bg-[#1A1A3F] text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>
        {isDone ? <Check size={16} strokeWidth={3} /> : step}
      </div>
      <div>
        <h3 className={`text-sm font-bold ${isActive || isDone ? 'text-[#1A1A3F]' : 'text-slate-400'}`}>{title}</h3>
        <p className="text-[11px] text-slate-500 leading-tight">{desc}</p>
      </div>
    </div>
  );
};

const SuccessInfo = ({ icon, title, desc }: any) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 shadow-inner">{icon}</div>
    <div>
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);