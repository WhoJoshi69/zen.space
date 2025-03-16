export type TaskType = {
    text: string;
    ready: boolean;
    group: string;
};

export type EditedTaskType = {
    i: number;
} & TaskType;
