import { motion } from 'framer-motion';

interface OverlayLoadingProps {
    visible: boolean;
    message?: string;
}

const OverlayLoading = ({ visible, message = 'Đang tải...' }: OverlayLoadingProps) => {
    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/5 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-10 shadow-2xl"
            >
                {/* GIF Image */}
                <div className="w-40 h-40 relative">
                    <img
                        src="/images/loading_png.gif"
                        alt="Loading"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Loading Text */}
                <div className="flex flex-col items-center gap-2">
                    <motion.p
                        className="text-lg font-semibold text-gray-800"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {message}
                    </motion.p>

                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-primary rounded-full"
                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default OverlayLoading;
