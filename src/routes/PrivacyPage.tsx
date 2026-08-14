import privacyHtml from '../content/privacy.html?raw'
import { LegalPage } from './LegalPage'
import { Seo } from '../Seo'
import { paths } from '../paths'

export default function PrivacyPage() {
    return <>
        <Seo
            title="Privacy Policy — Orinav"
            description="Learn how Orinav collects, uses, protects, and manages information when you use its website and navigation services."
            path={paths.privacy}
        />
        <LegalPage title="Privacy Policy" html={privacyHtml} />
    </>
}
