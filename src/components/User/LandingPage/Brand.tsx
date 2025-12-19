import { Container } from '@mantine/core';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface BrandProps {
    id?: string;
}

const Brand = ({ id }: BrandProps) => {
    const brands = [
        { id: 1, name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png' },
        { id: 2, name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png' },
        { id: 3, name: 'Puma', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Puma-logo-%28text%29.svg' },
        { id: 4, name: 'Under Armour', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg' },
        { id: 5, name: 'New Balance', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png' },
        { id: 6, name: 'Reebok', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Reebok_red_logo.svg/300px-Reebok_red_logo.svg.png' },
        { id: 7, name: 'Converse', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Converse_logo.svg/1280px-Converse_logo.svg.png' },
        { id: 8, name: 'Asics', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Asics_Logo.svg/2560px-Asics_Logo.svg.png' },
    ];

    const displayedBrands = brands.slice(0, 6);

    const marqueeRef = useRef<HTMLDivElement>(null);

    return (
        <section id={id} className="py-16 bg-white overflow-hidden">
            <Container size="xl">
                <h2 className="text-3xl font-bold text-center mb-12">Các thương hiệu nổi bật</h2>

                <div className="relative overflow-hidden" ref={marqueeRef}>
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{
                            x: [0, -1000],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear"
                            }
                        }}
                        whileHover={{ animationPlayState: 'paused' }}
                    >
                        {displayedBrands.map((brand) => (
                            <motion.div
                                key={brand.id}
                                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300 mx-4"
                                style={{ minWidth: '180px' }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="h-12 object-contain"
                                />
                            </motion.div>
                        ))}

                        {displayedBrands.map((brand) => (
                            <motion.div
                                key={`duplicate-${brand.id}`}
                                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300 mx-4"
                                style={{ minWidth: '180px' }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="h-12 object-contain"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

export default Brand;
