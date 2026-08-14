import termsHtml from '../content/terms.html?raw'
import { LegalPage } from './LegalPage'
import { Seo } from '../Seo'
import { paths } from '../paths'

export default function TermsPage() {
    return <>
        <Seo
            title="Terms of Service — Orinav"
            description="Read the terms governing access to Orinav and use of its accessible navigation services."
            path={paths.terms}
        />
        <LegalPage title="Terms of Service" html={termsHtml}/>
    </>
}
