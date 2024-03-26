import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <div>
            <nav class="navbar">
                <div class="navbar-container container">
                    <input type="checkbox" name="" id="" />
                    <div class="hamburger-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div>
                    <ul class="menu-items">
                        <li><Link to="../SenderPosts">Sender Posts</Link></li>
                        <li><Link to="../TravelerPosts">Traveler Posts</Link></li>
                        <li><Link to="../Reviews">All Reviews</Link></li>
                    </ul>
                    <h1 class="logo">Admin</h1>
                </div>
            </nav>


            {[...Array(4)].map((_, index) => (
                <br key={index}></br>
            ))}
        </div>
    );
}

export default Navbar;