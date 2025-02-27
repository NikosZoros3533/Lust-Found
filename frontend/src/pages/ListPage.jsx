import { useState } from "react";
import { useSelector } from "react-redux";
import ComboboxFilter from "../components/ComboBoxFilter";
import Post from "../components/Post";

export default function ListPage() {
  const [filteredValue, setFilteredValue] = useState("");
  const posts = useSelector((state) => state.posts);
  

  function handleFilteredValue(value) {
    setFilteredValue(value);
  }
  
 
  

  return (
    
    <div className="min-h-screen p-5">
      <h1 className="text-3xl bg-light2 p-8 rounded-3xl font-bold text-center mt-24 mb-6">All Connections</h1>
      <ComboboxFilter
        options={posts.map((post) => post.location)}
        selected={filteredValue}
        setSelected={handleFilteredValue}
      />

      <div className="space-y-4 ">
        {posts.length === 0 ? (
          <p className="text-center">No posts yet! Be the first to share.</p>
        ) : filteredValue ? (
          posts
            .filter((post) => post.location === filteredValue)
            .map((post) => <Post key={post.id} post={post} />)
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
