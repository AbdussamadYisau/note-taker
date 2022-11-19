import Head from 'next/head'
import Image from 'next/image'
import { useMemo,useState, useEffect } from 'react'
import { NoteList } from '../components/noteList'
import styles from '../styles/Home.module.css'
import useLocalStorage from '../utils/hooks/useLocalStorage'
import { Tags, RawNote} from '../utils/types'


export default function Home() {
  const [tags, setTags] = useLocalStorage<Tags[]>("TAGS", []);
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

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
        <meta name="description" content="Advanced Note Taker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main 
      // className={styles.main}
      className='my-4'
      >
          <NoteList 
          availableTags={tags}
          notes={notesWithTags}
          />
        
      </main>

    
    </div>
  )
  }
}
