import { Button, Container, Paper } from '@mantine/core';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useGetProduct } from '../../../hooks/useProduct';
import type { UserProductDto } from '../../../types/ProductType';
import { CategorySkeleton, HeroBannerSkeleton, NewsletterSkeleton, ProductGridSkeleton, PromotionBannerSkeleton, SearchTopSkeleton } from './Skeleton';

const HeroBanner = lazy(() => import('./Banner/HeroBanner'));
const PromotionBanner = lazy(() => import('./Banner/PromationBanner'));
const Categories = lazy(() => import('./Category/Categories'));
const NewsletterSignup = lazy(() => import('../Common/NewLetterSignup'));
// const FeaturedProducts = lazy(() => import('./Products/FeatureProduct'));
const ListProduct = lazy(() => import('./Products/ListProduct'));
// const NewArrivals = lazy(() => import('./Products/NewArrivals'));
const SearchTop = lazy(() => import('./SearchTop'));
// const TrendingProducts = lazy(() => import('./Products/TrendingProduct'));

const HomePage = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<UserProductDto[]>([]);
  const { getListRecommended } = useGetProduct();
  useEffect(() => {
    getListRecommended()
      .then((data) => {
        setRecommendedProducts(data);
      });
  }, [])




  return (
    <div className="bg-gray-50 py-6">
      <Container size="xl" className="px-4">
        <Paper radius="md" className="mb-8 bg-white shadow-sm">
          <div className="p-4">
            <Suspense fallback={<HeroBannerSkeleton />}>
              <HeroBanner />
            </Suspense>
          </div>
        </Paper>

        <Paper radius="md" className="mb-8 bg-white shadow-sm">
          <div className="p-4">
            <Suspense fallback={<CategorySkeleton />}>
              <Categories />
            </Suspense>
          </div>
        </Paper>

        <Paper radius="md" className="mb-8 bg-white shadow-sm">
          <div className="p-4">
            <Suspense fallback={<SearchTopSkeleton />}>
              <SearchTop />
            </Suspense>
          </div>
        </Paper>

        {/* <Paper radius="md" className="mb-8 bg-white shadow-sm">
          <div className="p-4">
            <Suspense fallback={<ProductGridSkeleton />}>
              <FeaturedProducts />
            </Suspense>
          </div>
        </Paper> */}

        <Paper radius="md" className="mb-8 bg-white shadow-sm">
          <div className="p-4">
            <Suspense fallback={<PromotionBannerSkeleton />}>
              <PromotionBanner />
            </Suspense>
          </div>
        </Paper>

        {/* <Paper radius="md" className="mb-8 bg-white shadow-sm">
          <div className="p-4">
            <Suspense fallback={<ProductGridSkeleton />}>
              <NewArrivals />
            </Suspense>
          </div>
        </Paper> */}

        <Paper radius="md" className="mb-8 bg-white shadow-sm">
          <div className="p-4">
            <Suspense fallback={<NewsletterSkeleton />}>
              <NewsletterSignup />
            </Suspense>
          </div>
        </Paper>

        {/* <Paper radius="md" className="mb-8 bg-white shadow-sm">
          <div className="p-4">
            <Suspense fallback={<ProductGridSkeleton />}>
              <TrendingProducts />
            </Suspense>
          </div>
        </Paper> */}

        <Paper radius="md" className="mb-8 bg-white shadow-sm">
          <div className="p-4">
            <Suspense fallback={<ProductGridSkeleton />}>
              <ListProduct
                products={recommendedProducts}
              />
            </Suspense>
          </div>
        </Paper>

        <Button
          variant="outline"
          color="blue"
          className="!border-primary !text-primary !hover:bg-blue-50 !mx-auto !block"
        >
          Xem thêm sản phẩm
        </Button>
      </Container>
    </div>
  );
};

export default HomePage;