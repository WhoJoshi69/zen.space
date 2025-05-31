import { Flex, Text, useMantineColorScheme, Grid, Anchor, Badge } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FeedbackFish } from '@feedback-fish/react'
import { useState, useEffect } from 'react';

import DateAndTime from '@/components/DateAndTime';

import Places from '../common/Places';
import ThemeToggle from '../common/ThemeToggle';

const NavBar = () => {
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const router = useRouter();
    const name = router.query?.name || '';

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const logoSrc = dark 
        ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMSAxMmE5IDkgMCAxIDEtMTggMGE5IDkgMCAwIDEgMTggMG0tOC4wMjYtNC4wN2EuMzUuMzUgMCAwIDAtLjM4MS40MzRsMS41MTIgNS44NDdIOS40NGEuMzUuMzUgMCAwIDAgMCAuNjk4aDUuMTJhLjM1LjM1IDAgMCAwIC4zMzctLjQzN2wtMS42My02LjI4MmEuMzUuMzUgMCAwIDAtLjI5My0uMjZtLTQuMTEgOS4zMDZjLS4xOTggMC0uMzU1LjEyOC0uMzU1LjI5aC0uMDA2YzAgLjE2NC4xNTcuMjkyLjM1NS4yOTJoNi4yODNjLjE5NyAwIC4zNTUtLjEyOC4zNTUtLjI5MXMtLjE1OC0uMjkxLS4zNTUtLjI5MXptLS42NDYtOC43MjdhLjg3My44NzMgMCAxIDAgMC0xLjc0NWEuODczLjg3MyAwIDAgMCAwIDEuNzQ1bTguNDM2LS44NzJhLjg3My44NzMgMCAxIDEtMS43NDYgMGEuODczLjg3MyAwIDAgMSAxLjc0NiAwIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4='
        : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZjAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMSAxMmE5IDkgMCAxIDEtMTggMGE5IDkgMCAwIDEgMTggMG0tOC4wMjYtNC4wN2EuMzUuMzUgMCAwIDAtLjM4MS40MzRsMS41MTIgNS44NDdIOS40NGEuMzUuMzUgMCAwIDAgMCAuNjk4aDUuMTJhLjM1LjM1IDAgMCAwIC4zMzctLjQzN2wtMS42My02LjI4MmEuMzUuMzUgMCAwIDAtLjI5My0uMjZtLTQuMTEgOS4zMDZjLS4xOTggMC0uMzU1LjEyOC0uMzU1LjI5aC0uMDA2YzAgLjE2NC4xNTcuMjkyLjM1NS4yOTJoNi4yODNjLjE5NyAwIC4zNTUtLjEyOC4zNTUtLjI5MXMtLjE1OC0uMjkxLS4zNTUtLjI5MXptLS42NDYtOC43MjdhLjg3My44NzMgMCAxIDAgMC0xLjc0NWEuODczLjg3MyAwIDAgMCAwIDEuNzQ1bTguNDM2LS44NzJhLjg3My44NzMgMCAxIDEtMS43NDYgMGEuODczLjg3MyAwIDAgMSAxLjc0NiAwIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=';

    return (
        <Grid justify="center" align="center" w="100%" m={0}>
            <Grid.Col span={{ base: 12, sm: 4 }}>
                <Flex align="center" justify="flex-start" gap="sm">
                    {router?.pathname !== '/' && (
                        <Anchor component={Link} href="/" lh={0}>
                            <Image
                                alt="Zen Space logo"
                                src={logoSrc}
                                width={20}
                                height={20}
                            />
                        </Anchor>
                    )}
                    {name && <DateAndTime />}
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 'auto', sm: 4 }}>
                {name && (
                    <Text fz={18} fw={500} ta="center">
                        {name}&apos;s{' '}
                        <Text span c="dimmed">
                            place
                        </Text>
                    </Text>
                )}
            </Grid.Col>
            <Grid.Col span={{ base: 'auto', sm: 4 }}>
                <Flex gap="md" justify="flex-end" align="center">
					<FeedbackFish projectId="f8a40614c9bf8f">
						<Badge variant="dot" style={{ cursor: 'pointer' }}>Feedback</Badge>
					</FeedbackFish>
                    <Places name={name as string} />
                    <ThemeToggle />
                </Flex>
            </Grid.Col>
        </Grid>
    );
};

export default NavBar;
