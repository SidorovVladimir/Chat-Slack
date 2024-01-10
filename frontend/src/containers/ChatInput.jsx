import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LeoProfanity from 'leo-profanity';
import useAuth from '../hooks/useAuth';
import { getCurrentChannelId } from '../store/slices/selectors';
import useChatApi from '../hooks/useApi';
import { chatInputSchema } from '../utils/validationShemas';

const ChatInput = () => {
  const { t } = useTranslation();
  const apiChat = useChatApi();
  const { currentUser: username } = useAuth();
  const inputRef = useRef();
  const channelId = useSelector(getCurrentChannelId);

  const handleStatus = ({ status }, resetForm) => {
    if (status === 'ok') {
      resetForm();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [channelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: chatInputSchema,
    onSubmit: (values) => {
      const filteredMessage = LeoProfanity.clean(values.body);
      const newMessage = {
        body: filteredMessage,
        channelId,
        username,
      };
      apiChat.addNewMessage(newMessage, handleStatus, formik.resetForm);
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        onSubmit={formik.handleSubmit}
        className="py-1 border rounded-2"
      >
        <div className="input-group has-validation">
          <Form.Control
            ref={inputRef}
            name="body"
            aria-label={t('messageForm.labelNewMessage')}
            placeholder={t('messageForm.labelMessage')}
            className="border-0 p-0 ps-2 form-control"
            value={formik.values.body}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
            variant="group-vertical"
            style={{ border: 'none' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
            <span className="visually-hidden">
              {t('messageForm.buttonSend')}
            </span>
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default ChatInput;
