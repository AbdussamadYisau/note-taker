import Head from 'next/head'
import Image from 'next/image'
import NoteForm from '../../components/noteForm'
import { NoteData , Tags,  Note} from "../../utils/types"

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void,
  onAddTag: (tag: Tags) => void,
  availableTags: Tags[],
  note: Note;
}


export default function EditNote({ onSubmit, onAddTag, note, availableTags }: EditNoteProps) {
  return (
    <>
    <h1 className="mb-4">Edit Note</h1>
    <NoteForm
      title={note.title}
      markdown={note.markdown}
      tags={note.tags}
      onSubmit={data => onSubmit(note.id, data)}
      onAddTag={onAddTag}
      availableTags={availableTags}
    />
  </>
  )
}
