import { Link } from "react-router";
import ConnectionItem from "../../components/ConnectionItem";
const posts = [
  {
    id: "1",
    title: "Saw you on the subway",
    encounterDescription:
      "You were reading a book with a red cover. Our eyes met, but I hesitated...",
    encounterCity: "New York, NY",
    encounterPoint: "subway",
    gender: "male",
    targetGender: "female",
    createdAt: "2024-02-14",
    interests: ["asdasdasdas", "asdasdasdada"],
    comments: [
      { text: "Esena leei ksipna", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
    ],
  },
  {
    id: "2",
    title: "Saw you on the Restaurant",
    encounterDescription:
      "You were eating fish. Our eyes met, but I hesitated...",
    encounterCity: "New York, NY",
    encounterPoint: "restaurant",
    gender: "male",
    targetGender: "female",
    createdAt: "2024-02-15",
    interests: ["asdasdasdas", "asdasdasdada"],
    comments: [
      { text: "Esena leei ksipna", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
    ],
  },
];

export default function Connections() {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-5">
      <ul className="space-y-6">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-light1 shadow-md rounded-2xl p-4  hover:shadow-2xl transition duration-300"
          >
            <Link
              to={post.id}
              className="block hover:text-dark transition duration-300"
            >
              <ConnectionItem post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
