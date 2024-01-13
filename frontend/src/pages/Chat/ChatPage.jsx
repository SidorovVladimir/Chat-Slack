import React, { useEffect } from 'react';
import {
  Container, Row, Spinner, Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useChatApi from '../../hooks/useApi.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import routes from '../../utils/routes.js';
import { getChannels, getLoadingStatus } from '../../store/slices/selectors';
import Channels from '../../containers/Channels.jsx';
import ChatWindow from '../../containers/ChatWindow.jsx';
import {
  useCustomSelector,
  useCustomDispatch,
  wrapAddMessage,
  wrapSetCurrentChannel,
  wrapAddChannel,
  wrapRemoveChannel,
  wrapRenameChannel,
  getContentFromServer,
} from '../../store/index.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const apiChat = useChatApi();
  const { currentUser, logOut } = useAuth();
  const dispatch = useCustomDispatch();
  const channels = useCustomSelector(getChannels);
  const loadingStatus = useCustomSelector(getLoadingStatus);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getContentFromServer());
      } catch (e) {
        logOut();
        navigate(routes.login());
      }
    };
    fetchData();
  }, [dispatch, logOut, navigate]);

  useEffect(() => {
    const handleAddMessage = (payload) => {
      dispatch(wrapAddMessage(payload));
    };

    const handleAddChannel = (payload) => {
      toast.success(t('channelList.channelCreated'));
      dispatch(wrapAddChannel(payload));
      if (payload.author === currentUser) {
        dispatch(wrapSetCurrentChannel(payload.id));
      }
    };
    const handleRemoveChannel = (payload) => {
      toast.success(t('channelList.channelRemoved'));
      dispatch(wrapRemoveChannel(payload.id));
      if (payload.id === channels.currentChannelId) {
        dispatch(wrapSetCurrentChannel(channels.defaultChannelId));
      }
    };
    const handleRenameChannel = (payload) => {
      toast.success(t('channelList.channelRenamed'));
      dispatch(wrapRenameChannel(payload));
    };

    apiChat.socket.on('newMessage', handleAddMessage);
    apiChat.socket.on('newChannel', handleAddChannel);
    apiChat.socket.on('removeChannel', handleRemoveChannel);
    apiChat.socket.on('renameChannel', handleRenameChannel);

    return () => {
      apiChat.socket.off('newMessage', handleAddMessage);
      apiChat.socket.off('newChannel', handleAddChannel);
      apiChat.socket.off('removeChannel', handleRemoveChannel);
      apiChat.socket.off('renameChannel', handleRenameChannel);
    };
  }, [apiChat.socket, dispatch, channels, currentUser, t]);
  return loadingStatus === 'loading' ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Button variant="light" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {' '}
        {t('chat.loading')}
      </Button>
    </div>
  ) : (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <ChatWindow />
      </Row>
    </Container>
  );
};
export default ChatPage;
