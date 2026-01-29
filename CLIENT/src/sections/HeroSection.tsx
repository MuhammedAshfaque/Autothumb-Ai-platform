'use client'
import { CheckIcon, ChevronRightIcon, VideoIcon } from "lucide-react";
import TiltedImage from "../components/TiltImage";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import SoftBackdrop from "../components/SoftBackdrop";

export default function HeroSection() {
    const navigate = useNavigate()
    const specialFeatures = [
        "No design skills needed",
        "Fast generation",
        "High CTR templates",
    ];

    return (
        <>
        <SoftBackdrop/>
        <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32 pt-32 pb-24">

            <div className="absolute top-24 -z-10 left-1/4 size-72 bg-blue-600 blur-[300px]"></div>


            <h1 className="text-5xl/16 md:text-6xl/20 font-semibold max-w-3xl text-center text-gray-200">
                AI-powered thumbnails that get more clicks

            </h1>
            <motion.p
                className="text-base text-center text-gray-200 max-w-xl mt-6"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                Stop spending hours designing thumbnails. AutoThumb AI helps you generate
                high-converting, professional thumbnails in seconds.
            </motion.p>

            <motion.div
                className="flex items-center gap-4 mt-8"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <button
                    onClick={() => navigate('/generate')}
                    className="bg-blue-700 hover:bg-blue-700 text-white rounded-full px-8 h-11 shadow-md"
                >
                    Generate thumbnails
                </button>


            </motion.div>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-14">
                {specialFeatures.map((feature, index) => (
                    <motion.p
                        className="flex items-center gap-2"
                        key={index}
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.3 }}
                    >
                        <CheckIcon className="size-5 text-blue-600" />
                        <span className="text-gray-500">{feature}</span>
                    </motion.p>
                ))}
            </div>

            <TiltedImage />
        </div>
        </>
    );
}