import { useContext } from 'react';

import { ApiContext } from '../contexts/ApiContext';

const useChatApi = () => useContext(ApiContext);

export default useChatApi;
