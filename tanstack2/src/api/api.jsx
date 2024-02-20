export const fetchPosts = async () => {
  const data = await fetch("http://localhost:3000/posts?_sort=-id").then((res) =>
    res.json()
  );
  return data;
};

export const addPost = async (newProduct) => {
  await fetch(`http://localhost:3000/posts`, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "content-type": "Application/json",
    },
  });
};

export const deletePost= async (postId) => {
    await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
    });
  }

export const productCategory=async () => {
    return await fetch("https://dummyjson.com/products/categories").then(
      (res) => res.json()
    );
  }