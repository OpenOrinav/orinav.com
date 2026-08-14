import type { ReactNode } from 'react'
import {
    Links,
    Outlet,
    Scripts,
    ScrollRestoration
} from 'react-router'
import './index.css'

const ORGANIZATION_NAME = 'A11yLab: The Beijing Academy Student Accessibility Initiative'

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="application-name" content="Orinav"/>
                <meta name="author" content={ORGANIZATION_NAME}/>
                <meta name="referrer" content="strict-origin-when-cross-origin"/>
                <meta name="theme-color" content="#ffffff"/>
                <meta name="color-scheme" content="light"/>
                <meta name="apple-itunes-app" content="app-id=6752567992"/>

                <link rel="icon" type="image/png" sizes="1024x1024" href="/icon-rounded.png"/>
                <link rel="apple-touch-icon" href="/icon-rounded.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <Links/>
            </head>
            <body>
                {children}
                <ScrollRestoration/>
                <Scripts/>
            </body>
        </html>
    )
}

export default function Root() {
    return <Outlet/>
}
