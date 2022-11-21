
export type Note = {
    id: string
} & NoteData;
export type NoteData = {
    title: string,
    markdown: string,
    tags: Tags[],
    date? : string
}

export type Tags = {
    id: string,
    label: string
}

export type RawNote = {
    id: string
} & RawNoteData;

export type RawNoteData = {
    title: string,
    markdown: string,
    tagIds: string[] 
}

