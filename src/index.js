import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Home from "./components/navBar/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WriterForm from "./components/writer/WriterForm";
import CustomerForm from "./components/customer/CustomerForm";
import BookForm from "./components/book/BookForm";
import SaleForm from "./components/sale/SaleForm";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route path="writers" element={<WriterForm/>}/>
                <Route path="books" element={<BookForm/>}/>
                <Route path="customers" element={<CustomerForm/>}/>
                <Route path="sales" element={<SaleForm/>}/>
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
