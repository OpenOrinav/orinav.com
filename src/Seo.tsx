import { useEffect } from 'react'
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

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

    if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.append(element)
    }

    element.content = content
}

function setCanonical(canonicalUrl?: string) {
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const alternates = document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')

    if (!canonicalUrl) {
        canonical?.remove()
        alternates.forEach(element => element.remove())
        return
    }

    const canonicalElement = canonical ?? document.createElement('link')
    canonicalElement.rel = 'canonical'
    canonicalElement.href = canonicalUrl
    if (!canonical) document.head.append(canonicalElement)

    for (const language of [ 'en', 'x-default' ]) {
        let alternate = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${language}"]`)
        if (!alternate) {
            alternate = document.createElement('link')
            alternate.rel = 'alternate'
            alternate.hreflang = language
            document.head.append(alternate)
        }
        alternate.href = canonicalUrl
    }
}

export function Seo({ title, description, path, noIndex = false }: SeoProps) {
    useEffect(() => {
        const canonicalUrl = path ? new URL(path, SITE_ORIGIN).href : undefined
        const pageUrl = canonicalUrl ?? new URL(window.location.pathname, SITE_ORIGIN).href
        const logoUrl = new URL(logo, SITE_ORIGIN).href
        const robots = noIndex
            ? 'noindex, nofollow, noarchive'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

        document.title = title
        setMeta('name', 'description', description)
        setMeta('name', 'robots', robots)
        setMeta('name', 'googlebot', robots)

        setMeta('property', 'og:type', 'website')
        setMeta('property', 'og:site_name', SITE_NAME)
        setMeta('property', 'og:locale', 'en_US')
        setMeta('property', 'og:title', title)
        setMeta('property', 'og:description', description)
        setMeta('property', 'og:url', pageUrl)

        setMeta('name', 'twitter:card', 'summary')
        setMeta('name', 'twitter:title', title)
        setMeta('name', 'twitter:description', description)

        setCanonical(canonicalUrl)

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
                        url: logoUrl,
                    },
                },
                {
                    '@type': 'WebSite',
                    '@id': `${SITE_ORIGIN}/#website`,
                    url: `${SITE_ORIGIN}/`,
                    name: SITE_NAME,
                    description,
                    inLanguage: 'en-US',
                    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
                },
                {
                    '@type': 'WebPage',
                    '@id': `${pageUrl}#webpage`,
                    url: pageUrl,
                    name: title,
                    description,
                    inLanguage: 'en-US',
                    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
                    about: { '@id': `${SITE_ORIGIN}/#app` },
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
                    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
                },
            ],
        }

        let script = document.head.querySelector<HTMLScriptElement>('#seo-structured-data')
        if (!script) {
            script = document.createElement('script')
            script.id = 'seo-structured-data'
            script.type = 'application/ld+json'
            document.head.append(script)
        }
        script.textContent = JSON.stringify(structuredData)
    }, [ description, noIndex, path, title ])

    return null
}
