import EditNote from "../../screens/editNote/editNote";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { Tags, RawNote,NoteData} from '../../utils/types'
import { useRouter } from 'next/router'
import { useMemo } from "react";


export default function index() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<Tags[]>("TAGS", []);
    function addTag(tag: Tags) {
      setTags(prev => [...prev, tag])
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

    const router = useRouter()
    const { id } = router.query

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
          return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
        })
      }, [notes, tags])

      const note = notesWithTags.find(n => n.id === id);

    if (!note) return <p> Doesn't exist</p>

    return (
     <EditNote note={note} availableTags={tags} onAddTag={addTag} onSubmit={onUpdateNote} />
    )
  }
  