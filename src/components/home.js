import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home({ setLoanAmount, setInterestRate, setProcessingFee, setMonths }) {
  const navigate = useNavigate();
  const [minLoanAmount, setMinLoanAmount] = useState(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [interest, setInterest] = useState(0);

  const callLoanSliderApi = async (url) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const obj = (await response.json()).data;
      setMinLoanAmount(obj.min_loan_amount);
      setMaxLoanAmount(obj.max_loan_amount);
      setMinDuration(obj.min_month);
      setMaxDuration(obj.max_month);
      setInterest(obj.interest_rate);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptLoanOffer = async () => {
    //call api
    try {
      const url = "https://livedemoproject.com/instant-loan/api/loan-calculate";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          loan_amount: selectedAmount,
          duration: selectedDuration,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const obj = (await response.json()).data;
      setLoanAmount(obj.loan_amount);
      setInterestRate(obj.interest_rate);
      setProcessingFee(obj.processing_fee);
      setMonths(obj.duration);
      navigate("/apply-loan");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loanSliderUrl =
      "https://livedemoproject.com/instant-loan/api/get-loan-amounts";
    callLoanSliderApi(loanSliderUrl);
  }, []);

  return (
    <div>
      <p>
        Your loan offer is ready. We have prepared the best loan offer for you.
      </p>
      <div className="slider">
        <label>Required loan amount:</label>
        <br />
        <input
          type="range"
          min={minLoanAmount}
          max={maxLoanAmount}
          step="50"
          onChange={(e) => setSelectedAmount(e.target.value)}
        />
        <div className="slider-limits">
          <span>{minLoanAmount}</span>
          <span>{maxLoanAmount}</span>
        </div>
      </div>
      <p className="interest-text">Assuming annual interest rate {interest}%</p>
      <div className="slider">
        <label>Required : Month</label>
        <br />
        <input
          type="range"
          min={minDuration}
          max={maxDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
        />
        <div className="slider-limits">
          <span>{minDuration}</span>
          <span>{maxDuration}</span>
        </div>
      </div>
      <div>
        <button className="btn" onClick={acceptLoanOffer}>
          Accept
        </button>
      </div>
    </div>
  );
}

export default Home;
