import React, { useState } from "react";

const Navbar: React.FC = () => {

    // State to handle the toggle for the list
    const [isList1Visible, setIsList1Visible] = useState(false);
    const [isList2Visible, setIsList2Visible] = useState(false);

    // Function to toggle the list visibility
    const toggleList1 = () => setIsList1Visible(!isList1Visible);
    const toggleList2 = () => setIsList2Visible(!isList2Visible);
    return (
        <div>
            {/* Sidebar */}
            <nav className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
                <div className="logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="IMDb logo"/>
                </div>
                <a className="nav-link text-white mb-3 mt-3" href="/admin" style={{ fontSize: "30px", fontWeight: "bold" }}>Dashboard</a>
                <ul className="nav flex-column mb-3" onClick={toggleList1} style={{ cursor: 'pointer' }}>
                    <li className="list-group-item text-white">
                        {isList1Visible} Movie
                    </li>
                    {isList1Visible && (
                        <>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/addMovie">
                                    Add Movie
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    Update Movie
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    Delete Movie
                                </a>
                            </li>
                        </>
                    )}
                </ul>

                <ul className="nav flex-column" onClick={toggleList2} style={{ cursor: 'pointer' }}>
                    <li className="list-group-item text-white">
                        {isList2Visible} Celebrity
                    </li>
                    {isList2Visible && (
                        <>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    Add Celeb
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    Update Celeb
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    Delete Celeb
                                </a>
                            </li>
                        </>
                    )}
                </ul>

            </nav>
        </div>
    );
};

export default Navbar;