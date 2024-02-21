export const fetchPost = async (page) => {
  const response = await fetch(
    `http://localhost:3000/posts?_sort=-id&_page=${page}&_per_page=5}`
  );
  const postData = await response.json();
  return postData;
};

export const fetchtag = async () => {
  const response = await fetch("http://localhost:3000/tags");
  const tagData = await response.json();
  return tagData;
};

export const addPost = async (post) => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  return response.json();
};
