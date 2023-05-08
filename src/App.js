import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LoanApplication from "./components/loanApplication";
import "./App.css";

function App() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [months, setMonths] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setLoanAmount={setLoanAmount}
              setInterestRate={setInterestRate}
              setProcessingFee={setProcessingFee}
              setMonths={setMonths}
            />
          }
        />
        <Route
          path="/apply-loan"
          element={
            <LoanApplication
              loanAmount={loanAmount}
              interestRate={interestRate}
              processingFee={processingFee}
              months={months}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
