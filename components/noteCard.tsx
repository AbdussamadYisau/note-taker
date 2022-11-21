import { useRouter } from "next/router";
import {
  Stack,
  Card,
  Badge,
} from "react-bootstrap";
import ReactSelect from "react-select";
import { Tags, Note } from "../utils/types";
import styles from "../styles/Card.module.css";
import EditTagsModal from "./editTagsModal";

type SimplifiedNote = {
  tags: Tags[];
  title: string;
  id: string;
  date?: string;
};

export default function NoteCard({ id, title, tags, date }: SimplifiedNote) {
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
              {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
          <span className="fs-6">{date}</span>
        </Stack>
      </Card.Body>
    </Card>
  );
}
