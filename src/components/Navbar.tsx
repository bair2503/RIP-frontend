import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleLinkClick = () => {
        setIsMenuOpen(false)
    }

    const handleOverlayClick = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="nav">
            <div className="nav__wrapper">
                <div className="nav__links">
                    <NavLink to="/" className="nav__link" onClick={handleLinkClick}>
                        Главная
                    </NavLink>
                    <NavLink to="/services" className="nav__link" onClick={handleLinkClick}>
                        Услуги
                    </NavLink>
                </div>

                <div
                    className={`nav__mobile-wrapper ${isMenuOpen ? 'active' : ''}`}
                    onClick={handleMenuToggle}
                >
                    <div className="nav__mobile-target" />
                    <div className="nav__mobile-menu">
                        <NavLink to="/" className="nav__link" onClick={handleLinkClick}>
                            Главная
                        </NavLink>
                        <NavLink to="/services" className="nav__link" onClick={handleLinkClick}>
                            Услуги
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Overlay for closing menu by clicking outside */}
            {isMenuOpen && (
                <div className="nav__overlay" onClick={handleOverlayClick} />
            )}
        </nav>
    )
}