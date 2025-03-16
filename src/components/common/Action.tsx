import { ActionIcon, ActionIconProps } from '@mantine/core';
import { forwardRef } from 'react';

type ActionProps = ActionIconProps & {
	children: React.ReactNode;
};

const Action = forwardRef<HTMLButtonElement, ActionProps>(
	({ children, ...props }, ref) => {
		return (
			<ActionIcon
				ref={ref}
				variant="light"
				size="sm"
				radius="xl"
				{...props}
			>
				{children}
			</ActionIcon>
		);
	}
);

Action.displayName = 'Action';

export default Action;
