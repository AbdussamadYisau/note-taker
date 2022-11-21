import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tags } from "../utils/types";
import { v4 as uuidV4 } from "uuid";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import useLocalStorage from "../utils/hooks/useLocalStorage";


const yesterday = moment().subtract(1, "day");
const valid = function (current: object | any) {
  return current.isAfter(yesterday);
};

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tags) => void;
  availableTags: Tags[];
} & Partial<NoteData>;

export default function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  date = "",
  tags = [],
}: NoteFormProps) {
  const router = useRouter();
  const { id } = router.query;

  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tags[]>(tags);
  const [tagStorage, setTags] = useLocalStorage<Tags[]>("TAGS", []);
  let inputProps = {
    placeholder: "Choose a date and time",
    ref: dateRef,
    // className: 'darkModeFields'
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tags: selectedTags,
      date: dateRef.current!.value,
    });

    for (let index = 0; index < selectedTags.length; index++) {
      const label = selectedTags[index];
      const tagExistsAlready = tagStorage.filter((tag) => 
      tag.id === selectedTags[index].id && tag.label === selectedTags[index].label );

      if (Object.keys(tagExistsAlready).length === 0) {
        onAddTag(label)
      }
    }

    if (id) {
      router.push(`/${id}`);
    } else {
      router.push("/");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>

              <Form.Control
                ref={titleRef}
                required
                defaultValue={title}
                className="darkModeFields"
                placeholder="Name of task/note"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>

              <CreatableReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };

                  setSelectedTags((prev) => [...prev, newTag]);
                }}
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
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Create/choose a tag"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="markdown-note">
          <Form.Label>Note</Form.Label>

          <Form.Control
            required
            as="textarea"
            rows={15}
            ref={markDownRef}
            defaultValue={markdown}
            className="darkModeFields"
          />
        </Form.Group>

        <Form.Group controlId="reminder-date">
          <Form.Label>Reminder?</Form.Label>
          <Datetime
            isValidDate={valid}
            inputProps={inputProps}
            dateFormat="DD/MM/YY"
            initialValue={date}
          />
        </Form.Group>

        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>

          <Button
            type="button"
            variant="outline-secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
