import { PomodoroSetting, PomodoroMode } from "@/types/pomodoro";

export const POMODORO_SETTINGS: PomodoroSetting = {
	pomodoro: 25,
	shortBreak: 5,
	longBreak: 10,
	pomodoroToday: 0,
};

export const POMODORO_MODES: PomodoroMode[] = [
	{ label: "Pomodoro", value: "pomodoro" },
	{ label: "Short break", value: "short" },
	{ label: "Long break", value: "long" },
];
