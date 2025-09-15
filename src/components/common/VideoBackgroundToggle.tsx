import { useState, useEffect } from 'react';
import { IconVideo, IconVideoOff } from '@tabler/icons-react';
import { Menu } from '@mantine/core';
import Action from './Action';

const VideoBackgroundToggle = () => {
    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('zenspace-video-id');
        if (saved) {
            setVideoId(saved);
        }
    }, []);

    const selectVideo = (id: string) => {
        setVideoId(id);
        localStorage.setItem('zenspace-video-id', id);

        window.dispatchEvent(new CustomEvent('videoBackgroundToggle', {
            detail: { videoId: id }
        }));
    };

    const turnOff = () => {
        setVideoId('');
        localStorage.setItem('zenspace-video-id', '');

        window.dispatchEvent(new CustomEvent('videoBackgroundToggle', {
            detail: { videoId: '' }
        }));
    };

    return (
        <Menu width={200}>
            <Menu.Target>
                <Action aria-label="Video background options">
                    {videoId ? <IconVideoOff size={18} /> : <IconVideo size={18} />}
                </Action>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Video Background</Menu.Label>
                <Menu.Item onClick={() => selectVideo('iKBs9l8jS6Q')}>Just Go On!</Menu.Item>
                <Menu.Item onClick={() => selectVideo('yW5WIyEe_eE')}>Chase!</Menu.Item>
                <Menu.Item onClick={() => selectVideo('1Kt8-851Lys')}>I am on top!</Menu.Item>
                <Menu.Item onClick={() => selectVideo('NmPNsK30IXA')}>Hardcore parkour!</Menu.Item>
                <Menu.Item onClick={() => selectVideo('wgiRK8_iKdg')}>End Game!</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={turnOff} color="red">Turn Off</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default VideoBackgroundToggle;
