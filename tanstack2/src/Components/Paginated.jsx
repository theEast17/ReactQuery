import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { useState } from "react";
import { productCategory } from "../api/api";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    limit: 4,
    skip: 0,
  });
  const [total,setTotal]=useState(0)

  const limit = parseInt(searchParams.get("limit")) || 4;
  const skip = parseInt(searchParams.get("skip")) || 0;

  const qSerch = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";


  // const [limit] = useState(4);
  // const [skip, setSkip] = useState(0);

  const { data: allProducts, isLoading } = useQuery({
    queryKey: ["products", limit, skip, qSerch,category],
    queryFn: async () => {
      let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${qSerch}`;

      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      }
      const data = await fetch(`${url}`).then((res) => res.json());
      setTotal(data.total)
      return data.products;
    },
    placeholderData: keepPreviousData,
  });

  const { data: allCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: productCategory,
  });

  if (isLoading) {
    return <h1 className="text-center">Loading...</h1>;

  }

  const handleMove = (limit) => {
    setSearchParams((prev) => {
      prev.set("skip", Math.max(skip + limit, 0));
      return prev;
    });
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My store
          </h2>
        </div>
        <div>
          <div className="relative mt-2 rounded-md flex items-center gap-8 mb-4">
            <input
              onChange={debounce((e) => {
                setSearchParams((prev) => {
                  prev.set("q", e.target.value);
                  prev.set("skip", 0);
                  prev.delete('category')
                  return prev;
                });
              }, 500)}
              type="text"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="IPhone"
            />
            <select
              className="border p-2"
              onChange={(e) => {
                setSearchParams((prev) => {
                  prev.set("category", e.target.value);
                  prev.set("skip", 0);
                  prev.delete('q')
                  return prev;
                });
              }}
            >
              <option>Select category</option>
              {allCategory?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {allProducts?.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to="/optimistic">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-12">
          <button
            disabled={skip===0}
            className="bg-purple-500 px-4 py-1 text-white rounded"
            onClick={() => {
              handleMove(-limit);
            }}
          >
            Prev
          </button>
          <button
            disabled={skip>=total-limit}
            className="bg-purple-500 px-4 py-1 text-white rounded"
            onClick={() => {
              handleMove(limit);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
