import { useQueries } from "@tanstack/react-query";
import { useState } from "react";

const Parallel = () => {
  const [userIds, setUserIds] = useState([1, 2, 3]);

  const UseQueries = useQueries({
    queries: userIds.map((id) => {
      return {
        queryKey: ["users", id],
        queryFn: async () => {
          const data = await fetch(`https://dummyjson.com/users/${id}`).then(
            (res) => res.json()
          );
          return data;
        },
      };
    }),
  });


  return (
    <div className="flex justify-center flex-col items-center my-2">
      <button
        className="border border-red-500 p-1 rounded-sm"
        onClick={() =>
          setUserIds((prev) => {
            return [...prev, prev.length+1];
          })
        }
      >
        Load more
      </button>
      {userIds.map((user) => {
        return <h1 key={user}>{user}</h1>;
      })}
    </div>
  );
};

export default Parallel;
