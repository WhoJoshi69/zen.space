import { useEffect, useState } from 'react';

const VideoBackground = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('zenspace-video-background');
        if (saved) {
            setIsEnabled(JSON.parse(saved));
        }

        const handleToggle = (event: CustomEvent) => {
            setIsEnabled(event.detail.enabled);
        };

        window.addEventListener('videoBackgroundToggle', handleToggle as EventListener);

        return () => {
            window.removeEventListener('videoBackgroundToggle', handleToggle as EventListener);
        };
    }, []);

    useEffect(() => {
        const body = document.body;
        if (isEnabled) {
            body.classList.add('video-background-active');
        } else {
            body.classList.remove('video-background-active');
        }

        return () => {
            body.classList.remove('video-background-active');
        };
    }, [isEnabled]);

    if (!isEnabled) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                overflow: 'hidden',
            }}
        >
            <iframe
                src="https://www.youtube.com/embed/iKBs9l8jS6Q?start=28&autoplay=1&mute=1&loop=1&playlist=iKBs9l8jS6Q&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '160vw',
                    height: '160vh',
                    transform: 'translate(-50%, -50%)',
                    border: 'none',
                    pointerEvents: 'none',
                }}
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
        </div>
    );
};

export default VideoBackground;
