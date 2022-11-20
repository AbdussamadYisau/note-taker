import Head from 'next/head'
import { useMemo,useState, useEffect } from 'react'
import { NoteList } from '../components/noteList'
import styles from '../styles/Home.module.css'
import useLocalStorage from '../utils/hooks/useLocalStorage'
import { Tags, RawNote} from '../utils/types'
import { useTheme } from 'next-themes'





export default function Home() {
  const [tags, setTags] = useLocalStorage<Tags[]>("TAGS", []);
  const [notes] = useLocalStorage<RawNote[]>("NOTES", []);
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {

  return (
    <div className={styles.container}>
      <Head>
        <title>Note Taker</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="Advanced Note Taker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main 
      className='my-4'
      >
          <NoteList 
          availableTags={tags}
          notes={notesWithTags}
          onUpdateTag={updateTag}
          onDeleteTag={deleteTag}
          />
        
      </main>

    
    </div>
  )
  }
}
