import { useLocation, Navigate } from "react-router-dom";
// import useAuth from "../hooks/index.jsx";

// const ChatRoute = ({ children }) => {
//   console.log("ChatRoute, 5");
//   const auth = useAuth();
//   const location = useLocation();

//   return auth.loggedIn ? (
//     children
//   ) : (
//     <Navigate to="/login" state={{ from: location }} />
//   );
// };
const ChatRoute = ({ children }) => {
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem("userId"));

  return userId && userId.token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const ChatPage = () => {
  console.log("ChatPage", 6);
  return (
    <ChatRoute>
      <h1>Здесь будет чат</h1>
    </ChatRoute>
  );
};
export default ChatPage;
