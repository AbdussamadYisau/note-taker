import Head from 'next/head'
import Image from 'next/image'
import { NoteList } from '../components/noteList'
import styles from '../styles/Home.module.css'
import useLocalStorage from '../utils/hooks/useLocalStorage'
import { Tags } from '../utils/types'

export default function Home() {
  const [tags, setTags] = useLocalStorage<Tags[]>("TAGS", []);
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
          />
        
      </main>

    
    </div>
  )
}
