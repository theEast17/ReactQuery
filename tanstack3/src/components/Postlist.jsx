import { useQuery, useMutation } from "@tanstack/react-query";
import { addPost, fetchPost, fetchtag } from "../api/api";
import { queryClient } from "../main";
import { useState } from "react";

const Postlist = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: postData,
    isLoading,
    isError,
    error,
    isPlaceholderData
  } = useQuery({
    queryKey: ["Posts", { pageNumber }],
    queryFn: () => fetchPost(pageNumber),
  });

  const { data: tagData } = useQuery({
    queryKey: ["Tags"],
    queryFn: fetchtag,
  });

  const {
    mutate,
    isPending,
    isError: isPostError,
    reset,
  } = useMutation({
    mutationFn: addPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Posts", { pageNumber }],
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const tags = Array.from(formData.keys()).filter(
      (keys) => formData.get(keys) === "on"
    );
    mutate({
      id: postData?.items + 1,
      title,
      tags,
    });
    e.target.reset();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchBox"
          placeholder="enter title"
          name="title"
        />

        <div className="tagContainer">
          {tagData?.map((tags) => {
            return (
              <div className="tags" key={tags}>
                <input type="checkbox" name={tags} id={tags} />
                <label htmlFor={tags}>{tags}</label>
              </div>
            );
          })}
        </div>

        <input type="submit" value="submit" className="subBtn" />
      </form>

      {isLoading && isPending && <h1>Loading...</h1>}
      {isError && <h1>{error.message}</h1>}

      {isPostError && (
        <h5 onClick={() => reset()}>Unable to Post Pls Try Again Later</h5>
      )}

      <div
        className="pages"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setPageNumber((old) => Math.max(old - 1, 0))}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        <span>{pageNumber}</span>
        <button
          onClick={() => {
            if (!isPlaceholderData && postData?.next) {
              setPageNumber((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || !postData?.next}
        >
          Next
        </button>
      </div>

      {postData?.data?.map((post) => {
        return (
          <div key={post.id} className="post">
            <h5>{post.title}</h5>
            <div>
              {post.tags?.map((tag) => {
                return <span key={tag}>{tag}</span>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Postlist;
