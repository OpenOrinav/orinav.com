import { useLocation } from 'react-router'
import logo from './assets/icon-rounded.png'
import { paths } from './paths'

const SITE_ORIGIN = 'https://orinav.com'
const SITE_NAME = 'Orinav'
const ORGANIZATION_NAME = 'A11yLab: The Beijing Academy Student Accessibility Initiative'

type SeoProps = {
    title: string
    description: string
    path?: string
    noIndex?: boolean
}

export function Seo({ title, description, path, noIndex = false }: SeoProps) {
    const location = useLocation()
    const canonicalUrl = path ? new URL(path, SITE_ORIGIN).href : undefined
    const pageUrl = new URL(path ?? location.pathname, SITE_ORIGIN).href
    const logoUrl = new URL(logo, SITE_ORIGIN).href
    const robots = noIndex
        ? 'noindex, nofollow, noarchive'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${SITE_ORIGIN}/#organization`,
                name: ORGANIZATION_NAME,
                url: SITE_ORIGIN,
                logo: {
                    '@type': 'ImageObject',
                    url: logoUrl
                }
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_ORIGIN}/#website`,
                url: `${SITE_ORIGIN}/`,
                name: SITE_NAME,
                description,
                inLanguage: 'en-US',
                publisher: { '@id': `${SITE_ORIGIN}/#organization` }
            },
            {
                '@type': 'WebPage',
                '@id': `${pageUrl}#webpage`,
                url: pageUrl,
                name: title,
                description,
                inLanguage: 'en-US',
                isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
                about: { '@id': `${SITE_ORIGIN}/#app` }
            },
            {
                '@type': 'MobileApplication',
                '@id': `${SITE_ORIGIN}/#app`,
                name: SITE_NAME,
                applicationCategory: 'NavigationApplication',
                operatingSystem: 'iOS',
                description: 'Orinav transforms the navigation experience for people with visual impairments. Navigate the world safely and independently—it\'s all in one app.',
                url: `${SITE_ORIGIN}/`,
                downloadUrl: paths.download,
                publisher: { '@id': `${SITE_ORIGIN}/#organization` }
            }
        ]
    }
    const serializedStructuredData = JSON.stringify(structuredData).replaceAll('<', '\\u003c')

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="robots" content={robots}/>
            <meta name="googlebot" content={robots}/>

            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content={SITE_NAME}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:url" content={pageUrl}/>

            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>

            {canonicalUrl && (
                <>
                    <link rel="canonical" href={canonicalUrl}/>
                    <link rel="alternate" hrefLang="en" href={canonicalUrl}/>
                    <link rel="alternate" hrefLang="x-default" href={canonicalUrl}/>
                </>
            )}

            <script
                id="seo-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
            />
        </>
    )
}
