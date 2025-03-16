import { Menu, Checkbox } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import Action from './Action';
import useLocalStorage from '@/hooks/useLocalStorage';

const Features = () => {
    const [features, setFeatures] = useLocalStorage('zenSpaceFeatures', {
        pomodoro: true,
        analytics: true,
        music: true
    });

    const handleFeatureToggle = (feature: keyof typeof features) => {
        setFeatures(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    return (
        <Menu width={200} withArrow trigger="hover">
            <Menu.Target>
                <Action aria-label="Features menu">
                    <IconMenu2 size={18} />
                </Action>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Features</Menu.Label>
                <Menu.Item>
                    <Checkbox
                        label="Pomodoro"
                        checked={features.pomodoro}
                        onChange={() => handleFeatureToggle('pomodoro')}
                    />
                </Menu.Item>
                <Menu.Item>
                    <Checkbox
                        label="Analytics"
                        checked={features.analytics}
                        onChange={() => handleFeatureToggle('analytics')}
                    />
                </Menu.Item>
                <Menu.Item>
                    <Checkbox
                        label="Music"
                        checked={features.music}
                        onChange={() => handleFeatureToggle('music')}
                    />
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default Features; 