import { ActionIcon, ActionIconProps } from '@mantine/core';
import { forwardRef } from 'react';

type ActionProps = ActionIconProps & {
	children: React.ReactNode;
};

const Action = forwardRef<HTMLButtonElement, ActionProps>(
	({ children, variant = "light", size = "sm", radius = "xl", ...props }, ref) => {
		return (
			<ActionIcon
				ref={ref}
				variant={variant}
				size={size}
				radius={radius}
				{...props}
			>
				{children}
			</ActionIcon>
		);
	}
);

Action.displayName = 'Action';

export default Action;
