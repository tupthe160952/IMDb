import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const Footer: React.FC = () => {
    return (
        <footer className="footer bg-dark text-white py-10">
            <div className="container mx-auto text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="md: text-start mx-3 mt-2">
                        <a style={{ color: '#ccc', maxWidth: '250px' }}>
                            <h3>Our Team</h3>
                            <div>
                                <div className="bi bi-house-fill mb-2"> : New York, NY 10012, US </div>
                                <div className="bi bi-envelope mb-2"> : info@example.com</div>
                                <div className="bi bi-telephone mb-2"> : +01 234 567 88</div>
                            </div>
                        </a>
                    </div>
                    <div className=" justify-content-center my-3 mt-4 mx-5">
                        <h3 style={{ color: '#ccc'}}>Company</h3>
                        <a href="#" className="footer-link mx-4">
                            Home
                        </a>
                        <a href="#" className="footer-link mx-4">
                            About Us
                        </a>
                        <a href="#" className="footer-link mx-4">
                            Contact Us
                        </a>
                        <a href="#" className="footer-link mx-4">
                            Help
                        </a>                       
                    </div>
                </div>


                <hr className="bg-secondary" />
                <div className="d-flex justify-content-center my-3">
                    <a
                        href="#"
                        className="text-white mx-2 footer-icon bi bi-facebook"
                    ></a>
                    <a
                        href="#"
                        className="text-white mx-2 footer-icon bi bi-twitter-x"
                    ></a>
                    <a href="#" className="text-white mx-2 footer-icon bi bi-tiktok"></a>
                    <a href="#" className="text-white mx-2 footer-icon bi bi-youtube"></a>
                    <a
                        href="#"
                        className="text-white mx-2 footer-icon bi bi-instagram"
                    ></a>
                </div>
                <p className="text-center ">© 1990-2024 by IMDb.com, Inc</p>
            </div>
        </footer>
    );
};
export default Footer;
