import { Flex, Title, Text, Anchor, Stack, Badge } from '@mantine/core';
import Head from 'next/head';

import { FeedbackFish } from '@feedback-fish/react';

const Contact = () => {
    return (
        <>
            <Head>
                <title>Contact | zen.space</title>
                <meta name="title" content="Contact | zen.space" />
                <meta name="description" content="Questions, feedback or help about zen.space" />
            </Head>
            <div>
                <Title order={3}>Contact</Title>
                <Stack mt="md">
					<Text>
						If you have any questions, feedback, or need help with the app, just use the
						following widget:
					</Text>

					<FeedbackFish projectId="6a0ab10df6a57f">
						<Badge variant="dot" style={{ cursor: 'pointer' }}>
							Feedback
						</Badge>
					</FeedbackFish>

					<Text mt="md">Or you can write us directly to our e-mail:</Text>

					<Flex gap={20} wrap="wrap" align="center">
						<Anchor href="mailto:joshidarshit2002@gmail.com">joshidarshit2002@gmail.com</Anchor>
					</Flex>
				</Stack>
            </div>
        </>
    );
};

export default Contact;
