import { forwardRef } from "react";

import { ActionIcon, ActionIconProps, createPolymorphicComponent } from "@mantine/core";

type ActionProps = {
	children: React.ReactNode;
} & ActionIconProps;

// Create intermediate component with default ref type and props
const _Action = forwardRef<HTMLButtonElement, ActionProps>(({ children, ...others }, ref) => (
	<ActionIcon
		radius="md"
		component="button"
		variant="transparent"
		color="gray"
		ref={ref}
		{...others}
		sx={(theme) => ({
			transition: 'all 0.2s ease',
			'&:hover': {
				transform: 'scale(1.1)',
				opacity: 0.8,
			},
			...others.sx
		})}
	>
		{children}
	</ActionIcon>
));

// createPolymorphicComponent accepts two types: default element and component props
// all other props will be added to component type automatically
const Action = createPolymorphicComponent<"button", ActionProps>(_Action);

export default Action;

_Action.displayName = "Action";
