export interface ISubject {
    id: string
    title: string
    full_title?: string
    url?: string
    alt_url?: string
    color: CSSStyleDeclaration['background']
    marks?: Boolean
}

export interface ISubjectsManifest {
    [key: string]: ISubject
}
