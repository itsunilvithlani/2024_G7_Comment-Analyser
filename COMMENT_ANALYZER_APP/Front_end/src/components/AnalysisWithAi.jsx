import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { LoadingSpinner } from "./LodingSpinner";

function AnalysisWithAi() {
  const data = useSelector((state) => state.Comment.comments);
  const [Data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const AnalysisUsingAi = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/AnalysisWithAi",
          { messages: data }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    AnalysisUsingAi();
  }, [Data]); // Add data as a dependency to useEffect

  useEffect(()=>
  {
    if(Data)
      {
        setLoading(false);
      }
  },[Data])
  
  return (
    <>
      <div className="accordion h-100" id="basicAccordion">
        {loading ? (
          <LoadingSpinner />
        ) : (
          Data.map(
            (
              item,
              index // Add a check for Data before mapping
            ) => (
              <div className="accordion-item border border-primary" key={index}>
                <h2 className="accordion-header" id={`heading-${index}`}>
                  <button
                    className="accordion collapsed fs-5"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${index}`}
                  >
                    {item.suggestion}
                  </button>
                </h2>
                <div
                  id={`collapse-${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading-${index}`}
                  data-bs-parent="#basicAccordion"
                >
                  <div className="accordion-body">{item.description}</div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </>
  );
}

export default AnalysisWithAi;
