import React, {  useState } from "react";
import AuthPage from "./AuthPage.jsx";
import ChatsPage from "./ChatsPage.jsx";

function Message() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default Message;
