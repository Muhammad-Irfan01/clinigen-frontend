import { motion } from "framer-motion";

export function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 border border-gray-100 rounded-2xl bg-white hover:border-blue-100 hover:shadow-xl transition-all"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}