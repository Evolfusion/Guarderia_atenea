import { Dog, Footprints, Calendar, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import useHeader from '../daycare/hooks/useHeader';
import { useEffect } from 'react';

export default function Header() {
    const { isOpen, scrolled, menuRef, toggleMenu } = useHeader();

    // 👇 EXPOSE GLOBAL PARA TUTORIAL
    useEffect(() => {
        window.__toggleMenu = toggleMenu;
        window.__closeMenu = () => {
            if (isOpen) toggleMenu();
        };
    }, [toggleMenu, isOpen]);

    return (
        <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
            <nav className="header__nav" ref={menuRef}>
                <div className="header__logo">
                    <Link to="/">
                        <img src="/img/logo.png" alt="logo de guarderia atenea" className="header__logo-img" />
                    </Link>
                </div>

                <ul className={`header__menu ${isOpen ? "header__menu--show" : ""}`}>
                    <li><Link to="/" className="header__menu-link tutorial-guarderia" onClick={toggleMenu}><Dog />Guardería</Link></li>
                    <li><Link to="/walks" className="header__menu-link tutorial-paseos" onClick={toggleMenu}><Footprints />Paseos</Link></li>
                    <li><Link to="/reservations" className="header__menu-link tutorial-reservas" onClick={toggleMenu}><Calendar />Reservas</Link></li>
                    <li><Link to="/gallery" className="header__menu-link tutorial-galeria" onClick={toggleMenu}><Image />Galeria</Link></li>
                </ul>

                <div className="header__hamburger" onClick={toggleMenu}>
                    <span className="header__hamburger-line"></span>
                    <span className="header__hamburger-line"></span>
                    <span className="header__hamburger-line"></span>
                </div>
            </nav>
        </header>
    );
}