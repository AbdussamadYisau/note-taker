import ShowNote from "../../screens/showNote/showNote";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { Tags, RawNote} from '../../utils/types'
import { useRouter } from 'next/router'
import { useMemo } from "react";


export default function index() {
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<Tags[]>("TAGS", []);

    const router = useRouter()
    const { id } = router.query

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
          return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
        })
      }, [notes, tags])

    const note = notesWithTags.find(n => n.id === id);
    if (!note) return <p> Doesn't exist</p>
    return <ShowNote note={note}/>

}
