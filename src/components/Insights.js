import React from "react";

export default function Insights({transactions}){
  const exp=transactions.filter(t=>t.type==="expense");
  const highest=exp.sort((a,b)=>b.amount-a.amount)[0];

  return (
    <div className="card p-3">
      <h4>Insights</h4>
      {highest? <p>Highest Spending: {highest.category} ₹{highest.amount}</p>:<p>No data</p>}
    </div>
  )
}
