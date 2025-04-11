import ConnectionItem from "../connectionsUI/ConnectionItem";

export default function ConnectionList({ posts }) {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-5">
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post._id}>
            <ConnectionItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
