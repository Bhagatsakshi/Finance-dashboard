import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");
  const [dark, setDark] = useState(false);

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("tx"));
    if(data) setTransactions(data);
    else setTransactions([
      {id:1,date:"2026-04-01",amount:5000,category:"Salary",type:"income"},
      {id:2,date:"2026-04-02",amount:300,category:"Food",type:"expense"}
    ])
  },[])

  useEffect(()=>{
    localStorage.setItem("tx",JSON.stringify(transactions));
  },[transactions])

  return (
    <div className={dark?"dark container-fluid p-4":"container-fluid p-4"}>
      <div className="d-flex justify-content-between mb-3">
        <h2>Finance Dashboard</h2>
        <div>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="form-select d-inline w-auto me-2">
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn btn-dark" onClick={()=>setDark(!dark)}>🌙</button>
        </div>
      </div>

      <Dashboard transactions={transactions}/>
      <Transactions transactions={transactions} setTransactions={setTransactions} role={role}/>
      <Insights transactions={transactions}/>
    </div>
  );
}
export default App;
