import React, { Component } from "react";
import { PostData } from "../postdata";
import faceImage from '../adminImages/faces/face8.jpg';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Header from '../components/Header';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdetails: [],
      text: "",
      replys: [],
      selectedUser: null,
      messagesLoaded: false,
    };
  }

  componentDidMount() {
    const UserID = parseInt(sessionStorage.getItem('UserID'));
    console.log("UserID:", UserID);

    // Load messages for the selected user when the component mounts
    if (this.state.selectedUser) {
      this.loadMessages(this.state.selectedUser.ID);
    }

    // Append the "ID" parameter to the URL
    const url = `https://example.com/api/chathome.php?ID=${UserID}`;

    PostData({}, url).then(result => {
      let responseJson = result;
      console.log("User details response:", responseJson);
      if (responseJson.status === "success") {
        this.setState({ userdetails: responseJson.data });
      } else {
        console.error("Failed to fetch user details.");
        // Optionally, you can add code here to show an error message to the user
        // and reload the page if needed.
      }
    }).catch(error => {
      console.error("Error fetching user details:", error);
      // Optionally, you can add code here to show an error message to the user
      // and reload the page if needed.
    });
  }

  onUserSelect = user => {
    // Clear messages and set the selected user
    this.setState({
      selectedUser: user,
      replys: [],
      messagesLoaded: false,
    });

    // Load messages using the newly selected user's ID
    this.loadMessages(user.ID);
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  handleSendMessage = () => {
    this.sendMessage();
  };

  sendMessage() {
    const selectedUser = this.state.selectedUser;
    if (!selectedUser) {
      console.log("No user selected.");
      return;
    }

    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();

    const UserID = parseInt(sessionStorage.getItem('UserID'));
    var saveData = new FormData();
    saveData.append("to_id", selectedUser.ID);
    saveData.append("message", this.state.text);
    saveData.append("from_id", UserID);
    saveData.append("datetime", date);
    PostData(saveData, "https://example.com/api/msg.php")
      .then(result => {
        let resultJSON = result;
        if (resultJSON.status === "success") {
          this.setState({ text: "" }); // Clear the input field after sending the message
          this.loadMessages(selectedUser.ID);
        } else {
          console.error("Failed to send message.");
          // Optionally, you can add code here to show an error message to the user
          // and reload the page if needed.
        }
      }).catch(error => {
        console.error("Error sending message:", error);
        // Optionally, you can add code here to show an error message to the user
        // and reload the page if needed.
      });
  }

  loadMessages(to_id) {
    if (!to_id) {
      console.log("No user selected.");
      return;
    }

    const UserID = parseInt(sessionStorage.getItem('UserID'));
    var saveData = new FormData();
    saveData.append("to_id", to_id);
    saveData.append("message", "");
    saveData.append("from_id", UserID);
    saveData.append("datetime", "");
    PostData(saveData, "https://example.com/api/msg.php")
      .then(result => {
        let resultJSON = result;
        if (resultJSON.status === "success") {
          const reversedMessages = resultJSON.data.reverse();
          this.setState({ replys: reversedMessages, messagesLoaded: true });
        } else {
          console.error("Failed to load messages.");
          // Optionally, you can add code here to show an error message to the user
          // and reload the page if needed.
        }
      }).catch(error => {
        console.error("Error loading messages:", error);
        // Optionally, you can add code here to show an error message to the user
        // and reload the page if needed.
      });
  }

  render() {
    const UserID = parseInt(sessionStorage.getItem('UserID'));
    const selectedUser = this.state.selectedUser;
  
    const logout = () => {
      sessionStorage.setItem("UserID", "");
      sessionStorage.clear();
    };
  
    // Log selectedUser, UserID, and check conditions
    console.log("selectedUser:", selectedUser);
    console.log("UserID:", UserID);
    console.log("Checking conditions...");
  
    return (
      <div>
        <Header />
        <div className='chat-whole-parent' >
          <div className="row justify_content_center h-100">
            <div className="col-md-4 col-xl-3 chat">
              <div className="chat-card mb-sm-3 mb-md-0 contacts_c ard">
                <div className="card-header">
                  <div className="input-group">
                    <button
                      id="logout"
                      type="button"
                      className="btn btn-warning btn-sm"
                      onClick={logout}
                    >
                      <CustomLink to="/" style={{ listStyleType: 'none', color: '#FFFFFF' }}>Logout</CustomLink>
                    </button>
                  </div>
                </div>
                <div className="card-body contacts_body">
                  <ul className="contacts">
                    {this.state.userdetails.map(user => (
                      <li
                        className={`user-item ${
                          this.state.selectedUser && user.ID === this.state.selectedUser.ID ? "chat-active" : ""
                          }`}
                        key={user.ID}
                        onClick={() => this.onUserSelect(user)}
                      >
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img
                              alt=""
                              src={faceImage}
                              className="rounded-circle user_img"
                            />
                            <span className="online_icon" />
                          </div>
                          <div className="user_info">
                            <span>{user.FirstName}</span>
                            <p>{user.UserType}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer" />
              </div>
            </div>
            <div className="col-md-8 col-xl-6 chat">
              <div>
                <div className="chat-card">
                  <div className="card-header msg_head">
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img
                          alt=""
                          src={faceImage}
                          className="rounded-circle user_img"
                        />
                        <span className="online_icon" />
                      </div>
                      <div className="user_info">
                        <span>
                          Chat with {selectedUser && selectedUser.FirstName}
                        </span>
                        <p>{selectedUser && selectedUser.UserType}</p>
                      </div>
                      <div className="video_cam">
                        <span>
                          <i className="fas fa-video" />
                        </span>
                        <span>
                          <i className="fas fa-phone" />
                        </span>
                      </div>
                    </div>
                    <span id="action_menu_btn">
                      <i className="fas fa-ellipsis-v" />
                    </span>
                  </div>
                  <div className="card-body msg_card_body">
                    {this.state.messagesLoaded ? (
                      this.state.replys.map((u, key1) => {
                        console.log(
                          "Condition 1:",
                          selectedUser &&
                            selectedUser.ID === u.to_id &&
                            UserID === u.from_id
                        );
                        console.log(
                          "selectedUser",
                          selectedUser
                        );
                        console.log(
                          "selectedUser.ID",
                            selectedUser.ID
                        );
                        console.log(
                          "u.to_id",
                          u.to_id 
                        );
                        console.log(
                          "UserID",
                            UserID
                        );                        console.log(
                          "u.from_id",
                          u.from_id
                        );
                        console.log(
                          "Condition 2:",
                          selectedUser && selectedUser.ID === u.from_id
                        );
                        return selectedUser && selectedUser.ID === u.to_id &&
                          UserID === u.from_id ? (
                            <div
                              key={key1}
                              className="d-flex justify_content_end mb-4"
                              style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', margin: '2px 0' }}
                            >
                              <div className="msg_cotainer_send" style={{ textAlign: "right" }}>
                                {u.message}
                                <span className="msg_time_send" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '100px' }}>
                                  {u.datetime}
                                </span>
                              </div>
                              <div className="img_cont_msg">
                                <img
                                  alt=""
                                  src={faceImage}
                                  className="rounded_circle user_img_msg"
                                />
                              </div>
                            </div>
                          ) : (
                            selectedUser && selectedUser.ID === u.from_id ? (
                              <div
                                key={key1}
                                className="d-flex justify_content_start mb-4"
                              >
                                <div className="img_cont_msg">
                                  <img
                                    alt=""
                                    src={faceImage}
                                    className="rounded_circle user_img_msg"
                                  />
                                </div>
                                <div className="msg_cotainer" style={{ textAlign: "left" }}>
                                  {u.message}
                                  <span className="msg_time" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '100px' }}>
                                    {u.datetime}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                          );
                      })
                    ) : (
                        <div className="text-center" style={{ color: 'red', fontWeight: 'bold' }}> ← No User Selected ••• OR ••• No Messages with Selected User</div>
                      )}
                  </div>
                  <div className="card-footer">
                    <div className="input_group">
                      <div className="input-group-append">
                        <span className="input-group_text attach_btn">
                          <i className="fas fa-paperclip" />
                        </span>
                      </div>
                      <textarea
                        name=""
                        className="form_control type_msg"
                        onKeyDown={this.OnstartChat}
                        onChange={this.handleChange}
                        value={this.state.text}
                        placeholder="Type your message..."
                      />
                      <div className="input-group_append">
                        <span className="input-group_text send_btn">
                          <i className="fas fa-location-arrow" />
                        </span>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={this.handleSendMessage}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}  

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Chat;
