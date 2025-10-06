import React, {useState, useEffect} from 'react';

const token = 'd3e4f89ac17b4d62b98f5c3de709a1eb';
const CreateInvoice = ({invoice})=>{
    const [invoice, setInvoice] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    if (location.query.invoice_id){
        setInvoice();
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        fetch(`https://task-management-backend.innoscripta.com/api/interview-invoices`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(invoice),
        })
    }
    

    return (
        <div>
            <h1>Create Invoice</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Invoice Number" value={invoice.invoice_number} onChange={(e) => setInvoice({...invoice, invoice_number: e.target.value})} />
                <input type="text" placeholder="Total Amount" value={invoice.total_amount} onChange={(e) => setInvoice({...invoice, total_amount: e.target.value})} />
                <input type="text" placeholder="Currency" value={invoice.currency} onChange={(e) => setInvoice({...invoice, currency: e.target.value})} />
                <input type="text" placeholder="Invoice Date" value={invoice.invoice_date} onChange={(e) => setInvoice({...invoice, invoice_date: e.target.value})} />
                <input type="text" placeholder="Reduction Type" value={invoice.reduction_type} onChange={(e) => setInvoice({...invoice, reduction_type: e.target.value})} />
                <input type="text" placeholder="Customer Name" value={invoice.customer_name} onChange={(e) => setInvoice({...invoice, customer_name: e.target.value})} />
                <input type="submit" value="Create Invoice" />
            </form>
        </div>
    )
}

export default CreateInvoice;
