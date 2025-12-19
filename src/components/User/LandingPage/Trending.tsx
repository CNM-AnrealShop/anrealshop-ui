import { Container, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryService } from "../../../service/CategoryService";
import type { CategoryDisplayDto } from "../../../types/CategoryType";

interface TrendingProps {
  id?: string;
}

interface CategoryBoxProps {
  category: CategoryDisplayDto;
  positionClasses: string;
}

const CategoryBox = ({ category, positionClasses }: CategoryBoxProps) => (
  <div
    className={`group absolute w-36 h-36 -rotate-45 overflow-hidden shadow-lg z-10 rounded-md ${positionClasses}`}
  >
    <Link to={`/products?ct=${category.slug}`} className="block h-full w-full">
      <div className="absolute inset-0 rotate-45 scale-[1.5] overflow-hidden">
        {category.thumbnailUrl ? (
          <img
            src={category.thumbnailUrl}
            alt={category.categoryName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
        )}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="absolute inset-0 rotate-45 flex items-center justify-center p-2">
        <div className="text-center">
          <h3 className="text-white font-bold text-sm line-clamp-2">
            {category.categoryName}
          </h3>
        </div>
      </div>
    </Link>
  </div>
);

const Trending = ({ id }: TrendingProps) => {
  const [categories, setCategories] = useState<CategoryDisplayDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await CategoryService.getPublicCategoriesDisplay(
          "HOMEPAGE"
        );
        console.log("Fetched categories for Trending:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <section id={id} className="py-16 bg-gray-50">
        <Container size="xl">
          <Text size="lg" ta="center" c="dimmed">
            Đang tải...
          </Text>
        </Container>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  const mainCategory = categories[0];
  const rotatedCategories = categories.slice(2, 7);
  const videoCategory = categories[1] || mainCategory;

  const boxLayouts = [
    {
      index: 0,
      positionClasses:
        "bottom-[22%] left-[21%] transform -translate-x-1/2 translate-y-1/2",
    },
    {
      index: 1,
      positionClasses:
        "top-[34%] left-[35%] transform -translate-x-1/2 -translate-y-1/2",
    },
    {
      index: 2,
      positionClasses:
        "top-[34%] right-[37%] transform translate-x-1/2 -translate-y-1/2",
    },
    {
      index: 3,
      positionClasses:
        "bottom-[22%] left-[49%] transform -translate-x-1/2 translate-y-1/2",
    },
    {
      index: 4,
      positionClasses:
        "bottom-[22%] right-[23%] transform translate-x-1/2 translate-y-1/2",
    },
  ];

  return (
    <section id={id} className="py-16 bg-gray-50">
      <Container size="xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Danh Mục Thời Trang Nổi Bật</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Khám phá các danh mục thời trang được yêu thích nhất và tìm kiếm
            phong cách phù hợp với cá tính của bạn
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Main Card */}
          <motion.div
            className="w-full md:w-1/3 relative rounded-xl overflow-hidden shadow-md group flex-shrink-0 h-64 md:h-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Link
              to={`/products?ct=${mainCategory.slug}`}
              className="block h-full"
            >
              <div className="absolute inset-0">
                {mainCategory.thumbnailUrl ? (
                  <img
                    src={mainCategory.thumbnailUrl}
                    alt={mainCategory.categoryName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {mainCategory.categoryName}
                </h3>
                <div className="inline-block py-2 px-4 bg-white text-gray-900 rounded-full font-medium text-sm transition-all duration-300 hover:bg-gray-100">
                  Khám phá ngay
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right Section */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            {/* Top Section - Rotated Boxes on Desktop, Grid on Mobile */}
            <div className="w-full">
              {/* Desktop: Rotated boxes layout */}
              <div className="hidden md:block relative h-64">
                {boxLayouts.map((layout) => {
                  const category = rotatedCategories[layout.index];
                  if (!category) return null;
                  return (
                    <CategoryBox
                      key={category.id}
                      category={category}
                      positionClasses={layout.positionClasses}
                    />
                  );
                })}
              </div>

              {/* Mobile: 2x2 Grid layout */}
              <div className="grid grid-cols-2 gap-3 md:hidden">
                {rotatedCategories.slice(0, 4).map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative aspect-square overflow-hidden rounded-lg shadow-md"
                  >
                    <Link
                      to={`/products?ct=${category.slug}`}
                      className="block h-full w-full"
                    >
                      {category.thumbnailUrl ? (
                        <img
                          src={category.thumbnailUrl}
                          alt={category.categoryName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                      )}
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute inset-0 flex items-center justify-center p-3">
                        <h3 className="text-white font-bold text-sm text-center line-clamp-2">
                          {category.categoryName}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Section with Category Banner */}
            <motion.div
              className="w-full h-32 relative rounded-xl overflow-hidden shadow-md md:mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/products?ct=${videoCategory.slug}`}
                className="block h-full"
              >
                {videoCategory.thumbnailUrl ? (
                  videoCategory.mediaType === "VIDEO" ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source
                        src={videoCategory.thumbnailUrl}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <img
                      src={videoCategory.thumbnailUrl}
                      alt={videoCategory.categoryName}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-primary/30 to-primary/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                  <div className="p-4 md:p-6 text-white">
                    <h3 className="text-lg md:text-2xl font-bold mb-1">
                      {videoCategory.categoryName}
                    </h3>
                    <div className="inline-block py-1.5 px-3 bg-white text-gray-900 rounded-full font-medium text-xs transition-all duration-300 hover:bg-gray-100">
                      Xem ngay
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Trending;
