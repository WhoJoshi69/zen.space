import { useState } from 'react';
import { Button, Modal, SimpleGrid, Text, Box } from '@mantine/core';
import { IconMoodCog } from '@tabler/icons-react';

const ZenModeButton = () => {
    const [opened, setOpened] = useState(false);

    const videos = [
        { id: 'iKBs9l8jS6Q', title: 'Just Go On!' },
        { id: 'yW5WIyEe_eE', title: 'Chase!' },
        { id: '1Kt8-851Lys', title: 'I am on top!' },
        { id: 'NmPNsK30IXA', title: 'Hardcore parkour!' },
        { id: 'wgiRK8_iKdg', title: 'End Game!' },
        { id: 'mIDlU_sKto0', title: 'Drive Hard!' },
        { id: '8b5k0M8wTBg', title: 'Kung Fu!' },
        { id: 'JXrWPLNp9tw', title: 'The Window!' },
    ];

    const enterZenMode = (videoId: string) => {
        localStorage.setItem('zenspace-video-id', videoId);
        window.dispatchEvent(new CustomEvent('videoBackgroundToggle', {
            detail: { videoId }
        }));
        window.dispatchEvent(new CustomEvent('enterZenMode'));
        setOpened(false);
    };

    return (
        <>
            <Button
                variant="gradient"
                gradient={{ from: 'gray', to: 'black' }}
                onClick={() => setOpened(true)}
                fullWidth
            >
                Zen Mode  (click me and relax)
            </Button>

            <Modal opened={opened} onClose={() => setOpened(false)} title="Choose Your Zen Background" centered size="lg">
                <Text size="sm" c="dimmed" mb="md">
                    Select a video background to enter zen mode
                </Text>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                    {videos.map((video) => (
                        <Box
                            key={video.id}
                            p="md"
                            style={{
                                border: '1px solid var(--mantine-color-gray-3)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                textAlign: 'center',
                            }}
                            onClick={() => enterZenMode(video.id)}
                        >
                            <Text size="sm" fw={500}>{video.title}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Modal>
        </>
    );
};

export default ZenModeButton;
