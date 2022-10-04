import { useOperation } from "react-openapi-client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";
import UserRating from "./UserRating";

function ResourceInformation({ resourceId }) {
  console.log(resourceId);
  const { loading, data, error } = useOperation("getResource", resourceId);

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const average = () => {
    const ave = data.average_evaluation;
    if (!ave) {
      return null;
    }

    return parseFloat(ave.slice(0, 3));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>

        <Rating
          id="resource-average"
          name="read-only"
          value={average()}
          precision={0.1}
          readOnly
        />

        <Chip label={average()} variant="outlined" />

        <CardActions>
          <Button href={data.url} target="_blank" variant="outlined">
            {" "}
            Ver recurso{" "}
          </Button>
        </CardActions>

        <Typography component="div">Your evaluation</Typography>

        <UserRating resourceId={resourceId} />
      </CardContent>
    </Card>
  );
}
export default ResourceInformation;