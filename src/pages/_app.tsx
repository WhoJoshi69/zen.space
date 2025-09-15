import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/constants/theme';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '../lib/gtag';
import Layout from '@/components/layout/Layout';
import Script from 'next/script';
import { Notifications } from '@mantine/notifications';
import PlausibleProvider from 'next-plausible';
import VideoBackground from '@/components/common/VideoBackground';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            <Head>
                <title>zen.space</title>
                <meta name="title" content="zen.space" />
                <meta
                    name="description"
                    content="Create your perfect space to focus on your daily tasks."
                />

                <meta property="og:site_name" content="Zen space" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://zen.space/" />
                <meta property="og:title" content="zen.space" />
                <meta
                    property="og:description"
                    content="Create your perfect space to focus on your daily tasks."
                />
                <meta
                    property="og:image"
                    content="https://i.ytimg.com/vi/EdyMwu6vg5k/maxresdefault.jpg"
                    key="ogImage"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://zen.space/" />
                <meta name="twitter:title" content="zen.space" />
                <meta
                    name="twitter:description"
                    content="Create your perfect space to focus on your daily tasks."
                />
                <meta
                    name="twitter:image"
                    content="https://i.ytimg.com/vi/EdyMwu6vg5k/maxresdefault.jpg"
                    key="twImage"
                />

                <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZjAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMSAxMmE5IDkgMCAxIDEtMTggMGE5IDkgMCAwIDEgMTggMG0tOC4wMjYtNC4wN2EuMzUuMzUgMCAwIDAtLjM4MS40MzRsMS41MTIgNS44NDdIOS40NGEuMzUuMzUgMCAwIDAgMCAuNjk4aDUuMTJhLjM1LjM1IDAgMCAwIC4zMzctLjQzN2wtMS42My02LjI4MmEuMzUuMzUgMCAwIDAtLjI5My0uMjZtLTQuMTEgOS4zMDZjLS4xOTggMC0uMzU1LjEyOC0uMzU1LjI5aC0uMDA2YzAgLjE2NC4xNTcuMjkyLjM1NS4yOTJoNi4yODNjLjE5NyAwIC4zNTUtLjEyOC4zNTUtLjI5MXMtLjE1OC0uMjkxLS4zNTUtLjI5MXptLS42NDYtOC43MjdhLjg3My44NzMgMCAxIDAgMC0xLjc0NWEuODczLjg3MyAwIDAgMCAwIDEuNzQ1bTguNDM2LS44NzJhLjg3My44NzMgMCAxIDEtMS43NDYgMGEuODczLjg3MyAwIDAgMSAxLjc0NiAwIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${gtag.GA_TRACKING_ID}', {
                                    page_path: window.location.pathname,
                                });
                            `
                    }}
                />
            </Head>
            <MantineProvider theme={theme}>
                <Notifications position="top-center" color="orange" autoClose={60000} />
                <VideoBackground />
                <Layout>
                    <style global jsx>{`
                        html,
                        body,
                        div#__next {
                            height: 100%;
                            background: light-dark(
                                var(--mantine-color-gray-0),
                                var(--mantine-color-black)
                            );
                        }

                        body.video-background-active,
                        body.video-background-active div#__next {
                            background: transparent !important;
                        }

                        body.video-background-active::before {
                            content: '';
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100vw;
                            height: 100vh;
                            z-index: 0;
                        }

                        body.video-background-active .main-layout {
                            background: rgba(0, 0, 0, 0);
                            border-radius: 12px;
                            backdrop-filter: blur(13px);
                            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                        }

                        body.video-background-active .main-layout * {
                            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
                        }
                    `}</style>
                    <PlausibleProvider domain="zen.space" taggedEvents={true}>
                        <Component {...pageProps} />
                    </PlausibleProvider>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                    />
                </Layout>
            </MantineProvider>
        </>
    );
}
