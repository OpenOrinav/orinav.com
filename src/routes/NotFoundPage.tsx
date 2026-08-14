import { Link } from 'react-router'
import { paths } from '../paths'
import { Seo } from '../Seo'

export default function NotFoundPage() {
    return (
        <section className="page" aria-labelledby="not-found-title">
            <Seo
                title="Page Not Found — Orinav"
                description="This Orinav page could not be found."
                noIndex
            />

            <p className="eyebrow">404</p>
            <h1 id="not-found-title">Page not found</h1>
            <p>The page may have moved or the address may be incorrect.</p>
            <Link className="button-link" to={paths.home}>
                Go to home
            </Link>
        </section>
    )
}
