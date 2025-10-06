// Built Invoices page and Transaction page with their crud operations

import React, {useState, useEffect } from "react";

const token = 'd3e4f89ac17b4d62b98f5c3de709a1eb' 

const Invoices = ()=>{

    const [invoices, setInvoices] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [invoice_number, setInvoiceNumber] = useState('');

    useEffect(()=> {
        fetchInvoices();
    }, [])

    const fetchInvoices = async () =>{
        let url = `https://task-management-backend.innoscripta.com/api/interview-invoices?limit=${pageSize}&page=${page}`;
        if(invoice_number){
            url += `&invoice_number=${invoice_number}`;
        }
        if(pageSize && invoice_number){   
            fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => setInvoices(data.data))
            .catch(error => console.error('Error fetching invoices:', error));
        }
    }

    const handleEdit = (id) => {
        console.log(`Editing invoice with ID: ${id}`);

        fetch(`https://task-management-backend.innoscripta.com/api/interview-invoices/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({invoice_number: invoice_number}),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error editing invoice:', error));
        fetchInvoices();
    }
    const handleDelete = (id) => {
        console.log(`Deleting invoice with ID: ${id}`);

        fetch(`https://task-management-backend.innoscripta.com/api/interview-invoices/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error deleting invoice:', error));

        fetchInvoices();
    }
    const handleViewTransactions = (id) => {
        console.log(`Viewing transactions for invoice with ID: ${id}`);

        browserHistory.push(`/transactions?invoice_id=${id}`);

    }

    return (
        <div>
            <h1>Invoices</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Invoice Number</th>
                        <th>Total Amount</th>
                        <th>Curerency</th>
                        <th>Invoice Date</th>
                        <th>Reduction Type</th>
                        <th>Customer Name</th>
                        <th>Actions</th>

                    </tr>

                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td>{invoice.id}</td>
                                <td>{invoice.invoice_number}</td>
                                <td>{invoice.total_amount}</td>
                                <td>{invoice.currency}</td>
                                <td>{invoice.invoice_date}</td>
                                <td>{invoice.reduction_type}</td>
                                <td>{invoice.customer_name}</td>
                                <td><span>Actions</span>
                                    <button onClick={() => handleEdit(invoice.id)}>Edit</button>
                                    <button onClick={() => handleDelete(invoice.id)}>Delete</button>
                                    <button onClick={() => handleViewTransactions(invoice.id)}>View Transactions</button>
                                </td>
                            </tr>                            
                        ))}
                    </tbody>
                </thead>
            </table>

            <button onClick={() => handleCreateInvoice()}>Create Invoice</button>

            <CreateInvoice invoice={invoice} />

            <div><span>Pagination </span>
            <select onChange={(e) => setPageSize(e.target.value)} value={pageSize}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select></div>
        </div>
    )
}
