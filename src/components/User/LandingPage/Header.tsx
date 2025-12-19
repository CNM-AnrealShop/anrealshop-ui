import { Burger, Button, Container, Group, TextInput, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaShoppingBag, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../constant';
import { useAppSelector } from '../../../hooks/useAppRedux';
import SuggestSearch from '../../header/SuggestSearch';
import showSuccessNotification from '../../Toast/NotificationSuccess';
import MenuUserSection from './MenuUserSection';
import MobileMenu from './MobileMenu';

interface NavItem {
    label: string;
    link: string;
    scrollTo?: string; // ID of element to scroll to
}

export const Header = () => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const location = useLocation();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const handleOpenCart = () => {
        if (!isAuthenticated)
            showSuccessNotification("Thông báo", "Đăng nhập để thực hiện chức năng nhé")
        else
            navigate(APP_ROUTES.CART);
    }



    const navItems: NavItem[] = [
        { label: 'Sản phẩm', link: '/products' },
        { label: 'Thương hiệu', link: '/' },
        { label: 'Bộ sưu tập', link: '/collections' },
        { label: 'Về chúng tôi', link: '/#partner-benefits-section', scrollTo: 'partner-benefits-section' },
        { label: 'Liên hệ', link: '/#partner-benefits-section', scrollTo: 'partner-benefits-section' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
        if (item.scrollTo && location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(item.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                if (opened) toggle();
            }
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setShowSearch(false);
            setShowSuggestions(false);
            setSearchQuery('');
        }
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setShowSuggestions(Boolean(value.trim()));
    };

    const handleSelectSearchResult = () => {
        setShowSearch(false);
        setShowSuggestions(false);
        setSearchQuery('');
    };

    return (
        <header
            className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}
        >
            <Container size="xl" className="relative">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <h1 className={`text-2xl font-bold ${scrolled ? 'text-primary' : 'text-white'}`}>
                            AnrealShop
                        </h1>
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="hidden lg:block">
                        <Group gap="xl">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 * index }}
                                >
                                    <Link
                                        to={item.link}
                                        onClick={(e) => handleNavClick(e, item)}
                                        className={`font-medium ${scrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-white/80'
                                            } transition-colors`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </Group>
                    </nav>

                    {/* Action buttons */}
                    <div className="flex items-center gap-4">
                        {/* Search button and expandable search box */}
                        <div className="relative" ref={searchContainerRef}>
                            <button
                                className={`p-2 ${scrolled ? 'text-gray-700' : 'text-white'} hover:opacity-70 transition-opacity`}
                                onClick={() => {
                                    setShowSearch(true);
                                    setTimeout(() => searchInputRef.current?.focus(), 100);
                                }}
                                aria-label="Search"
                            >
                                <FaSearch size={18} />
                            </button>

                            <Transition
                                mounted={showSearch}
                                transition="slide-left"
                                duration={300}
                                timingFunction="ease"
                            >
                                {(styles) => (
                                    <div
                                        style={styles}
                                        className={`absolute right-0 top-0 flex items-center ${scrolled ? 'bg-white/80' : 'bg-white/20'} backdrop-blur-md rounded-full overflow-hidden shadow-lg`}
                                    >
                                        <form onSubmit={handleSearchSubmit} className="flex items-center">
                                            <TextInput
                                                ref={searchInputRef}
                                                placeholder="Tìm kiếm..."
                                                variant="unstyled"
                                                value={searchQuery}
                                                onChange={handleSearchInputChange}
                                                className="w-48  pl-4"
                                                styles={{
                                                    input: {
                                                        color: scrolled ? 'inherit' : 'white',
                                                        '&::placeholder': {
                                                            color: scrolled ? 'inherit' : 'rgba(255, 255, 255, 0.8)',
                                                        }
                                                    }
                                                }}
                                            />
                                            <Button
                                                variant="subtle"
                                                size="sm"
                                                px={10}
                                                onClick={() => {
                                                    setShowSearch(false);
                                                    setShowSuggestions(false);
                                                }}
                                                className="mr-1"
                                            >
                                                <FaTimes size={14} />
                                            </Button>
                                        </form>

                                    </div>
                                )}
                            </Transition>
                            <SuggestSearch
                                searchTerm={searchQuery}
                                visible={showSearch && showSuggestions}
                                onSelect={handleSelectSearchResult}
                                withBlur={scrolled}
                                className="w-60 sm:w-72 md:w-96 right-0 mt-4"
                            />
                        </div>

                        {/* User Account Menu */}
                        <MenuUserSection
                            user={user}
                            isAuthenticated={isAuthenticated}
                            scrolled={scrolled}
                        />

                        {/* Cart button */}
                        <button
                            onClick={handleOpenCart}
                            className={`p-2 relative ${scrolled ? 'text-gray-700' : 'text-white'} hover:opacity-70 transition-opacity`}
                        >
                            <FaShoppingBag size={18} />
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                {user?.cartCount || 0}
                            </span>
                        </button>

                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <Burger
                                opened={opened}
                                onClick={toggle}
                                color={scrolled ? "#333" : "#fff"}
                                size="sm"
                            />
                        </div>
                    </div>
                </div>


                {/* Mobile menu */}
                {opened && (
                    <MobileMenu
                        isAuthenticated={isAuthenticated}
                        user={user}
                        navItems={navItems}
                        onNavClick={handleNavClick}
                        onClose={close}
                    />
                )}
            </Container>
        </header>
    );
};
