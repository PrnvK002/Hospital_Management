import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import MessageComponent from "../Components/MessageComponent/Message";
import io from "socket.io-client";
import Loader from "../Components/Loading/loader";



function ChatDoctor() {


  const userInfo = useSelector((state) => state.userLogin.data);
  const [messengers, setMessengers] = useState([]);

  //==================== setting socket io ====================


  //================= setting up =========================
  const chatData = useSelector((state) => state.chats);
  const { loading, error } = chatData;
  const [conversationId, setConversationId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    const newSocket = io(`http://wecaresocket.pranavkv.online`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {

    //====================== setting handlers ============
    const handleMessengers = (conversationData) => {
      conversationData = JSON.parse(conversationData);
      console.log(conversationData);

      setMessengers(conversationData.conversationData);
    }

    //=================== handling newly arrived messages ========
    const handleRecieveMessage = (newMessage) => {
      newMessage = JSON.parse(newMessage);
      console.log(newMessage);
      const msg = newMessage.response[0];
      setMessageData([...messageData,msg]);
    }

    //==================== handling chat response ===========
    const handleChatResponse = (chat) => {
      chat = JSON.parse(chat);
      console.log(chat);
      setMessageData([...chat]);
    }

    if (socket) {
      socket.emit('init', JSON.stringify({ userId: userInfo._id }));
      socket.emit('newMessengers', JSON.stringify({ id: userInfo._id }));
      socket.on('messengers', handleMessengers);
      socket.on('chatResponse', handleChatResponse);
      socket.on('recieveMessage', handleRecieveMessage);
    }
  }, [socket, userInfo._id]);

  //================ send message ===========
  const sendMessage = () => {
    let isDoctor = true;
    const msg = { from: userInfo.username, message: message };
    const arr = [msg];
    messageData.length > 0 ? setMessageData([...messageData, msg]) : setMessageData(arr);

    socket.emit(
      "message",
      JSON.stringify({ message, user: user, doctor: userInfo._id, isDoctor, conversationId })
    );
  };

  //============== getting user chats =========
  const getChat = (id, userId) => {
    console.log('getChat');
    setUser(userId);
    setConversationId(id);
    socket.emit('getChat', JSON.stringify({ id }));
  }

  //=============== 1 to 1 chat ============
  //========= conversation id => edit in array and project badge ================

  //==============================================================

  return (
    <>
      <Container>
        <h3 style={{ color: "#4D4C7D" }} className="text-center">
          {" "}
          Messages{" "}
        </h3>
        <Container className="d-flex justify-content-center align-items-center">
          <div
            style={{
              border: "1px solid #4D4C7D",
              height: "70vh",
              width: "70vw",
            }}
            className="d-flex"
          >
            <div
              style={{
                border: "1px solid #4D4C7D",
                width: "30%",
                margin: "0",
                padding: "0",
              }}
              className="viewDoctors"
            >
              {messengers ? (
                messengers.map((d) => {
                  return (
                    <div
                      style={{ height: "3rem", cursor: "pointer" }}
                      className="border text-center d-flex align-items-center justify-content-center"
                      key={d._id}
                    >
                      <p
                        className="mt-3"
                        onClick={() => {
                          getChat(d._id, d.user_id._id);
                        }}
                      >
                        {" "}
                        {d.user_id.user_name}{" "}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="color-danger text-center">No messages found</p>
              )}
            </div>
            <div
              style={{
                border: "1px solid #4D4C7D",
                width: "70%",
                position: "relative",
              }}
              className="viewChat"
            >
              {loading && <Loader />}
              {error && (
                <p style={{ color: "red", position: "absolute" }}>{error}</p>
              )}

              <Container style={{ height: '25.3rem', overflow: 'scroll' }} >
                {messageData
                  ? messageData.map((data) => {
                    return <MessageComponent {...data} key={data._id} />;
                  })
                  : ""}
              </Container>
              <div
                style={{
                  borderTop: " 1px solid  #4D4C7D",
                  height: "3rem",
                  width: "100%",
                  position: "relative",

                }}
                className="d-flex align-items-center"
              >
                <input
                  type="text"
                  style={{
                    position: "relative",
                    width: "70%",
                    left: "3rem",
                    outline: "none",
                    borderRadius: "10px",
                    padding: "3px",
                  }}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="btn-success"
                  style={{
                    zIndex: "10000",
                    position: "absolute",
                    right: "2rem",
                    borderRadius: "100%",
                    height: "2.5rem",
                    width: "3rem",
                    border: "none",
                  }}
                  onClick={sendMessage}
                >
                  <i className="bi bi-caret-right-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default ChatDoctor;
