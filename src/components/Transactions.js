import React,{useState} from "react";
import {Modal,Button,Form} from "react-bootstrap";

export default function Transactions({transactions,setTransactions,role}){
  const [show,setShow]=useState(false);
  const [edit,setEdit]=useState(null);
  const [form,setForm]=useState({date:"",amount:"",category:"",type:"expense"});
  const [search,setSearch]=useState("");

  const openAdd=()=>{setEdit(null);setForm({date:"",amount:"",category:"",type:"expense"});setShow(true);}
  const openEdit=(tx)=>{setEdit(tx.id);setForm(tx);setShow(true);}

  const save=()=>{
    if(edit){
      setTransactions(transactions.map(t=>t.id===edit?{...form,id:edit}:t))
    }else{
      setTransactions([...transactions,{...form,id:Date.now(),amount:Number(form.amount)}])
    }
    setShow(false);
  }

  const del=(id)=>setTransactions(transactions.filter(t=>t.id!==id));

  const filtered=transactions.filter(t=>t.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mb-4">
      <h4>Transactions</h4>

      <input className="form-control mb-2" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/>

      {role==="admin" && <button className="btn btn-primary mb-2" onClick={openAdd}>Add</button>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th><th>Amount</th><th>Category</th><th>Type</th>
            {role==="admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filtered.map(t=>(
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              {role==="admin" && (
                <td>
                  <button className="btn btn-sm btn-warning me-1" onClick={()=>openEdit(t)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>del(t.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton><Modal.Title>{edit?"Edit":"Add"} Transaction</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control className="mb-2" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
            <Form.Control className="mb-2" type="number" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/>
            <Form.Control className="mb-2" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
            <Form.Select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={save}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
