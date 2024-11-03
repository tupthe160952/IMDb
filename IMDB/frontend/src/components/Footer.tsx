import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/footer.css';
import "bootstrap-icons/font/bootstrap-icons.css";
const Footer: React.FC = () => {
    return (
        <footer className="footer bg-dark text-white py-4">
            <div className="container-fluid">
                <div className="row text-center text-md-start ">
                    {/* <div className="col-md-2 mb-3">
                        <a href="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png"></a>
                    </div> */}

                </div>

                <div className="row-md-2 mb-3">
                    <ul className="list-unstyled">
                        <li><a href="#" className="footer-link">About Us</a></li>
                        <li><a href="#" className="footer-link">Contact Us</a></li>
                        <li><a href="#" className="footer-link">Affiliates</a></li>
                        <li><a href="#" className="footer-link">Resources</a></li>
                    </ul>
                </div>

                <hr className="bg-secondary" />

                <div className="d-flex justify-content-center my-3">
                    <a href="#" className="text-white mx-2 footer-icon bi bi-facebook"></a>
                    <a href="#" className="text-white mx-2 footer-icon bi bi-twitter-x"></a>
                    <a href="#" className="text-white mx-2 footer-icon bi bi-tiktok"></a>
                    <a href="#" className="text-white mx-2 footer-icon bi bi-youtube"></a>
                    <a href="#" className="text-white mx-2 footer-icon bi bi-instagram"></a>


                </div>

                <p className="text-center ">© 1990-2024 by IMDb.com, Inc</p>
            </div>
        </footer>
    )
}
export default Footer;