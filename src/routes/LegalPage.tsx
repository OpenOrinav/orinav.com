interface LegalPageProps {
    title: string
    html: string
}

export function LegalPage({ title, html }: LegalPageProps) {
    return (
        <article className="legal-page" aria-labelledby="legal-page-title">
            <header className="legal-page-header">
                <h1 id="legal-page-title">{title}</h1>
            </header>
            <div
                className="legal-content"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </article>
    )
}
