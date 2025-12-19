import { Container } from '@mantine/core';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface HeroSlide {
    id: number;
    type: 'image' | 'video';
    src: string;
    alt?: string;
    title: string;
    description: string;
    buttonText: string;
    buttonStyle: 'primary' | 'white';
    buttonLink: string;
}

export const HeroSection = () => {
    const heroSlides: HeroSlide[] = [
        {
            id: 3,
            type: 'video',
            src: 'https://image.uniqlo.com/UQ/CMS/video/jp/2025/HOME/GL_Aseets/LWC/women_lwc_home_pc.mp4',
            title: 'New Collection',
            description: 'Experience comfort and style like never before',
            buttonText: 'Watch Collection',
            buttonStyle: 'primary',
            buttonLink: '/collections/new'
        },
        {
            id: 1,
            type: 'image',
            src: 'https://im.uniqlo.com/global-cms/spa/res079bc9b36d900bb2dacb3a052d3d1958fr.jpg',
            alt: 'Uniqlo Collection',
            title: 'Spring Collection',
            description: 'Discover the latest trends and styles for this season',
            buttonText: 'Shop Now',
            buttonStyle: 'white',
            buttonLink: '/collections/spring'
        },
        {
            id: 2,
            type: 'image',
            src: 'https://im.uniqlo.com/global-cms/spa/rese6d2888ea872107f7df787bb9097232ffr.jpg',
            alt: 'Uniqlo Fashion',
            title: 'Summer Essentials',
            description: 'Light and comfortable clothes for your everyday needs',
            buttonText: 'Explore',
            buttonStyle: 'white',
            buttonLink: '/collections/summer'
        },
    ];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const carouselOptions: Partial<EmblaOptionsType> = {
        loop: true,
        skipSnaps: false,
        dragFree: true
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions);
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
    const isLastSlide = selectedIndex === heroSlides.length - 1;
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const scrollLocked = useRef(false);



    useEffect(() => {
        Object.values(videoRefs.current).forEach(videoRef => {
            if (videoRef) {
                videoRef.muted = true;
                videoRef.playsInline = true;
                videoRef.loop = true;
            }
        });

        // Play video when it becomes active
        if (heroSlides[selectedIndex]?.type === 'video') {
            const videoKey = `video-${heroSlides[selectedIndex].id}`;
            const videoElement = videoRefs.current[videoKey];

            if (videoElement) {
                videoElement.play().catch(error => {
                    console.error('Video autoplay failed:', error);
                });
            }
        }
    }, [selectedIndex, heroSlides]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!emblaApi) return;

            // Allow normal scrolling when on the last slide
            if (isLastSlide && e.deltaY > 0) {
                return;
            }

            e.preventDefault();

            // Debounce scroll events
            if (scrollLocked.current) return;
            scrollLocked.current = true;

            if (e.deltaY > 0) {
                // Scroll down - go to next slide
                emblaApi.scrollNext();
            } else if (e.deltaY < 0) {
                // Scroll up - go to previous slide
                emblaApi.scrollPrev();
            }

            // Reset scroll lock after a short delay
            setTimeout(() => {
                scrollLocked.current = false;
            }, 300);
        };

        const sectionElement = document.querySelector('section');
        if (sectionElement) {
            sectionElement.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (sectionElement) {
                sectionElement.removeEventListener('wheel', handleWheel);
            }
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [emblaApi, isLastSlide]);

    const renderMedia = (slide: HeroSlide) => {
        if (slide.type === 'image') {
            return (
                <img
                    src={slide.src}
                    alt={slide.alt || slide.title}
                    className="h-full w-full object-cover"
                    loading="eager"
                />
            );
        } else if (slide.type === 'video') {
            return (
                <video
                    ref={(el) => {
                        videoRefs.current[`video-${slide.id}`] = el;
                        return undefined;
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                >
                    <source src={slide.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Top overlay gradient for header visibility */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none"></div>

            <div className="h-full w-full" ref={emblaRef}>
                <div className="flex h-full">
                    {heroSlides.map((slide) => (
                        <div key={slide.id} className="flex-[0_0_100%] h-full relative">
                            {renderMedia(slide)}
                            {/* Add a bottom gradient overlay for better text visibility */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>

            {heroSlides.map((slide, index) => (
                <AnimatePresence key={slide.id}>
                    {selectedIndex === index && (
                        <Container size="xl" className="absolute inset-0 h-full flex items-center pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-white max-w-md pointer-events-auto !mt-40 relative"
                                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                            >
                                <div className="absolute inset-0 bg-black/30 blur-xl -z-10 rounded-lg opacity-70"></div>
                                <h2 className="text-5xl font-bold mb-4 relative">
                                    <span className="relative z-10 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary after:rounded-full">
                                        {slide.title.split(' ')[0]}
                                    </span>
                                    {slide.title.substring(slide.title.indexOf(' '))}
                                </h2>
                                <p className="text-xl mb-6 font-medium">{slide.description}</p>
                                <button
                                    className={`${slide.buttonStyle === 'primary'
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'bg-white text-gray-900 hover:bg-gray-100'
                                        } px-8 py-3 rounded font-medium transition transform hover:scale-105 shadow-lg`}
                                >
                                    {slide.buttonText}
                                </button>
                            </motion.div>
                        </Container>
                    )}
                </AnimatePresence>
            ))}

            {/* Visual indicator for scroll navigation */}
            <div className="absolute bottom-8 left-8 z-20 flex flex-col items-center">
                <span className="text-white text-sm mb-2">
                    {isLastSlide ? 'Scroll to continue' : 'Scroll to navigate'}
                </span>
                <div className="h-16 w-1 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                        className="w-full bg-white rounded-full"
                        initial={{ height: "0%" }}
                        animate={{
                            height: `${(selectedIndex / (heroSlides.length - 1)) * 100}%`
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Thumbnail Indicators */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                {heroSlides.map((slide, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`w-16 h-10 overflow-hidden rounded-md border-2 transition-all duration-300 ${selectedIndex === index
                            ? 'border-white scale-110 opacity-100'
                            : 'border-transparent opacity-70 hover:opacity-90'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {slide.type === 'image' ? (
                            <img
                                src={slide.src}
                                alt={`Thumbnail ${index + 1}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="bg-gray-800 h-full w-full flex items-center justify-center text-white text-xs">
                                Video
                            </div>
                        )}
                    </button>
                ))}
            </div>


        </section>
    );
};

export default HeroSection;
