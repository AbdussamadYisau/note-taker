import { useMemo } from "react"
import NoteForm from "../../components/noteForm"
import useLocalStorage from "../../utils/hooks/useLocalStorage"
import { RawNote, Tags, NoteData } from "../../utils/types"
import { v4 as uuidV4 } from "uuid"


export default function NewNote() {
  
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tags[]>("TAGS", []);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  function addTag(tag: Tags) {
    setTags(prev => [...prev, tag])
  }



  return (
    <div className='my-4 mx-4'>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onCreateNote} 
      onAddTag={addTag}
      availableTags={tags}
      />
    </div>
  )
}
