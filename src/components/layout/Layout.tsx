import { Flex } from '@mantine/core';

import Footer from './Footer';
import NavBar from './NavBar';
import BuyMeACoffeeWidget from '../BuyMeACoffeeWidget';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
