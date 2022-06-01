import React, { useEffect, useState } from "react";
import { Container} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDoctorsOfDepartments } from "../state/reducers/userDataReducer";
import Loader from "../Components/Loading/loader";
import { getAllMessages } from "../state/reducers/chatReducer";
import MessageComponent from "../Components/MessageComponent/Message";
import io from "socket.io-client";

function  Chat() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userInfo = useSelector((state) => state.userLogin.data);
  const doctorData = useSelector((state) => state.usersData);
  const { data } = doctorData;
  useEffect(() => {
    dispatch(getDoctorsOfDepartments(id));
  }, [dispatch, id]);

  //============ handling chat ====================
  const [doctor, setDoctor] = useState();
  const [socket, setSocket] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const chatData = useSelector((state) => state.chats);
  const { messages, loading, error } = chatData;

  //================ send message ===========
  const sendMessage = () => {
    let isDoctor = false;
    let temp = { from: userInfo.username, message: message };
    const arr = [temp];
    messageData ? setMessageData([...messageData,temp]) : setMessageData(arr);     
    if (doctor) {
      socket.emit(
        "message",
        JSON.stringify({ message, user: userInfo._id, doctor, isDoctor, conversationId })
      );
      setMessage('');
    }
  };

  //========== get chat ================
  //=============== handling functions =========
  const handleRecieveMessage = (newMessage) => {
    newMessage = JSON.parse(newMessage);
    const {response} = newMessage;
    const msg = response[0];
    setMessageData((prevState)=> [...prevState,msg]);
  }

  const handleConversationId = (data) => {
    data = JSON.parse(data);
    setConversationId(data.conversationId);
  }

  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {

    if (socket) {
      socket.emit('init', JSON.stringify({ userId: userInfo._id }))
      socket.on('recieveMessage', handleRecieveMessage);
      socket.on('conversationId', handleConversationId);
    }
  }, [socket,userInfo._id])

  const getChat = (id) => {
    console.log('-getchat-');
    setDoctor(id);
    setConversationId(null);
    dispatch(getAllMessages(id));
    setMessageData(messages);
  };



  return (
    <>
      <Container>
        <h3 style={{ color: "#4D4C7D" }} className="text-center">
          {" "}
          Chat With Doctor{" "}
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
              {data.length > 0 ? (
                data.map((d) => {
                  return (
                    <div
                      key={d._user_id}
                      style={{ height: "3rem", cursor: "pointer" }}
                      className="border d-flex align-items-center justify-content-center"
                    >
                      <p
                        className="mt-3"
                        onClick={() => {
                          getChat(d._id);
                        }}
                      >
                        {" "}
                        {d.user_name}{" "}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="color-danger">No doctors found</p>
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

              <Container style={{ height: '23.3rem', overflow: 'scroll' }}>
                {messageData.length > 0
                  ? messageData.map((data) => {
                    return <MessageComponent {...data} key={data._id} />;
                  })
                  : ""}
              </Container>
              <div
                style={{
                  borderTop: " 1px solid  #4D4C7D",
                  height: "auto",
                  width: "100%",
                  position: "relative",

                }}
                className="d-flex align-items-center p-2"
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
                  value={message}
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

export default Chat;
