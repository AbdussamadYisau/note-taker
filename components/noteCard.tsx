import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { Col, Row, Stack, Button, Form, Card , Badge, Modal} from "react-bootstrap";
import ReactSelect from "react-select";
import { Tags, Note } from "../utils/types";
import styles from "../styles/Card.module.css"
import EditTagsModal from "./editTagsModal";

type SimplifiedNote = {
    tags: Tags[]
    title: string
    id: string
  }


export default function NoteCard({ id, title, tags }: SimplifiedNote) {
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