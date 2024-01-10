import React from 'react';
import { useSelector } from 'react-redux';
import { getTypeModal } from '../../store/slices/selectors.js';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const Modal = () => {
  const modals = {
    adding: AddChannel,
    removing: RemoveChannel,
    renaming: RenameChannel,
  };
  const type = useSelector(getTypeModal);
  const CurrentComponent = modals[type];

  return (
    type && (
      <CurrentComponent />
    )
  );
};

export default Modal;
