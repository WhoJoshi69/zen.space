import { useEffect, useState } from 'react';

import { Alert, Anchor, Flex, Container } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Playlist from '@/components/Playlist';
import useLocalStorage from '@/hooks/useLocalStorage';
import { motion, AnimatePresence } from 'framer-motion';

const Place = () => {
    const router = useRouter();
    const { name } = (router.query as { name: string }) || { name: '' };
    const title = `${name}'s place | zen.space`;
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        if (!name || typeof window === 'undefined') return;

        const storage = localStorage.getItem('zenSpaceNames');

        if (storage) {
            const found = storage?.split(',').find((element) => element === name);
            if (!found) {
                localStorage.setItem('zenSpaceNames', storage?.concat(',', name?.toString()));
            }
        } else {
            localStorage.setItem('zenSpaceNames', name?.toString());
        }
    }, [name]);

    if (!name) return null;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    property="og:image"
                    content={`https://zen.space/api/og?title=${title}`}
                    key="ogImage"
                />
                <meta
                    name="twitter:image"
                    content={`https://zen.space/api/og?title=${title}`}
                    key="twImage"
                />
            </Head>

            <Flex direction="column" h="100vh">
                <Container size="lg" px="lg" w="130%">
                    <Flex w="100%">
                        <Playlist />
                    </Flex>
                </Container>

                <div />
            </Flex>
            {showAlert && (
                <Alert
                    variant="light"
                    title="Enjoying your zen space?"
                    mb="xl"
                    w="100%"
                    withCloseButton
                    onClose={() => setShowAlert(false)}
                >
                    We love that it's free, but we do have some maintenance costs.{' '}
                    <Anchor href="https://buymeacoffee.com/whojoshi" target="_blank">
                        Your contribution
                    </Anchor>{' '}
                    would be very helpful!
                </Alert>
            )}
        </>
    );
};

export default Place;
