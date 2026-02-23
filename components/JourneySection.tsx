"use client";

import React from "react";
import { motion } from "framer-motion";

const JOURNEY_ITEMS = [
  {
    date: "02/2016",
    title: "The Early Days",
    description:
      "In the early years, we were a small team with a big vision. We started with a handful of passionate individuals determined to make a difference.",
    gradient: "from-[#270072] to-[#706FE4]",
  },
  {
    date: "08/2019",
    title: "Growth and Expansion",
    description:
      "We expanded our operations, both in terms of scope and geography, to better serve the evolving needs of our clients.",
    gradient: "from-[#706FE4] to-[#270072]",
  },
  {
    date: "04/2022",
    title: "Adapting to Change",
    description:
      "We embraced emerging technologies, implemented sustainable practices, and fostered a culture of innovation that has allowed us to stay ahead.",
    gradient: "from-[#5a5bd4] to-[#9b8ff5]",
  },
  {
    date: "06/2022",
    title: "Our Team",
    description:
      "They are the heart of our organization, and their unwavering commitment to excellence has been the driving force behind our growth.",
    gradient: "from-[#9b8ff5] to-[#5a5bd4]",
  },
  {
    date: "12/2022",
    title: "Client-Centric Approach",
    description:
      "We have always placed their needs and satisfaction at the center of everything we do. Their trust and loyalty have been instrumental in our journey.",
    gradient: "from-[#270072] to-[#9b8ff5]",
  },
  {
    date: "04/2023",
    title: "Looking Ahead",
    description:
      "We remain dedicated to pushing boundaries, delivering unmatched solutions, and continuing to be a partner in the success of our clients.",
    gradient: "from-[#706FE4] to-[#5a5bd4]",
  },
];

export default function JourneySection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#270072] mb-4">
            Our Journey Through Time
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tracing the Path of Our Legacy and Growth
          </p>
        </motion.div>

        {/* Journey Timeline with Vertical Line */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#706FE4] via-[#270072] to-[#706FE4] -translate-x-1/2 max-lg:hidden"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {JOURNEY_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col ${
                  idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 items-center justify-between relative`}
              >
                {/* Center Dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#706FE4] rounded-full border-4 border-white shadow-lg z-10 max-lg:hidden"></div>

                {/* Image */}
                <div className="lg:w-2/5 w-full">
                  <div
                    className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-linear-to-br ${item.gradient}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/30 text-6xl font-bold">
                        {item.date.split("/")[1]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-2/5 w-full">
                  <div
                    className={`${
                      idx % 2 === 0 ? "lg:text-right" : "lg:text-left"
                    } `}
                  >
                    <div className="text-sm text-gray-500 font-medium">
                      {item.date}
                    </div>
                    <h3 className="text-xl font-bold text-[#270072] mt-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 px-6"
        >
          <p className="text-xl font-semibold text-[#270072]">
            Thank you for being a part of our history, and we look forward to a
            future filled with shared successes and continued excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
