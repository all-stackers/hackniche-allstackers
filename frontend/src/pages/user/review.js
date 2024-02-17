import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [review, setReview] = React.useState("");

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };
  const handleSubmit = () => {
    console.log("Rating: ", value);
    console.log("Review: ", review);
  };

  return (
    <div className="h-screen">
      <div className="bg-white shadow-md w-full px-[20px] pt-[50px] py-[20px]">
        <h1 className="font-bold w-full text-center">Give Rating and Review</h1>
      </div>
      <div className="p-[20px]">
        <h1 className="text-[18px] font-bold mb-[10px]">Rate</h1>
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
        <h1 className="text-[18px] font-bold mt-[30px] my-[20px]">Review</h1>
        <textarea
          className="w-full p-[10px] rounded-[10px] border border-gray-300"
          placeholder="Write your review here"
          value={review}
          onChange={handleReviewChange}
        ></textarea>
        <button
          className="mt-[50px] bg-blue-400 border shadow-lg text-white w-full p-[10px] rounded-[10px] mt-[10px]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
