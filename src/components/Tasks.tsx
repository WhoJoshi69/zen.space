import { ActionIcon, Flex, TypographyStylesProvider, Box, Text } from "@mantine/core";
import { IconGripVertical, IconTrash, IconCheck, IconPencil } from "@tabler/icons-react";
import linkifyHtml from "linkify-html";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { TaskType } from "@/types/task";
import Action from "./common/Action";

interface TasksProps {
	tasks: TaskType[];
	groups: string[];
	onTaskCheck: (index: number, ready: boolean) => void;
	onTaskDelete: (index: number) => void;
	onTaskMove: (sourceIndex: number, destinationIndex: number) => void;
	onTaskEdit: (index: number, text: string) => void;
}

const options = { defaultProtocol: "https", target: "_blank" };

const Tasks = ({ tasks, groups, onTaskCheck, onTaskDelete, onTaskMove, onTaskEdit }: TasksProps) => {

	if (!tasks?.length) return null;

	// Group tasks by their group
	const groupedTasks = groups.reduce((acc, group) => {
		acc[group] = tasks.filter(task => task.group === group);
		return acc;
	}, {} as Record<string, TaskType[]>);

	return (
		<DragDropContext onDragEnd={({ destination, source }) => onTaskMove(source.index, destination?.index || 0)}>
			{groups.map(group => (
				groupedTasks[group]?.length > 0 && (
					<Box key={group} mb={20}>
						<Text fw={500} mb={10}>{group}</Text>
						<Droppable
							droppableId={`droppable-${group}`}
							type="TASKS"
						>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{groupedTasks[group]?.map((task: TaskType, index: number) => (
										<Draggable
											draggableId={`draggable-${index}`}
											index={index}
											key={index}
										>
											{(provided) => (
												<Flex
													align="center"
													ref={provided.innerRef}
													{...provided.draggableProps}
													mb={10}
												>
													<Flex
														align="center"
														{...provided.dragHandleProps}
													>
														<IconGripVertical
															color="gray"
															size={14}
														/>
													</Flex>

													<ActionIcon
														color={task?.ready ? "green" : "gray"}
														aria-label={task?.ready ? "Mark task as unready" : "Mark task as ready"}
														variant="filled"
														onClick={() => onTaskCheck(index, !task?.ready)}
														size="xs"
														mx={10}
													>
														{task?.ready && <IconCheck size={14} />}
													</ActionIcon>

													<TypographyStylesProvider
														fz="sm"
														w="100%"
														mr={5}
														style={{ wordBreak: "break-all" }}
														c="inherit"
													>
														<div
															dangerouslySetInnerHTML={{
																__html: linkifyHtml(task?.text, options),
															}}
														/>
													</TypographyStylesProvider>
													<Flex
														align="center"
														gap={5}
													>
														<Action
															color="blue"
															aria-label="Edit task"
															onClick={() => onTaskEdit(index, task?.text)}
														>
															<IconPencil size={16} />
														</Action>
														<Action
															color="red"
															aria-label="Delete task"
															onClick={() => onTaskDelete(index)}
														>
															<IconTrash size={16} />
														</Action>
													</Flex>
												</Flex>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</Box>
				)
			))}
		</DragDropContext>
	);
};

export default Tasks;
