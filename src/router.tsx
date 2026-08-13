import { createBrowserRouter } from 'react-router'
import { RootLayout } from './routes/RootLayout'
import { HomePage } from './routes/HomePage'
import { NotFoundPage } from './routes/NotFoundPage'
import { paths } from './paths'

export const router = createBrowserRouter([
    {
        path: paths.home,
        Component: RootLayout,
        children: [
            { index: true, Component: HomePage },
            {
                path: paths.privacy.slice(1),
                lazy: async () => ({
                    Component: (await import('./routes/PrivacyPage')).PrivacyPage,
                }),
            },
            {
                path: paths.terms.slice(1),
                lazy: async () => ({
                    Component: (await import('./routes/TermsPage')).TermsPage,
                }),
            },
            { path: '*', Component: NotFoundPage },
        ],
    },
])
