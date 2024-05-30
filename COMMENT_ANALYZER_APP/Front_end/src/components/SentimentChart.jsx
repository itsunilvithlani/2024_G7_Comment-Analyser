import "./SentimentChart.css";

export const SentimentChart = ({ positive, negative, neutral, data }) => {
  const total = positive + negative + neutral;

  const positivePercentage =  (positive / total) * 100;
  const negativePercentage = (negative / total) * 100;
  const neutralPercentage = (neutral / total) * 100;
  return (
    <>
      {data && (
        <ul style={{marginLeft:"1.5rem"}}>
          <li style={{color:"green"}}>{positivePercentage}%  <span>Positive</span></li>
          <li style={{color:"red"}}>{negativePercentage}%  <span>Negative</span></li>
          <li>{neutralPercentage}%  <span>Neutral</span></li>
        </ul>
      )}
    </>
  );
};
