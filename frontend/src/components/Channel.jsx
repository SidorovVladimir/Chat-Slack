import React from 'react';
import {
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channel = (props) => {
  const {
    currentChannelId,
    channel,
    showModal,
    handleSetCurrenChannel,
  } = props;
  const { t } = useTranslation();
  const variant = channel.id === currentChannelId ? 'secondary' : null;

  return (
    <li className="nav-item w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            variant={variant}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={() => handleSetCurrenChannel(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle split variant={variant} className="flex-grow-0">
            <span className="visually-hidden">
              {t('channelList.channelControl')}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('removing', channel.id)}>
              {t('channelList.delete')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('renaming', channel.id)}>
              {t('channelList.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          variant={variant}
          className="w-100 rounded-0 text-start"
          onClick={() => handleSetCurrenChannel(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};
export default Channel;
