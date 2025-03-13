import { useParams } from "react-router";

export default function ConnectionDetail() {
  const params = useParams();
  return (
    <>
      <div>ConnectionDetail</div>
      <p>Event Id:{params.id}</p>
    </>
  );
}
