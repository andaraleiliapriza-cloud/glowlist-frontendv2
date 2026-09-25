import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("idPengguna");
        localStorage.removeItem("nama");

        navigate("/login");
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <Link to="/" className="navbar-brand">
                ✨ GlowList
            </Link>

            <button
                onClick={handleLogout}
                className="btn btn-danger"
            >
                Logout
            </button>
        </nav>
    );
}