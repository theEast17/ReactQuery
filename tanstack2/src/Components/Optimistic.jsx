import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../libs/QueryProvider";
import { useState } from "react";
import { addPost, deletePost, fetchPosts } from "../api/api";

const Optimistic = () => {
  const [formData, setFormData] = useState({
    title: "",
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const {
    mutate: addPosts,
    isError,
    isPending,
    variables,
  } = useMutation({
    mutationFn: addPost,
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: deletePosts } = useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts(formData);
    setFormData({ title: "" });
  };

  const handleDelete = (id) => {
    deletePosts(id);
  };

  return (
    <div className="p-4 flex gap-12 border">
      <div className="flex-1 items-center w-full">
        <form onSubmit={handleSubmit}>
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            type="text"
            placeholder="Enter something that you interest..."
            name="title"
            className="w-full border border-yellow-400 p-2 rounded-sm mb-4"
          />

          <input
            type="submit"
            value="submit"
            className=" w-full border p-2 rounded-md cursor-pointer bg-yellow-100"
          />
        </form>
      </div>

      <div className="flex-1">
        <h2 className=" bg-yellow-100 text-center py-2 rounded-sm">Posts</h2>

        <ul>
          {isPending && (
            <li className="border mb-2 border-yellow-300 p-1 mt-1 rounded-sm text-center opacity-30">
              {variables.title}
            </li>
          )}

          {isError && (
            <li
              className="border mb-2 border-yellow-300 p-1 mt-1 rounded-sm text-center opacity-30"
              key={variables.id}
            >
              Something is Wrong here
            </li>
          )}

          {isLoading && <h1 className="text-center">Loading...</h1>}

          {posts?.map((post) => {
            return (
              <li
                className="flex justify-between items-center border mb-2 border-yellow-300 p-1 mt-1 rounded-sm text-center"
                key={post.id}
              >
                <>
                  <span>{post.title}</span>
                  <button
                    className="border border-yellow-200 p-2"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Optimistic;
