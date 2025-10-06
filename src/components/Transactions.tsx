import React, {useState, useEffect} from 'react';

const token = 'd3e4f89ac17b4d62b98f5c3de709a1eb';
const Transactions = ()=>{
    const [transactions, setTransactions] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [invoice_id, setInvoiceId] = useState('');

    useEffect(()=>{
        fetchTransactions();
    }, []);

    const fetchTransactions = ()=>{
        fetch(`https://task-management-backend.innoscripta.com/api/interview-transactions?invoice_id=${invoice_id}&limit=${pageSize}&page=${page}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
    }
}   
