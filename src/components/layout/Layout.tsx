import { Flex } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import ReactPlayer from 'react-player/youtube';
import Action from '../common/Action';
import Loader from '../common/Loader';

import Footer from './Footer';
import NavBar from './NavBar';
import BuyMeACoffeeWidget from '../BuyMeACoffeeWidget';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
        
        return () => {
            window.removeEventListener('videoBackgroundToggle', checkVideoStatus);
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
                    <IconEye size={18} />
                </Action>
                <Flex
                    w="100vw"
                    h="100vh"
                    align="center"
                    justify="center"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                >
                    <Loader size={120} />
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
            {isVideoActive && (
                <Action
                    onClick={() => {
                        setIsOverlayVisible(false);
                        startZenMusic();
                    }}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 10,
                    }}
                    aria-label="Hide interface"
                >
                    <IconEyeOff size={18} />
                </Action>
            )}
            <NavBar />
            {children}
            <BuyMeACoffeeWidget />
            <Footer />
        </Flex>
    );
};

export default Layout;
