import React from 'react';
import { getTypeModal } from '../../store/slices/selectors.js';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import { useCustomSelector } from '../../store/index.js';

const Modal = () => {
  const modals = {
    adding: AddChannel,
    removing: RemoveChannel,
    renaming: RenameChannel,
  };
  const type = useCustomSelector(getTypeModal);
  const CurrentComponent = modals[type];

  return (
    type && (
      <CurrentComponent />
    )
  );
};

export default Modal;
