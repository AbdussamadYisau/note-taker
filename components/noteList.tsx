import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { Col, Row, Stack, Button, Form, Card , Badge} from "react-bootstrap";
import ReactSelect from "react-select";
import { Tags, Note } from "../utils/types";
import styles from "../styles/Card.module.css"

type SimplifiedNote = {
    tags: Tags[]
    title: string
    id: string
  }

  
type NoteListProp = {
  availableTags: Tags[];
  notes: Note[]
};

function NoteCard({ id, title, tags }: SimplifiedNote) {
  const router = useRouter();
    return (
      <Card
        className={`h-100 text-reset text-decoration-none ${styles.card}`}
        onClick={() => router.push(`/${id}`)}
        
      >
        <Card.Body>
          <Stack
            gap={2}
            className="align-items-center justify-content-center h-100"
          >
            <span className="fs-5">{title}</span>
            {tags.length > 0 && (
              <Stack
                gap={1}
                direction="horizontal"
                className="justify-content-center flex-wrap"
              >
                {tags.map(tag => (
                  <Badge className="text-truncate" key={tag.id}>
                    {tag.label}
                  </Badge>
                ))}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card>
    )
  }

export function NoteList({ availableTags, notes }: NoteListProp) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Button
              type="button"
              variant="primary"
              onClick={() => router.push("/new")}
            >
              Create
            </Button>

            <Button type="button" variant="outline-secondary">
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Stack gap={4}>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>

                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>

                <ReactSelect
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((t) => {
                        return { label: t.label, id: t.value };
                      })
                    );
                  }}
                  isMulti
                />
              </Form.Group>
            </Col>
          </Row>
        </Stack>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-2">

        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>

    </>
  );
}
