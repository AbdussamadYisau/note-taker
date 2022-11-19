import { useRouter } from "next/router"
import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import { Note } from "../../utils/types"



type NoteProps = {
  note: Note,
  onDelete : (id: string) => void
}

export default function ShowNote({note, onDelete} :NoteProps) {
  const router = useRouter();
  return (
    <div className="my-4 mx-4">
    <Row className="align-items-center mb-4">
      <Col>
        <h1>{note.title}</h1>
        {note.tags.length > 0 && (
          <Stack gap={1} direction="horizontal" className="flex-wrap">
            {note.tags.map(tag => (
              <Badge className="text-truncate" key={tag.id}>
                {tag.label}
              </Badge>
            ))}
          </Stack>
        )}
      </Col>
      <Col xs="auto">
        <Stack gap={2} direction="horizontal">
       
            <Button variant="primary">Edit</Button>
 
          <Button

            variant="outline-danger"
            onClick={() => {
              onDelete(note.id);
              router.push('/')
            }}
          >
            Delete
          </Button>
            <Button variant="outline-secondary" onClick={() => router.back()}>Back</Button>
     
        </Stack>
      </Col>
    </Row>
    <ReactMarkdown>{note.markdown}</ReactMarkdown>

  </div>
  )
}
