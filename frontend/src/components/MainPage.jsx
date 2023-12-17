import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth.jsx";
import { fetchContent } from "../slices/channelsSlice.js";
import ChannelsList from "./ChannelsList.jsx";
import Chat from "./Chat.jsx";

const MainPage = () => {
  const auth = useAuth();
  const header = auth.getAuthHeader();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContent(header));
  }, [dispatch, header]);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsList />
        <Chat />
      </Row>
    </Container>
  );
};
export default MainPage;
