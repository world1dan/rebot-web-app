export interface INote {
    text: string
    isPinned: boolean
    createdAt: number
}

export interface INoteList {
    [id: string]: INote
}

export interface ITask {
    text: string
    isCompleted: boolean
    createdAt: number
}

export interface ITaskList {
    [id: string]: ITask
}
