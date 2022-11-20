import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tags } from "../utils/types";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
    onSubmit : (data: NoteData) => void
    onAddTag: (tag: Tags) => void
    availableTags: Tags[]
} & Partial<NoteData>;

export default function NoteForm({onSubmit, onAddTag, availableTags, title = "", markdown= "", tags=[]} : NoteFormProps) {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tags[]>(tags);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
        title: titleRef.current!.value,
        markdown: markDownRef.current!.value,
        tags: selectedTags
    })
    router.push('/');
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
            <Col>
                <Form.Group controlId="title">
                    <Form.Label>
                        Title
                    </Form.Label>

                    <Form.Control ref={titleRef} required defaultValue={title} />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group controlId="tags">
                    <Form.Label>
                        Tags
                    </Form.Label>

                    <CreatableReactSelect
                    className="reactSelect"
                    value={selectedTags.map(tag => {
                        return {label: tag.label, value: tag.id }
                    })}
                    onCreateOption={label => {
                        const newTag = { id: uuidV4(), label }
                        onAddTag(newTag)
                        setSelectedTags(prev => [...prev, newTag])
                      }}

                    options={availableTags.map(tag => {
                        return { label: tag.label, value: tag.id }
                      })}
                    onChange={tags => {
                        setSelectedTags(
                            tags.map(t => {
                                return {label: t.label, id: t.value}
                            })
                        )
                    }}
                    
                    isMulti/>
                </Form.Group>
            </Col>
        </Row>

        <Form.Group controlId="markdown-note">
                    <Form.Label>
                        Note
                    </Form.Label>

                    <Form.Control required  as="textarea" rows={15} ref={markDownRef} defaultValue={markdown}/>
        </Form.Group>

        <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
                Save
            </Button>

            <Button type="button" variant="outline-secondary" onClick={() => router.back()}>
                Cancel
            </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
