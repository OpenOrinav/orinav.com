import { type CSSProperties, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import phoneMockup from '../assets/phone-mockup.webp'
import screenshotHome from '../assets/screenshot-home.webp'
import screenshotNavigate from '../assets/screenshot-navigate.webp'
import screenshotExplore from '../assets/screenshot-explore.webp'
import screenshotHomeMockup from '../assets/screenshot-home-mockup.webp'
import screenshotExploreMockup from '../assets/screenshot-explore-mockup.webp'
import testingOutdoors from '../assets/testing-outdoors.webp'
import turnVideo from '../assets/turn.mp4'
import t4gLogo from '../assets/tech4good-awards.svg'
import envisionLogo from '../assets/envision.webp'
import abilityNetLogo from '../assets/abilitynet.svg'
import brtvLogo from '../assets/brtv.webp'
import beijingNewsLogo from '../assets/the-beijing-news.webp'
import orinavCards from '../assets/orinav-cards.svg'
import navigationMockup from '../assets/navigation-mockup.webp'
import appStoreBadge from '../assets/app-store.svg'
import { paths } from '../paths'
import { Seo } from '../Seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRight,
    faBell,
    faCircleNodes,
    faHeart,
    faKiwiBird,
    faLock,
    faMapPin,
    faMobileScreenButton,
    faPersonWalking,
    faTrafficLight,
    faTree,
    faTriangleExclamation,
    faWrench
} from '@fortawesome/free-solid-svg-icons'

const stages = [
    { id: 'ready-to-go', label: 'Ready to go', screenshot: screenshotHome },
    { id: 'on-the-way', label: 'On the way', screenshot: screenshotNavigate },
    { id: 'seeing-surroundings', label: 'Surroundings', screenshot: screenshotExplore }
] as const

type NotificationCard = {
    title: string
    detail: string
    activeFor: number
    icon: ReactNode
    tone: 'red' | 'yellow' | 'pink' | 'blue' | 'indigo' | 'green' | 'violet'
}

const cards: NotificationCard[] = [
    {
        title: '3 routes available',
        detail: '22 min · Tactile pavings',
        activeFor: 0,
        icon: <FontAwesomeIcon icon={faMapPin}/>,
        tone: 'red'
    },
    {
        title: 'Hazards reported',
        detail: 'Construction on Friary Road',
        activeFor: 0,
        icon: <FontAwesomeIcon icon={faTriangleExclamation}/>,
        tone: 'yellow'
    },
    {
        title: 'Favorite location',
        detail: 'San Francisco Museum of Modern Arts',
        activeFor: 0,
        icon: <FontAwesomeIcon icon={faHeart}/>,
        tone: 'pink'
    },
    {
        title: 'Turn right onto Piccadilly Street',
        detail: 'Continue for 56 meters',
        activeFor: 1,
        icon: <FontAwesomeIcon icon={faArrowRight}/>,
        tone: 'blue'
    },
    {
        title: 'Crossing ahead',
        detail: 'Audible signal available',
        activeFor: 1,
        icon: <FontAwesomeIcon icon={faPersonWalking}/>,
        tone: 'indigo'
    },
    {
        title: 'Repeat instructions',
        detail: 'In 25 meters, turn right',
        activeFor: 1,
        icon: <FontAwesomeIcon icon={faBell}/>,
        tone: 'green'
    },
    {
        title: 'Traffic light',
        detail: 'Green · 14 seconds remaining',
        activeFor: 2,
        icon: <FontAwesomeIcon icon={faTrafficLight}/>,
        tone: 'green'
    },
    {
        title: 'Obstacle-dense zone',
        detail: 'Three meters ahead',
        activeFor: 2,
        icon: <FontAwesomeIcon icon={faKiwiBird}/>,
        tone: 'violet'
    }
]

type MediaReport = {
    agency: string
    image: string
    color: string
    quote: string
    link: string
}

const mediaReports: MediaReport[] = [
    {
        agency: 'BRTV',
        image: brtvLogo,
        color: '#c70200',
        quote: '“... a successful integration of navigation and environmental recognition.”',
        link: 'https://item.btime.com/20ejcgv5h3nmfba3h4ofa4pg7gb'
    },
    {
        agency: 'AbilityNet',
        image: abilityNetLogo,
        color: '#005c6e',
        quote: '“... tackling a key gap in independent travel for people with visual impairments.”',
        link: 'https://tech4goodawards.com/finalist/orinav-outdoor-navigation-for-visual-impairment/#:~:text=tackling%20a%20key%20gap%20in%20independent%20travel%20for%20people%20with%20visual%20impairments.'
    },
    {
        agency: 'The Beijing News',
        image: beijingNewsLogo,
        color: '#a41e24',
        quote: '“... making blind people safer and more dignified outdoors.”',
        link: 'https://m.bjnews.com.cn/detail/1765754286168264.html#:~:text=驻足停留，“-,让盲人朋友们在户外更安全和更有尊严'
    }
]

const reasonCards = [
    {
        id: 'integration',
        icon: <FontAwesomeIcon icon={faCircleNodes}/>,
        text: (
            <p className="reason-card__text">
                <strong>Smart integration.</strong> Orinav uses your navigation context to automatically enable features
                you need, when you need them.
            </p>
        )
    },
    {
        id: 'all-in-one',
        icon: <FontAwesomeIcon icon={faMobileScreenButton}/>,
        text: (
            <p className="reason-card__text">
                <strong>All in one app.</strong> With all the features you need for safe, independent navigation, Orinav
                eliminates the need for switching between multiple apps.
            </p>
        )
    },
    {
        id: 'privacy',
        icon: <FontAwesomeIcon icon={faLock}/>,
        text: (
            <p className="reason-card__text">
                <strong>Privacy by default.</strong> Our Explore features use on-device machine learning so your data
                always remains yours.
            </p>
        )
    },
    {
        id: 'hardware',
        icon: <FontAwesomeIcon icon={faWrench}/>,
        text: (
            <p className="reason-card__text">
                <strong>No additional hardware.</strong> You don't have to buy any vests, glasses, backpacks, or
                cameras.
            </p>
        )
    }
]

export function HomePage() {
    const sceneRef = useRef<HTMLElement>(null)
    const integrationCardRef = useRef<HTMLElement>(null)
    const manualStageRef = useRef<number | null>(null)
    const manualStageTimerRef = useRef<number | null>(null)
    const [ activeStage, setActiveStage ] = useState(0)
    const [ tabsVisible, setTabsVisible ] = useState(true)

    const getScrollMetrics = useCallback(() => {
        const scene = sceneRef.current
        if (!scene) return null

        const sceneTop = window.scrollY + scene.getBoundingClientRect().top
        const travel = Math.max(scene.offsetHeight - window.innerHeight, 1)
        return { sceneTop, travel }
    }, [])

    useEffect(() => {
        let animationFrame = 0

        const updateStage = () => {
            animationFrame = 0
            const metrics = getScrollMetrics()
            if (!metrics) return

            const scene = sceneRef.current
            if (scene) {
                const sceneBottom = metrics.sceneTop + scene.offsetHeight
                setTabsVisible(window.scrollY + window.innerHeight < sceneBottom - 1)
            }

            if (manualStageRef.current !== null) return

            const progress = Math.min(1, Math.max(0, (window.scrollY - metrics.sceneTop) / metrics.travel))
            const nextStage = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2
            setActiveStage(current => current === nextStage ? current : nextStage)
        }

        const onScroll = () => {
            if (!animationFrame) animationFrame = window.requestAnimationFrame(updateStage)
        }

        updateStage()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
            if (animationFrame) window.cancelAnimationFrame(animationFrame)
            if (manualStageTimerRef.current !== null) window.clearTimeout(manualStageTimerRef.current)
        }
    }, [ getScrollMetrics ])

    useEffect(() => {
        const card = integrationCardRef.current
        if (!card) return

        let animationFrame = 0
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const updatePhones = () => {
            animationFrame = 0

            if (reduceMotion) {
                card.style.setProperty('--left-phone-travel', '0px')
                card.style.setProperty('--right-phone-travel', '0px')
                return
            }

            const rect = card.getBoundingClientRect()
            const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
            card.style.setProperty('--left-phone-travel', `${progress * 20}px`)
            card.style.setProperty('--right-phone-travel', `${progress * -20}px`)
        }

        const onScroll = () => {
            if (!animationFrame) animationFrame = window.requestAnimationFrame(updatePhones)
        }

        updatePhones()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
            if (animationFrame) window.cancelAnimationFrame(animationFrame)
        }
    }, [])

    const selectStage = (index: number) => {
        const metrics = getScrollMetrics()
        if (!metrics) return

        manualStageRef.current = index
        setActiveStage(index)
        const progress = [ 0.02, 0.5, 0.98 ][index]
        const target = metrics.sceneTop + metrics.travel * progress
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (manualStageTimerRef.current !== null) window.clearTimeout(manualStageTimerRef.current)
        manualStageTimerRef.current = window.setTimeout(() => {
            manualStageRef.current = null
            manualStageTimerRef.current = null
            window.dispatchEvent(new Event('scroll'))
        }, reduceMotion ? 0 : 1200)

        window.history.replaceState(null, '', `#${stages[index].id}`)
        window.scrollTo({
            top: target,
            behavior: reduceMotion ? 'auto' : 'smooth'
        })
    }

    return (
        <div className="home-page">
            <Seo
                title="Orinav — AI-Powered Navigation for People with Visual Impairments"
                description="Orinav transforms the navigation experience for people with visual impairments. Navigate the world safely and independently—it's all in one app."
                path={paths.home}
            />

            <section className="hero-intro" aria-labelledby="hero-title">
                <h1 id="hero-title">Explore freely,<br/>move boldly.</h1>
                <p className="hero-description">
                    People with visual impairments around the world are using Orinav to transform their navigation
                    experience. Find your way and understand your surroundings: for the first time, it all works in a
                    single app.
                </p>

                <div className="award-list">
                    <div className="award-item">
                        <img src={t4gLogo} alt=""/>
                        <div className="award-copy">
                            <strong>Tech4Good Awards</strong>
                            <span>Highly Commended 2026</span>
                        </div>
                    </div>

                    <div className="award-item">
                        <img src={envisionLogo} alt=""/>
                        <div className="award-copy">
                            <strong>Inclusive Innovations</strong>
                            <span>Presenter 2025</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="showcase" ref={sceneRef} aria-label="Orinav in action">
                <div className="showcase-sticky">
                    <div className="notification-field" aria-hidden="true">
                        <div className="notification-stack notification-stack--left">
                            {cards.filter((_, index) => index % 2 === 0).map((card) => (
                                <div
                                    className={`notification-card${card.activeFor === activeStage ? ' notification-card--active' : ''}`}
                                    key={card.title}
                                >
                                    <span className="notification-icon" data-tone={card.tone}>
                                        {card.icon}
                                    </span>
                                    <span>
                                        <strong>{card.title}</strong>
                                        <small>{card.detail}</small>
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="notification-stack notification-stack--right">
                            {cards.filter((_, index) => index % 2 === 1).map((card) => (
                                <div
                                    className={`notification-card${card.activeFor === activeStage ? ' notification-card--active' : ''}`}
                                    key={card.title}
                                >
                                    <span className="notification-icon" data-tone={card.tone}>
                                        {card.icon}
                                    </span>
                                    <span>
                                        <strong>{card.title}</strong>
                                        <small>{card.detail}</small>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="phone-stage"
                        role="img"
                        aria-label={`Orinav showing ${stages[activeStage].label} on an iPhone`}
                    >
                        <div className="phone-screen-stack" aria-hidden="true">
                            {stages.map((stage, index) => (
                                <img
                                    className={`phone-screen${activeStage === index ? ' phone-screen--active' : ''}`}
                                    src={stage.screenshot}
                                    alt=""
                                    key={stage.id}
                                />
                            ))}
                        </div>
                        <img className="phone-mockup" src={phoneMockup} alt=""/>
                    </div>

                    <p className="sr-only" aria-live="polite" aria-atomic="true">
                        Showing {stages[activeStage].label}. {cards.filter(card => card.activeFor === activeStage).map(card => `${card.title}: ${card.detail}`).join('. ')}.
                    </p>

                    <nav
                        className={`stage-tabs${tabsVisible ? ' stage-tabs--visible' : ''}`}
                        aria-label="Choose a navigation stage"
                        aria-hidden={!tabsVisible}
                        style={{ '--active-stage': activeStage } as CSSProperties}
                    >
                        <span className="stage-tab-highlight" aria-hidden="true"/>
                        {stages.map((stage, index) => (
                            <a
                                aria-current={activeStage === index ? 'true' : undefined}
                                className="stage-tab"
                                href={`#${stage.id}`}
                                key={stage.id}
                                tabIndex={tabsVisible ? 0 : -1}
                                onClick={(event) => {
                                    event.preventDefault()
                                    selectStage(index)
                                }}
                            >
                                {stage.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {stages.map((stage, index) => (
                    <div
                        className="stage-anchor"
                        id={stage.id}
                        key={stage.id}
                        style={{ top: `${index * 50}%` }}
                        aria-hidden="true"
                    />
                ))}
            </section>

            <section className="media-reports" id="media-reports" aria-label="Orinav in the media">
                <div className="section-container">
                    <div className="media-report-grid">
                        {mediaReports.map((report) => (
                            <a
                                className="media-report-card"
                                href={report.link}
                                key={report.agency}
                                style={{ '--media-accent': report.color } as CSSProperties}
                                aria-label={`Read a report about Orinav from ${report.agency}`}
                            >
                                <span className="media-report-agency">
                                    <img src={report.image} alt="" loading="lazy"/>
                                </span>
                                <blockquote className="media-report-quote">
                                    <p>{report.quote}</p>
                                </blockquote>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="feature-section" aria-labelledby="feature-section-title">
                <div className="section-container">
                    <header className="feature-section__header">
                        <h2 id="feature-section-title">Start exploring the world with all the tools you need. <span
                            style={{ color: '#7300ff' }}>It‘s all in a single app.</span></h2>
                        <p>
                            Orinav is the first navigation app to bring accessible route planning and real-time
                            environmental
                            recognition together, helping you travel with more confidence at every stage.
                        </p>
                    </header>

                    <div className="feature-grid">
                        <article className="feature-card feature-card--full-width integration-card"
                                 ref={integrationCardRef}>
                            <h3>Navigate & Explore, all working together.</h3>
                            <p>Choose the best route for your journey with shades and accessible infrastructure. Hear
                                about obstacles, traffic lights, and crossings as you walk. All without the need to
                                manually switch between features. It's that easy.</p>
                            <div className="integration-card__mockups" aria-hidden="true">
                                <img
                                    className="integration-card__phone integration-card__phone--lower"
                                    src={screenshotHomeMockup}
                                    alt=""
                                />
                                <img
                                    className="integration-card__phone integration-card__phone--upper"
                                    src={screenshotExploreMockup}
                                    alt=""
                                />
                            </div>
                        </article>

                        <article className="feature-card feature-card--secondary">
                            <p>Frequent route updates always keep you in the loop.</p>

                            <div className="route-update-list">
                                <div className="route-update">
                                    <div className="route-update__icon route-update__icon--orientation">
                                        <FontAwesomeIcon icon={faArrowRight}/></div>
                                    <div>
                                        <p className="route-update__title">Orientation</p>
                                        <p className="route-update__detail">Turn 4 o'clock to align with Friary
                                            Road.</p>
                                    </div>
                                </div>
                                <div className="route-update">
                                    <div className="route-update__icon route-update__icon--next-step">
                                        <FontAwesomeIcon icon={faPersonWalking}/></div>
                                    <div>
                                        <p className="route-update__title">Next Step</p>
                                        <p className="route-update__detail">Take 12 steps, then turn right onto
                                            Piccadilly Street.</p>
                                    </div>
                                </div>
                                <div className="route-update">
                                    <div className="route-update__icon route-update__icon--environment">
                                        <FontAwesomeIcon icon={faTree}/></div>
                                    <div>
                                        <p className="route-update__title">Environment</p>
                                        <p className="route-update__detail">Obstacle-dense zone ahead.</p>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <article className="feature-card feature-card--secondary environment-card">
                            <div className="feature-card__copy">
                                <p>Explore your surroundings with AI-powered environment recognition.</p>
                            </div>

                            <img className="environment-card__photo" src={testingOutdoors}
                                 alt="Volunteers working with Orinav testers as they raise their phones to look at the environment"/>
                        </article>
                    </div>
                </div>
            </section>

            <section className="feature-section" aria-labelledby="feature-section-title2">
                <div className="section-container">
                    <header className="feature-section__header">
                        <h2 id="feature-section-title2">Walk smart with <span
                            style={{ color: '#7300ff' }}>Navigate</span></h2>
                        <p>Whether you travel every day or once a month, Orinav's Navigate gives you the right
                            information at the right moment. Hear when to take your next turn and how many steps remain.
                            Get clear guidance on which direction to face. Simply march ahead and hear it when you need
                            it.</p>
                    </header>

                    <div className="feature-grid feature-grid--asymmetric">
                        <article className="feature-card feature-card--full-width navigation-overview-card">
                            <div className="navigation-overview-card__copy">
                                <h3>It might just be the simplest navigation experience to date.</h3>
                                <p>Hear helpful prompts to orient you. Shake at any time to repeat instructions. And
                                    hear announcements more frequently so you stay on track. Better yet, Navigate is
                                    fully accessible to VoiceOver, TalkBack, and other screen readers.</p>
                            </div>
                            <img className="navigation-overview-card__mockup" src={navigationMockup} alt=""/>
                        </article>

                        <article className="feature-card feature-card--secondary orientation-card">
                            <video className="orientation-card__video" src={turnVideo} autoPlay muted loop
                                   playsInline preload="metadata" aria-hidden="true"/>
                            <p>An easy way to know where to face.</p>
                            <p className="sr-only">Orinav uses prompts like "Turn 3 o'clock" to help you face the right
                                way.</p>
                        </article>

                        <article className="feature-card feature-card--secondary timely-updates-card">
                            <p>Exactly the information you need, exactly when you need it.</p>
                            <p className="sr-only">Orinav uses your navigation context to predict the information you
                                need: traffic lights, crossings, hazards, among others.</p>
                            <img src={orinavCards} className="timely-updates-card__artwork" alt=""/>
                        </article>
                    </div>
                </div>
            </section>

            <section className="feature-section" aria-labelledby="feature-section-title3">
                <div className="section-container">
                    <header className="feature-section__header">
                        <h2 id="feature-section-title3">Know the world with <span
                            style={{ color: '#7300ff' }}>Explore</span></h2>
                        <p>Discover what is around you with a simple raise of your phone. Orinav Explore identifies
                            nearby obstacles and objects, then announces traffic lights as you move. Get immediate
                            information whenever you need a clearer sense of your surroundings.</p>
                    </header>

                    <div className="feature-grid">
                        <article className="feature-card feature-card--full-width explore-overview-card">
                            <h3>Not just directions.<br/>Hear the world, too.</h3>
                            <p>We know getting directions is only part of the journey. That's why Orinav identifies
                                obstacles and nearby objects, while recognizing traffic lights and more as you move.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="reasons-section" aria-labelledby="reasons-title">
                <div className="section-container">
                    <h2 className="reasons-section__title" id="reasons-title">
                        More reasons you'll want Orinav on your next journey
                    </h2>

                    <div className="reason-card-grid">
                        {reasonCards.map((card) => (
                            <article className="reason-card" key={card.id}>
                                <div className="reason-card__icon" aria-hidden="true">
                                    {card.icon}
                                </div>
                                {card.text}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="demo-section" aria-labelledby="demo-section-title">
                <div className="section-container demo-section__panel">
                    <header className="demo-section__header">
                        <h2 id="demo-section-title">See Orinav in action</h2>
                        <p>Watch Orinav help DC travel independently as he pursues his dream of going to college.</p>
                    </header>

                    <div className="demo-video-frame">
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/ms8yA4r35J4?si=PZaAYyHby1uZ4TiB"
                            title="Orinav demo video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            loading="lazy"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            <section className="download-section" aria-labelledby="download-section-title">
                <div className="section-container download-section__content">
                    <h2 id="download-section-title">Download Orinav</h2>
                    <p>It's free to get started. Download the app today and take your next step towards independent travel.</p>
                    <a className="app-store-link" href={paths.download}>
                        <img src={appStoreBadge} alt="Download Orinav on the iOS App Store"/>
                    </a>
                </div>
            </section>
        </div>
    )
}
