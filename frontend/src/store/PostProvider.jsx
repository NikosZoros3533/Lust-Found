// PostContext.js
import { createContext, useContext } from "react";

const PostContext = createContext(null);

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ post, children }) => {
  return (
    <PostContext.Provider value={{ postId: post._id }}>
      {children}
    </PostContext.Provider>
  );
};
