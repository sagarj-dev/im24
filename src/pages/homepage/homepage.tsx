import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ProductCard, SearchBar } from "../../components";
import { IProductItemInterface } from "../../libs/types/types";
import { useInView } from "react-intersection-observer";

const LIMIT = 18;
const Homepage = () => {
  const { ref, inView } = useInView();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const fetchProducts = async (page: { pageParam: number }) => {
    console.log(page)
    const response = await axios(
      `https://jsonplaceholder.typicode.com/photos?_limit=${LIMIT}&_page=${page.pageParam}`
    )
    return await response.data
  };

  const {
    data: Products,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const handleSearchProduct = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  }, []);

  if (status === 'pending') return <div className="h-[90vh] flex justify-center items-center"><ClipLoader color="blue" /></div>;
  if (status === 'error') return <p>Error: {error.message}</p>;

  const filteredProducts = Products?.pages.flatMap((products: IProductItemInterface[]) =>
    products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
  );

  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (sortOrder === '1') {
      return a.albumId - b.albumId;
    } else if (sortOrder === '2') {
      return b.albumId - a.albumId;
    }
    return 0;
  });

  const productContent = sortedProducts?.map((product, index) => {
    if (sortedProducts.length === index + 1) {
      return <ProductCard innerRef={ref} key={product.id} product={product} />;
    }
    return <ProductCard key={product.id} product={product} />;
  });

  const hasMoreSortings = [...new Set(sortedProducts.map((product) => product.albumId))].length > 1;

  return (
    <div className="flex flex-col justify-center items-center overflow-hidden">
      <div className="flex flex-col md:flex-row w-full justify-end px-10 items-center gap-0.5 py-5 md:py-0 md:gap-2.5">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border-2 border-gray-300 rounded-md h-max px-5 py-2.5"
        >
          <option value="">Select sort product by album ID</option>
          {!hasMoreSortings && <option className="text-slate-400" value="">Load more products to sort</option>}
          {hasMoreSortings && <option value="1">Ascending</option>}
          {hasMoreSortings && <option value="2">Descending</option>}
        </select>
        <SearchBar onSearch={handleSearchProduct} />
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 overflow-x-hidden ${sortedProducts.length > 0 && 'h-[90vh] overflow-y-scroll scrollbar-hide'} ${sortedProducts.length === 0 && '!flex justify-center items-center'}`}>
        {sortedProducts.length > 0 ? productContent :
          <div className="text-center h-[50vh] flex items-center justify-center flex-col gap-0.5">
            <p className="text-2xl font-semibold">No products found</p>
            <p className="text-sm font-normal text-slate-500">Try changing search or search</p>
          </div>}
      </div>
      {isFetchingNextPage && <ClipLoader color="blue" />}
    </div>
  );
};

export default Homepage;
