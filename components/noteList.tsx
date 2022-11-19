import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Col, Row, Stack, Button, Form } from "react-bootstrap";
import ReactSelect from "react-select";
import { Tags } from "../utils/types";

type NoteListProp = {
  availableTags: Tags[];
};
export function NoteList({ availableTags }: NoteListProp) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
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


    </>
  );
}
