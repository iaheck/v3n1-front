import { useOperation } from "react-openapi-client";
import Rating from "@mui/material/Rating";

function UserRating({ resourceId }) {
  const { loading, data, error } = useOperation(
    "getResourceEvaluation",
    resourceId
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <Rating name="simple-controlled-d" value={data.evaluation} />;
}
export default UserRating;