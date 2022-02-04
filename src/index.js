import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from "./Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WriterForm from "./WriterForm";
import CustomerForm from "./CustomerForm";
import BookForm from "./BookForm";
import SaleForm from "./SaleForm";

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
