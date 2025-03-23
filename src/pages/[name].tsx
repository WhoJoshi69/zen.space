import { useEffect, useState } from 'react';

import { Alert, Anchor, Flex } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Playlist from '@/components/Playlist';
import Pomodoro from '@/components/Pomodoro';
import Todo from '@/components/Todo';
import useLocalStorage from '@/hooks/useLocalStorage';
import { motion, AnimatePresence } from 'framer-motion';

const Place = () => {
    const router = useRouter();
    const { name } = (router.query as { name: string }) || { name: '' };
    const title = `${name}'s place | zen.space`;
    const [showAlert, setShowAlert] = useState(true);
    const [features, _setFeatures] = useLocalStorage('zenSpaceFeatures', {
        pomodoro: true,
        analytics: true,
        music: true
    });

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

            <Flex direction="column" justify="space-between" w="100%">
                <div>
                    <Flex gap={50} my={50} w="100%" direction={{ base: 'column', sm: 'row' }}>
                        <AnimatePresence>
                            {features.pomodoro && (
                                <motion.div
                                    initial={{ opacity: 0, width: '0%' }}
                                    animate={{ opacity: 1, width: '50%' }}
                                    exit={{ opacity: 0, width: '0%' }}
                                    transition={{ duration: 0.2 }}
                                    style={{ 
                                        overflow: 'hidden',
                                        display: features.pomodoro ? 'block' : 'none'
                                    }}
                                >
                                    <Pomodoro name={name} title={title} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        <motion.div
                            animate={{
                                width: features.pomodoro ? '50%' : '100%'
                            }}
                            transition={{ duration: 0.2 }}
                            style={{ flexGrow: 1 }}
                        >
                            <Todo name={name} />
                        </motion.div>
                    </Flex>

                    <AnimatePresence mode="wait">
                        {features.music && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <Flex w="100%">
                                    <Playlist />
                                </Flex>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

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
