import { useState, useEffect } from 'react';
import { IconVideo, IconVideoOff } from '@tabler/icons-react';
import Action from './Action';

const VideoBackgroundToggle = () => {
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('zenspace-video-background');
        if (saved) {
            setIsVideoEnabled(JSON.parse(saved));
        }
    }, []);

    const toggleVideo = () => {
        const newState = !isVideoEnabled;
        setIsVideoEnabled(newState);
        localStorage.setItem('zenspace-video-background', JSON.stringify(newState));
        
        // Dispatch custom event for video background change
        window.dispatchEvent(new CustomEvent('videoBackgroundToggle', { 
            detail: { enabled: newState } 
        }));
    };

    return (
        <Action onClick={toggleVideo} aria-label="Toggle video background">
            {isVideoEnabled ? <IconVideoOff size={18} /> : <IconVideo size={18} />}
        </Action>
    );
};

export default VideoBackgroundToggle;