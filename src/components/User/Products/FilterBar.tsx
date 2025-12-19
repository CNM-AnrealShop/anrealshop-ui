import {
  Button,
  Checkbox,
  Chip,
  Divider,
  Group,
  Popover,
  RangeSlider,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import {
  BRANDS,
  COLORS,
  ORIGINS,
  PRICE_SUGGESTIONS,
  RATING_OPTIONS,
  SIZES,
} from "./DataDefault";

interface FilterBarProps {
  totalProducts: number;
  onApplyFilters: (filters: FilterValues) => void;
  initialValues?: FilterValues;
  isMobile?: boolean;
  onOpenDrawer?: () => void;
}

interface FilterValues {
  priceRange: [number, number];
  brands: string[];
  colors: string[];
  sizes: string[];
  origins: string[];
  rating: string;
}

const FilterBar = ({
  totalProducts,
  onApplyFilters,
  initialValues,
  isMobile,
  onOpenDrawer,
}: FilterBarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Initialize state with URL params or defaults
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(
    initialValues?.priceRange || [0, 10000000]
  );
  const [localSelectedBrands, setLocalSelectedBrands] = useState<string[]>(
    initialValues?.brands || []
  );
  const [localSelectedColors, setLocalSelectedColors] = useState<string[]>(
    initialValues?.colors || []
  );
  const [localSelectedSizes, setLocalSelectedSizes] = useState<string[]>(
    initialValues?.sizes || []
  );
  const [localSelectedOrigins, setLocalSelectedOrigins] = useState<string[]>(
    initialValues?.origins || []
  );
  const [localSelectedRating, setLocalSelectedRating] = useState<string>(
    initialValues?.rating || ""
  );

  // Sync state when initialValues change (URL params change)
  useEffect(() => {
    if (initialValues) {
      setLocalPriceRange(initialValues.priceRange);
      setLocalSelectedBrands(initialValues.brands);
      setLocalSelectedColors(initialValues.colors);
      setLocalSelectedSizes(initialValues.sizes);
      setLocalSelectedOrigins(initialValues.origins);
      setLocalSelectedRating(initialValues.rating);
    }
  }, [initialValues]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFilterClick = () => {
    if (filterBarRef.current) {
      filterBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        open();
      }, 100);
    } else {
      open();
    }
  };

  const handleApply = () => {
    onApplyFilters({
      priceRange: localPriceRange,
      brands: localSelectedBrands,
      colors: localSelectedColors,
      sizes: localSelectedSizes,
      origins: localSelectedOrigins,
      rating: localSelectedRating,
    });
    close();
  };

  const handleReset = () => {
    setLocalPriceRange([0, 10000000]);
    setLocalSelectedBrands([]);
    setLocalSelectedColors([]);
    setLocalSelectedSizes([]);
    setLocalSelectedOrigins([]);
    setLocalSelectedRating("");
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handlePriceSuggestionClick = (range: [number, number]) => {
    setLocalPriceRange(range);
  };

  const handleSizesChange = (value: string | string[]) => {
    setLocalSelectedSizes(Array.isArray(value) ? value : [value]);
  };

  const handleRatingChange = (value: string | string[]) => {
    setLocalSelectedRating(typeof value === "string" ? value : value[0] || "");
  };

  const handleCategoryClick = () => {
    if (onOpenDrawer) {
      if (opened) {
        close();
      }
      onOpenDrawer();
    }
  };

  return (
    <div
      ref={filterBarRef}
      className={`sticky top-0 z-20 mb-6 rounded-lg shadow-sm py-2 px-4 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-lg" : "bg-white"
      }`}
    >
      <Group justify="space-between" align="center" wrap="nowrap">
        <Text size="sm" c="dimmed">
          Hiển thị <strong>{totalProducts}</strong> sản phẩm
        </Text>
        <Group
          gap={8}
          wrap="nowrap"
          justify="center"
          align="center"
          className="flex-shrink-0"
        >
          {isMobile && (
            <Button variant="outline" onClick={handleCategoryClick}>
              Danh mục
            </Button>
          )}
          <Popover
            opened={opened}
            onClose={close}
            position={isMobile ? "bottom" : "bottom-end"}
            width="auto"
            shadow="xl"
            offset={isMobile ? 10 : 15}
            withArrow
            transitionProps={{
              transition: "pop-top-right",
              duration: 300,
              timingFunction: "ease-out",
            }}
          >
            <Popover.Target>
              <Button
                leftSection={<FiFilter size={14} />}
                variant="light"
                size="sm"
                onClick={handleFilterClick}
              >
                Bộ lọc
              </Button>
            </Popover.Target>
            <Popover.Dropdown
              className="p-2 sm:p-4 bg-white/90 backdrop-blur-md border border-gray-200 overflow-hidden"
              style={{
                minWidth: isMobile ? "calc(100vw - 32px)" : "280px",
                maxWidth: "90vw",
                width: isMobile
                  ? "calc(100vw - 32px)"
                  : "clamp(280px, 85vw, 900px)",
                maxHeight: isMobile ? "calc(100vh - 150px)" : "85vh",
                overflowY: "auto",
                transformOrigin: isMobile ? "top center" : "top right",
              }}
            >
              <AnimatePresence>
                {opened && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: isMobile ? -10 : -20,
                      x: isMobile ? 0 : 20,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: isMobile ? -5 : -10,
                      x: isMobile ? 0 : 10,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="space-y-3"
                  >
                    <Text fw={600} size="md" mb="sm">
                      Bộ lọc sản phẩm
                    </Text>

                    {/* Layout Grid */}
                    <div className="space-y-4">
                      {/* Khoảng giá - Full width */}
                      <div>
                        <Text fw={500} size="xs" mb="xs">
                          Khoảng giá
                        </Text>
                        <Group gap="xs" mb="sm" className="flex-wrap">
                          {PRICE_SUGGESTIONS.map((suggestion) => (
                            <Chip
                              key={suggestion.label}
                              size="xs"
                              checked={
                                localPriceRange[0] === suggestion.value[0] &&
                                localPriceRange[1] === suggestion.value[1]
                              }
                              onChange={() =>
                                handlePriceSuggestionClick(
                                  suggestion.value as [number, number]
                                )
                              }
                            >
                              {suggestion.label}
                            </Chip>
                          ))}
                        </Group>
                        <RangeSlider
                          min={0}
                          max={10000000}
                          step={100000}
                          value={localPriceRange}
                          onChange={setLocalPriceRange}
                          size="xs"
                        />
                        <Group justify="space-between" mt="xs">
                          <Text size="xs" c="dimmed">
                            {formatPrice(localPriceRange[0])}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {formatPrice(localPriceRange[1])}
                          </Text>
                        </Group>
                      </div>

                      <Divider />

                      {/* Thương hiệu | Xuất xứ | Màu sắc */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Thương hiệu */}
                        <div>
                          <Text fw={500} size="xs" mb="xs">
                            Thương hiệu
                          </Text>
                          <Checkbox.Group
                            value={localSelectedBrands}
                            onChange={setLocalSelectedBrands}
                          >
                            <div className="space-y-1">
                              {BRANDS.slice(0, 4).map((brand) => (
                                <Checkbox
                                  key={brand.value}
                                  value={brand.value}
                                  label={brand.label}
                                  size="xs"
                                />
                              ))}
                            </div>
                          </Checkbox.Group>
                        </div>

                        {/* Xuất xứ */}
                        <div>
                          <Text fw={500} size="xs" mb="xs">
                            Xuất xứ
                          </Text>
                          <Checkbox.Group
                            value={localSelectedOrigins}
                            onChange={setLocalSelectedOrigins}
                          >
                            <div className="space-y-1">
                              {ORIGINS.slice(0, 4).map((origin) => (
                                <Checkbox
                                  key={origin.value}
                                  value={origin.value}
                                  label={origin.label}
                                  size="xs"
                                />
                              ))}
                            </div>
                          </Checkbox.Group>
                        </div>

                        {/* Màu sắc */}
                        <div>
                          <Text fw={500} size="xs" mb="xs">
                            Màu sắc
                          </Text>
                          <Checkbox.Group
                            value={localSelectedColors}
                            onChange={setLocalSelectedColors}
                          >
                            <div className="space-y-1">
                              {COLORS.map((color) => (
                                <Checkbox
                                  key={color.value}
                                  value={color.value}
                                  label={
                                    <Group gap={4}>
                                      <div
                                        className="w-3 h-3 rounded-full border border-gray-300"
                                        style={{ backgroundColor: color.hex }}
                                      />
                                      <span className="text-xs">
                                        {color.label}
                                      </span>
                                    </Group>
                                  }
                                  size="xs"
                                />
                              ))}
                            </div>
                          </Checkbox.Group>
                        </div>
                      </div>

                      <Divider />

                      {/* Kích thước */}
                      <div>
                        <Text fw={500} size="xs" mb="xs">
                          Kích thước
                        </Text>
                        <Chip.Group
                          multiple
                          value={localSelectedSizes}
                          onChange={handleSizesChange}
                        >
                          <Group gap={6}>
                            {SIZES.map((size) => (
                              <Chip key={size} value={size} size="xs">
                                {size}
                              </Chip>
                            ))}
                          </Group>
                        </Chip.Group>
                      </div>

                      <Divider />

                      {/* Đánh giá */}
                      <div>
                        <Text fw={500} size="xs" mb="xs">
                          Đánh giá
                        </Text>
                        <Chip.Group
                          value={localSelectedRating}
                          onChange={handleRatingChange}
                        >
                          <Group gap={6}>
                            {RATING_OPTIONS.map((rating) => (
                              <Chip
                                key={rating.value}
                                value={rating.value}
                                size="xs"
                              >
                                {rating.label}
                              </Chip>
                            ))}
                          </Group>
                        </Chip.Group>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <Divider my="sm" />
                    <Group
                      justify="space-between"
                      mt="sm"
                      className="flex-wrap gap-2"
                    >
                      <Button
                        variant="subtle"
                        onClick={handleReset}
                        size="xs"
                        className="flex-shrink-0"
                      >
                        Xóa bộ lọc
                      </Button>
                      <Group gap="xs" className="flex-shrink-0">
                        <Button variant="light" onClick={close} size="xs">
                          Hủy
                        </Button>
                        <Button onClick={handleApply} size="xs">
                          Áp dụng
                        </Button>
                      </Group>
                    </Group>
                  </motion.div>
                )}
              </AnimatePresence>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Group>
    </div>
  );
};

export default FilterBar;
