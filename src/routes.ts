import {
    index,
    layout,
    route,
    type RouteConfig
} from '@react-router/dev/routes'

export default [
    layout('./routes/RootLayout.tsx', [
        index('./routes/HomePage.tsx'),
        route('privacy', './routes/PrivacyPage.tsx'),
        route('terms', './routes/TermsPage.tsx'),
        route('*', './routes/NotFoundPage.tsx')
    ])
] satisfies RouteConfig
