import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from 'axios'

const Product = () => {
  const params = useParams();

  const fetchProduct = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/${params.productId}`
    );
    const data = await response.json();
    return data;
  };

  const {isLoading:loader,error, data: product } = useQuery({
    queryKey: ["Product",params.productId],
    queryFn: fetchProduct,
  });

  const mutation = useMutation({
    mutationFn:(newProduct)=>{
        return axios.put(`https://dummyjson.com/products/${params.productId}`,newProduct)
    }
  });
  if (loader) {
    return <h1 className="text-center">Loading...</h1>;
  }
  if (error) {
    return <h1 className="text-center">There is something error : {error.message}</h1>;
  }
  if (mutation.isPending) {
    return <h1 className="text-center">Updating...</h1>;
  }
  if (mutation.isError) {
    return <h1 className="text-center">There is something error : {mutation.error.message}</h1>;
  }
  return (
    <div>
    {   
             <div key={product.id} className="group relative">
             <div className="aspect-h-1 aspect-w-1 w-[50%] overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
               <img
                 src={product.thumbnail}
                 alt={product.title}
                 className="h-full w-[50%] object-cover object-center lg:h-full lg:w-full"
               />
             </div>
             <div className="mt-4 flex justify-between w-[50%]">
               <div>
                 <p className="mt-1 text-sm text-gray-500">
                   {product.title}
                 </p>
               </div>
               <p className="text-sm font-medium text-gray-900">
                 {product.price}
               </p>
             </div>

             <button onClick={()=>{
                mutation.mutate({title:'Upload Files'})
             }}
             className=" border border-red-500"
             >
                    update
             </button>
           </div>
    }
    </div>
    );
};

export default Product;
