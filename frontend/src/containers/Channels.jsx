import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  setCurrentChannel,
} from '../store/slices/channelsSlice';
import { getChannels, getCurrentChannelId } from '../store/slices/selectors';
import { closeModal, openModal } from '../store/slices/modalsSlice';
import ModalComponent from './Modal.jsx';
import Channel from '../components/Channel.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const currentChannelId = useSelector(getCurrentChannelId);

  const handleSetCurrenChannel = (id) => {
    dispatch(setCurrentChannel(id));
  };

  const showModal = (type, id = null) => {
    dispatch(openModal({ type, id }));
  };
  const hideModal = () => {
    dispatch(closeModal());
  };

  const handleStatus = ({ status }) => {
    switch (status) {
      case 'Network error':
        toast.error(t('errors.networkError'));
        break;
      case 'ok':
        hideModal();
        break;
      default:
        toast.error(t('errors.unknownError'));
    }
  };

  return (
    <Col
      md={2}
      className="col-4 border-end px-0 bg-light flex-column h-100 d-flex"
    >
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channelList.channel')}</b>
        <Button
          className="p-0 text-primary"
          variant="group-vertical"
          onClick={() => showModal('adding')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {Object.values(channels.entities).map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            currentChannelId={currentChannelId}
            showModal={showModal}
            handleSetCurrenChannel={handleSetCurrenChannel}
          />
        ))}
      </ul>
      <ModalComponent handleStatus={handleStatus} hideModal={hideModal} />
    </Col>
  );
};

export default Channels;
