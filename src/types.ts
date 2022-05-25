export interface ISubject {
    id: string
    title: string
    full_title?: string
    url?: string
    alt_url?: string
    color: CSSStyleDeclaration['background']
    marks?: boolean
    unit?: string
}

export interface ISubjectsManifest {
    [key: string]: ISubject
}

export interface ITimetable {
    [key: number]: ISubject[]
}

export interface IWeek {
    [key: number]: IWeekDay
}

export interface IWeekDay {
    [key: number]: ILesson
}

export interface ILesson {
    id: string
    hw?: string
    link: string
    changedBy?: string
    last_change?: string
    attachments?: string[]
    danger?: boolean
    groups?: boolean
}

export interface IMarks {
    [key: string]: ISubjectMarks
}

export interface ISubjectMarks {
    [key: string]: IMark[]
}

export interface IMark {
    time: string
    mark: number
    isImportant: boolean
}
