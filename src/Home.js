import React from "react";
import {Link, Outlet} from "react-router-dom";

class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Book Store</h1>
                <nav
                    style={{
                        borderBottom: "solid 1px",
                        paddingBottom: "1rem"
                    }}
                >
                    <Link to="/writers">Writers</Link> |{" "}
                    <Link to="/customers">Customers</Link> |{" "}
                    <Link to="/books">Books</Link>
                </nav>
                <Outlet/>
            </div>
        );
    }
}

export default Home;