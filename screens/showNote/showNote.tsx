import { useRouter } from "next/router";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Note } from "../../utils/types";
import gfm from "remark-gfm";

type NoteProps = {
  note: Note;
  onDelete: (id: string) => void;
};

export default function ShowNote({ note, onDelete }: NoteProps) {
  const router = useRouter();
  return (
    <div className="my-4 mx-4">
      <Row className="align-items-center mb-4">
        <Col className="mb-4">
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Button
              variant="primary"
              onClick={() => {
                router.push(`/${note.id}/edit`);
              }}
            >
              Edit
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => {
                onDelete(note.id);
                router.push("/");
              }}
            >
              Delete
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => router.push("/")}
            >
              Back
            </Button>
          </Stack>
        </Col>
        <p className="mt-4">{note.date}</p>
      </Row>
      <ReactMarkdown remarkPlugins={[gfm]} className="show-note">
        {note.markdown}
      </ReactMarkdown>
    </div>
  );
}
