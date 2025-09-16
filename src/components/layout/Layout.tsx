import { Flex, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import ReactPlayer from 'react-player/youtube';
import { useRouter } from 'next/router';
import Action from '../common/Action';
import Loader from '../common/Loader';

import Footer from './Footer';
import NavBar from './NavBar';
import BuyMeACoffeeWidget from '../BuyMeACoffeeWidget';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const { name } = (router.query as { name: string }) || { name: '' };
    const [isVideoActive, setIsVideoActive] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);
    const [zenModeMusic, setZenModeMusic] = useState<any>(null);

    useEffect(() => {
        const checkVideoStatus = () => {
            const videoId = localStorage.getItem('zenspace-video-id');
            setIsVideoActive(!!videoId);
        };

        checkVideoStatus();
        window.addEventListener('videoBackgroundToggle', checkVideoStatus);

        const handleEnterZenMode = () => {
            setIsOverlayVisible(false);
            startZenMusic();
        };

        window.addEventListener('enterZenMode', handleEnterZenMode);

        return () => {
            window.removeEventListener('videoBackgroundToggle', checkVideoStatus);
            window.removeEventListener('enterZenMode', handleEnterZenMode);
        };
    }, []);

    const startZenMusic = () => {
        setZenModeMusic(
            <ReactPlayer
                url="https://www.youtube.com/watch?v=zlxXwE0Oop8"
                loop
                width={0}
                height={0}
                style={{ display: 'none' }}
                playing={true}
                volume={0.5}
            />
        );
    };

    const stopZenMusic = () => {
        setZenModeMusic(null);
    };

    if (isVideoActive && !isOverlayVisible) {
        return (
            <>
                {zenModeMusic}
                <Action
                    onClick={() => {
                        setIsOverlayVisible(true);
                        stopZenMusic();
                    }}
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        zIndex: 10,
                    }}
                    aria-label="Show interface"
                >
                    <IconX size={18} />
                </Action>
                <Flex
                    w="100vw"
                    h="100vh"
                    align="center"
                    justify="center"
                    direction="column"
                    gap={20}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                >
                    <Loader size={120} />
                    <Text size="xl" fw={500} c="white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>
                        Welcome to Darshit's
                    </Text>
					<Text size="xl" fw={1000} c="white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>
                        zen space
                    </Text>
					<Text size="xl" fw={500} c="white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>
                        (JUST SIT BACK AND ENJOY)
                    </Text>
                </Flex>
            </>
        );
    }

    return (
        <Flex
            direction="column"
            align="flex-start"
            justify="space-between"
            m="auto"
            mih="100%"
            maw={960}
            py={40}
            px={20}
            gap={20}
            style={{
                position: 'relative',
                zIndex: 1,
            }}
            className="main-layout"
        >

            <NavBar />
            {children}
            <BuyMeACoffeeWidget />
            <Footer />
        </Flex>
    );
};

export default Layout;
