import { useRouter } from "next/router";
import { useMemo, useEffect, useState } from "react";
import { Col, Row, Stack, Button, Form } from "react-bootstrap";
import ReactSelect from "react-select";
import { Tags, Note } from "../utils/types";
import EditTagsModal from "./editTagsModal";
import NoteCard from "./noteCard";
import ThemeIcon from "./icon";

type NoteListProp = {
  availableTags: Tags[];
  notes: Note[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

export function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProp) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={4} direction="horizontal">
            <ThemeIcon role={"button"} />
            <Button
              type="button"
              variant="primary"
              onClick={() => router.push("/new")}
            >
              Create
            </Button>

            <Button
              type="button"
              variant="outline-secondary"
              onClick={() => setEditTagsModalIsOpen(true)}
            >
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
                  className="darkModeFields"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Type something..."
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>

                <ReactSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
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
                  placeholder="Filter by tag"
                />
              </Form.Group>
            </Col>
          </Row>
        </Stack>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-2">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              tags={note.tags}
              date={note.date}
            />
          </Col>
        ))}
      </Row>

      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />
    </>
  );
}
