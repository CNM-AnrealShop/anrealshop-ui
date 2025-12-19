import { useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";

interface BannerData {
  type: "image" | "video";
  src: string;
  title: string;
  description: string;
}

interface BannerFlowCategoryProps {
  category: string;
}

const BannerFlowCategory = ({ category }: BannerFlowCategoryProps) => {
  // Responsive breakpoints
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const categoryBanners: Record<string, BannerData> = {
    all: {
      type: "video",
      src: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/Casual-Outer/25FW/MEN/KV-m-Video-pc.mp4",
      title: "Tất cả sản phẩm",
      description: "Khám phá bộ sưu tập đa dạng của chúng tôi",
    },
    fashion: {
      type: "image",
      src: "https://im.uniqlo.com/global-cms/spa/res079bc9b36d900bb2dacb3a052d3d1958fr.jpg",
      title: "Thời trang",
      description: "Phong cách mới nhất cho bạn",
    },
  };

  const banner = categoryBanners[category] || categoryBanners.all;

  // Determine banner height based on screen size
  const bannerHeight = isMobile ? "h-32" : isTablet ? "h-36" : "h-40";
  const bannerMargin = isMobile ? "mx-2 mt-2" : "mx-4 mt-4";
  const contentPadding = isMobile ? "px-4 pb-3" : "px-8 pb-4";

  return (
    <div
      className={`relative ${bannerHeight} overflow-hidden bg-gray-900 rounded-lg ${bannerMargin}`}
    >
      {banner.type === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={banner.src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={banner.src}
          alt={banner.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className={`relative h-full flex items-end ${contentPadding}`}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white max-w-2xl"
        >
          <h1
            className={`font-bold mb-1 ${
              isMobile ? "text-lg" : isTablet ? "text-xl" : "text-2xl"
            }`}
          >
            {banner.title}
          </h1>
          <p
            className={`text-gray-200 ${
              isMobile ? "text-xs" : isTablet ? "text-sm" : "text-base"
            }`}
          >
            {banner.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BannerFlowCategory;
