import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useChatApi from '../../hooks/useApi.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import {
  fetchContent,
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
} from '../../store/slices/channelsSlice.js';
import { addMessage } from '../../store/slices/messagesSlice';
import { getChannels } from '../../store/slices/selectors';
import Channels from '../../containers/Channels.jsx';
import ChatWindow from '../../containers/ChatWindow.jsx';

const ChatPage = () => {
  const { t } = useTranslation();
  const apiChat = useChatApi();
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    const handleNewMessage = (payload) => {
      dispatch(addMessage(payload));
    };

    const handleNewChannel = (payload) => {
      toast.success(t('channelList.channelCreated'));
      dispatch(addChannel(payload));
      if (payload.author === currentUser) {
        dispatch(setCurrentChannel(payload.id));
      }
    };
    const handleRemoveChannel = (payload) => {
      toast.success(t('channelList.channelRemoved'));
      dispatch(removeChannel(payload.id));
      if (payload.id === channels.currentChannelId) {
        dispatch(setCurrentChannel(channels.defaultChannelId));
      }
    };
    const handleRenameChannel = (payload) => {
      toast.success(t('channelList.channelRenamed'));
      dispatch(renameChannel(payload));
    };

    apiChat.socket.on('newMessage', handleNewMessage);
    apiChat.socket.on('newChannel', handleNewChannel);
    apiChat.socket.on('removeChannel', handleRemoveChannel);
    apiChat.socket.on('renameChannel', handleRenameChannel);

    return () => {
      apiChat.socket.off('newMessage', handleNewMessage);
      apiChat.socket.off('newChannel', handleNewChannel);
      apiChat.socket.off('removeChannel', handleRemoveChannel);
      apiChat.socket.off('renameChannel', handleRenameChannel);
    };
  }, [apiChat.socket, dispatch, channels, currentUser, t]);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <ChatWindow />
      </Row>
    </Container>
  );
};
export default ChatPage;
