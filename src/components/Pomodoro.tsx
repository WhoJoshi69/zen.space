import { useState, useEffect } from 'react';

import { Stack, Flex, Text, Badge, SegmentedControl } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { showNotification, cleanNotifications } from '@mantine/notifications';
import {
    IconPlayerPlay,
    IconPlayerPause,
    IconReload,
    IconSettings,
    IconAlarm,
    IconRotate2,
    IconRotate,
    IconTrash
} from '@tabler/icons-react';

import { POMODORO_SETTINGS, POMODORO_MODES } from '@/constants/PomodoroConstants';
import { formatTime } from '@/helpers/formatTime';
import useLocalStorage from '@/hooks/useLocalStorage';
import { PomodoroSetting } from '@/types/pomodoro';

import Action from './common/Action';
import Title from './common/Title';
import PomodoroSettings from './modals/PomodoroSettings';
import Shortcuts from './modals/Shortcuts';
import pomodoroSound from '../../public/sounds/pomodoro-timer.mp3';

const Pomodoro = ({ name, title }: { name: string; title: string }) => {
    const [storage, setStorage] = useLocalStorage<PomodoroSetting>(
        `dailyPomodoro_${name}`,
        POMODORO_SETTINGS
    );

    useHotkeys([
        ['mod+P', () => setIsActive(!isActive)],
        ['mod+alt+1', () => setMode('pomodoro')],
        ['mod+alt+2', () => setMode('short')],
        ['mod+alt+3', () => setMode('long')]
    ]);

    const [mode, setMode] = useState(POMODORO_MODES[0].value);
    const [secondsLeft, setSecondsLeft] = useState(storage?.pomodoro * 60);
    const [isActive, setIsActive] = useState(false);
    const [opened, setOpened] = useState(false);
    const [sound, setSound] = useState<HTMLAudioElement | null>(null);
    const [previousTimestamp, setPreviousTimestamp] = useState<number | null>(null);

    useEffect(() => {
        const sound = new Audio(pomodoroSound);

        setSound(sound);
    }, []);

    useEffect(() => {
        restartPomodoro();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storage, mode]);

    useEffect(() => {
        if (isActive) {
            cleanNotifications();

            const interval = setInterval(() => {
                /*
					On first run and after resets, `previousTimestamp` will
					be null and we have to artificially  subtract one second
					to trigger a change in delta.
				*/
                const refTimestamp =
                    previousTimestamp === null ? Date.now() - 1000 : previousTimestamp;

                /*
					CPU time vs Wall time
					When a browser tab or window is off-screen
					or in a tab that isn't focused, the scheduler
					doesn't execute the JS engine every
					tick/second. Instead, the process is scheduled
					to run in less frequent intervals. This means
					that one can't assume that the interval timer
					will execute once every wall time second, but
					rather once every "JS engine active" second.
					Since the countdown should count wall time,
					we need to calculate a delta for when the
					function last ran.
				*/
                const delta = Math.round((Date.now() - refTimestamp) / 1000);

                /*
					We then subtract the delta time i.e. the
					time that has passed since last function
					execution.
				*/
                setSecondsLeft((secondsLeft) => secondsLeft - delta);
                document.title = formatTime(secondsLeft - delta);

                // Update timestamp for last execution
                setPreviousTimestamp(Date.now());
            }, 1000);

            /*
				secondsLeft can be less than 0 if the
				browser tab/window is running in the background
			*/
            if (secondsLeft <= 0) {
                sound?.play();
                clearInterval(interval);
                restartPomodoro();

                const notif_text = POMODORO_MODES.find((elem) => elem?.value === mode);

                showNotification({
                    title: `${notif_text?.label} time is over`,
                    icon: <IconAlarm size={20} />,
                    message: ''
                });
            }

            if (secondsLeft <= 0 && mode === 'pomodoro') {
                /*setPomodorosToday(prevState => prevState + 1);*/
                setStorage({
                    ...storage,
                    pomodoroToday: storage?.pomodoroToday + 1
                });
            }

            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, secondsLeft]);

    const restartPomodoro = () => {
        setIsActive(false);
        setPreviousTimestamp(null);
        document.title = title;

        switch (mode) {
            case 'short':
                setSecondsLeft(storage?.shortBreak * 60);
                break;
            case 'long':
                setSecondsLeft(storage?.longBreak * 60);
                break;
            default:
                setSecondsLeft(storage?.pomodoro * 60);
        }
    };

    const savePomodoroConfiguration = (newValues: PomodoroSetting) => {
        switch (mode) {
            case 'short':
                setSecondsLeft(newValues?.shortBreak * 60);
                break;
            case 'long':
                setSecondsLeft(newValues?.longBreak * 60);
                break;
            default:
                setSecondsLeft(newValues?.pomodoro * 60);
        }
        setStorage({
            ...storage,
            pomodoro: newValues?.pomodoro,
            shortBreak: newValues?.shortBreak,
            longBreak: newValues?.longBreak
        });
        setOpened(false);
        setIsActive(false);
    };

    const restartPomodorosToday = () => {
        setStorage({
            ...storage,
            pomodoroToday: 0
        });
    };

    return (
        <>
            <Stack w="100%">
                <Title text="Pomodoro">
                    <Flex align="center" gap={10}>
                        <Shortcuts />
                        <Action
                            aria-label="Pomodoro settings"
                            onClick={() => setOpened(true)}
                            type="button"
                        >
                            <IconSettings size={18} />
                        </Action>
                    </Flex>
                </Title>
                <SegmentedControl
                    value={mode}
                    data={POMODORO_MODES}
                    onChange={(value) => setMode(value)}
                />
                <Flex align="center" justify="space-between" my="lg">
                    <Text fz={48} fw={500} ff="monospace" lh={0}>
                        {formatTime(secondsLeft || 0)}
                    </Text>
                    <Flex gap="xs">
                        {isActive ? (
                            <Action
                                color="red"
                                variant="light"
                                onClick={() => {
                                    setIsActive(false);
                                    setPreviousTimestamp(null);
                                }}
                                aria-label="Pause pomodoro"
                            >
                                <IconPlayerPause size={18} />
                            </Action>
                        ) : (
                            <Action
                                color="green"
                                variant="light"
                                onClick={() => setIsActive(true)}
                                aria-label="Play pomodoro"
                            >
                                <IconPlayerPlay size={18} />
                            </Action>
                        )}

                        <Action aria-label="Restart pomodoro" onClick={restartPomodoro}>
                            <IconRotate2 size={18} />
                        </Action>
                    </Flex>
                </Flex>
                <Flex align="center" justify="space-between">
                    <Text>
                        <Badge
                            radius="sm"
                            size="sm"
                            mr={5}
                            variant="transparent"
                            color={storage?.pomodoroToday === 0 ? 'gray' : 'green'}
							component="span"
                        >
                            {storage?.pomodoroToday}
                        </Badge>
                        completed today
                    </Text>
                    {storage?.pomodoroToday > 0 && (
                        <Action
                            aria-label="Restart pomodoros today"
                            onClick={restartPomodorosToday}
                        >
                            <IconTrash size={18} />
                        </Action>
                    )}
                </Flex>
            </Stack>

            <PomodoroSettings
                open={opened}
                onClose={() => setOpened(false)}
                settings={storage}
                onSaveSettings={savePomodoroConfiguration}
            />
        </>
    );
};

export default Pomodoro;
