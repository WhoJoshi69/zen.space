import { useState, useRef, useEffect } from 'react';

import { Stack, Flex, Text, TextInput, Progress, ScrollArea, Tooltip, Select, Box } from '@mantine/core';
import { IconSortDescending2, IconPlus } from '@tabler/icons-react';

import useLocalStorage from '@/hooks/useLocalStorage';
import { TaskType, EditedTaskType } from '@/types/task';

import Action from './common/Action';
import Title from './common/Title';
import DeleteTasks from './modals/DeleteTasks';
import EditTask from './modals/EditTask';
import Tasks from './Tasks';
import { usePlausible } from 'next-plausible';

type SelectItem = string | { label: string; value: string };

const Todo = ({ name }: { name: string }) => {
    const [storage, setStorage] = useLocalStorage<TaskType[]>(`dailyTodo_${name}`, []);
    const [groups, setGroups] = useLocalStorage<string[]>(`taskGroups_${name}`, [
        'Educational',
        'Entertainment',
        'Important'
    ]);
    const [selectedGroup, setSelectedGroup] = useState<string>('Important');

    const [opened, setOpened] = useState(false);
    const [editedTask, setEditedTask] = useState({} as EditedTaskType);
    const [tasks, setTasks] = useState(storage);
    const [progress, setProgress] = useState({
        progress: 0,
        percentage: 0,
        total: 0
    });
	const plausible = usePlausible();

    const task = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTasks(storage);
    }, [storage]);

    useEffect(() => {
        const progress = tasks?.filter((task: TaskType) => task.ready === true)?.length ?? 0;
        const percentage = Math.round((progress * 100) / tasks?.length) || 0;

        setProgress({
            progress,
            percentage,
            total: tasks?.length
        });
    }, [tasks]);

    const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!task.current || task?.current?.value?.trim() === '') return;

        const new_tasks = [
            ...tasks,
            {
                text: task.current.value,
                ready: false,
                group: selectedGroup
            }
        ];
		plausible('New+task');

        setStorage(new_tasks);
        task.current.value = '';
    };

    const markTaskAsReady = (taskIndex: number, readyBoolean: boolean) => {
        const temporal_tasks = [...tasks];
        temporal_tasks[taskIndex].ready = readyBoolean;

        setStorage(temporal_tasks);
    };

    const deleteTask = (taskIndex: number) => {
        const temporal_tasks = [...tasks];
        temporal_tasks.splice(taskIndex, 1);

        setStorage(temporal_tasks);
    };

    const moveTaskOrder = (fromIndex: number, toIndex: number) => {
        const temporal_tasks = [...tasks];
        const task = temporal_tasks[fromIndex];

        temporal_tasks?.splice(fromIndex, 1);
        temporal_tasks.splice(toIndex, 0, task);

        setStorage(temporal_tasks);
    };

    const moveDoneTasksDown = () => {
        const temporal_tasks = [...tasks];
        temporal_tasks?.sort((a, b) => (a.ready ? 1 : 0) - (b.ready ? 1 : 0));

        setStorage(temporal_tasks);
    };

    const handleEditTaskClick = (taskIndex: number) => {
        const temporal_edited_task = tasks[taskIndex];
        setEditedTask({ ...temporal_edited_task, i: taskIndex });
        setOpened(true);
    };

    const editTask = (newValue: string) => {
        const temporal_tasks = [...tasks];
        temporal_tasks[editedTask?.i].text = newValue;

        setStorage(temporal_tasks);
        setOpened(false);
    };

    const deleteAllTasks = () => {
        setStorage([]);
    };

    const handleCreateGroup = (query: string) => {
        const newGroup = query.trim();
        if (newGroup && !groups.includes(newGroup)) {
            setGroups([...groups, newGroup]);
            return newGroup;
        }
        return null;
    };

    return (
        <>
            <Stack w="100%">
                <Title text="To Do">
                    <Flex align="center" gap={10}>
                        {tasks?.length >= 2 && (
                            <>
                                <DeleteTasks onDeleteTasks={deleteAllTasks} />
                                <Tooltip label="Move done tasks down" withArrow>
                                    <Action
                                        aria-label="Move done tasks down"
                                        onClick={moveDoneTasksDown}
                                    >
                                        <IconSortDescending2 size={18} />
                                    </Action>
                                </Tooltip>
                            </>
                        )}
                    </Flex>
                </Title>
                <Stack gap={5}>
                    <Flex justify="space-between" align="center">
                        <Text fz={12} c="dimmed">
                            Progress
                        </Text>
                        <Text c="dimmed">{progress?.percentage}%</Text>
                    </Flex>
                    <Progress value={progress?.percentage} color="green" aria-label="Progress" />
                    <Text fz={12} c="dimmed" ta="right">
                        {progress?.progress}/{progress?.total} completed
                    </Text>
                </Stack>
                <Stack mt={20}>
                    <ScrollArea mah={{ base: '100%', sm: '25vw' }} type="auto" offsetScrollbars>
                        <Tasks
                            tasks={tasks}
                            onTaskCheck={markTaskAsReady}
                            onTaskDelete={deleteTask}
                            onTaskMove={moveTaskOrder}
                            onTaskEdit={handleEditTaskClick}
                            groups={groups}
                        />
                    </ScrollArea>
                </Stack>
                <form onSubmit={addNewTask}>
                    <Box mb={10}>
                        <Select
                            label="Task Group"
                            placeholder="Select a group"
                            data={groups.map(group => ({ label: group, value: group }))}
                            value={selectedGroup}
                            onChange={(value) => setSelectedGroup(value || 'Important')}
                            createLabel="+ Create new group"
                            onCreate={(query) => {
                                const newGroup = handleCreateGroup(query);
                                if (newGroup) {
                                    return { value: newGroup, label: newGroup };
                                }
                                return null;
                            }}
                            searchable
                            creatable
                            clearable={false}
                        />
                    </Box>
                    <TextInput
                        placeholder="Add new task..."
                        ref={task}
                        variant="unstyled"
                        required
                        rightSection={
                            <Action 
                                aria-label="Add task" 
                                component="button" 
                                type="submit"
                                onClick={(e) => e.preventDefault()}
                            >
                                <IconPlus size={16} />
                            </Action>
                        }
                    />
                </form>
            </Stack>
            <EditTask
                open={opened}
                onClose={() => setOpened(false)}
                task={editedTask}
                onTaskEdit={editTask}
            />
        </>
    );
};

export default Todo;
