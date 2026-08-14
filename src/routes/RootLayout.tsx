import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router'
import icon from '../assets/icon.webp'
import { paths } from '../paths'

function PhoneIcon() {
    return (
        <svg
            aria-hidden="true"
            className="download-icon"
            viewBox="0 0 20 24"
            fill="none"
        >
            <rect x="3" y="1.5" width="14" height="21" rx="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}

export default function RootLayout() {
    const [ isCompact, setIsCompact ] = useState(false)

    useEffect(() => {
        const updateNavbar = () => setIsCompact(window.scrollY > 0)

        updateNavbar()
        window.addEventListener('scroll', updateNavbar, { passive: true })
        return () => window.removeEventListener('scroll', updateNavbar)
    }, [])

    return (
        <div className="site-shell">
            <a className="skip-link" href="#main-content">
                Skip to main content
            </a>
            <header className={`site-header${isCompact ? ' site-header--compact' : ''}`}>
                <nav className="navbar" aria-label="Primary navigation">
                    <NavLink className="brand" to={paths.home} aria-label="Orinav home">
                        <img className="brand-icon" src={icon} alt=""/>
                        <span className="brand-wordmark" aria-hidden="true">Orinav</span>
                    </NavLink>

                    <a className="download-link" href={paths.download} aria-label="Download the Orinav app">
                        <span className="download-label">Download the app</span>
                        <PhoneIcon/>
                    </a>
                </nav>
            </header>
            <main id="main-content" tabIndex={-1}>
                <Outlet/>
            </main>
            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-brand-group">
                        <NavLink className="footer-brand" to={paths.home} aria-label="Orinav home">
                            <img className="footer-logo" src={icon} alt="" />
                            <span>Orinav</span>
                        </NavLink>
                        <p className="footer-tagline">AI-Powered Navigation for People with Visual Impairments</p>
                    </div>

                    <div className="footer-meta">
                        <p>© 2026 A11yLab: The Beijing Academy Student Accessibility Initiative</p>
                        <nav className="footer-links" aria-label="Legal">
                            <NavLink to={paths.terms}>Terms</NavLink>
                            <NavLink to={paths.privacy}>Privacy</NavLink>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}
