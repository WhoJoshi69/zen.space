import { ActionIcon, ActionIconProps } from '@mantine/core';
import { forwardRef } from 'react';

// Extend ActionIconProps with HTMLButtonElement props to include onClick and type
type ActionProps = ActionIconProps & React.ComponentPropsWithoutRef<'button'> & {
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
