
import {  Stack, Button, Form,  Modal} from "react-bootstrap";

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

type ReminderModalProps = {
    show: boolean
    handleClose: () => void
  }

export default function ReminderModal({

    handleClose,
    show,
  }: ReminderModalProps) {
    return (
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Select Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Stack>
              <Datetime
                open={true}
              />
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }