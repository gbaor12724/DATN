import React from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
const HeaderRight = ()=>{
   return (
      <nav className="be-right-sidebar">
         <div className="sb-content">
            <div className="tab-navigation">
               <ul className="nav nav-tabs nav-justified" role="tablist">
               <li className="nav-item" role="presentation">
                  <a
                     className="nav-link active"
                     href="#tab1"
                     aria-controls="tab1"
                     role="tab"
                     data-toggle="tab"
                  >
                     Chat
                  </a>
               </li>
               <li className="nav-item" role="presentation">
                  <a
                     className="nav-link"
                     href="#tab2"
                     aria-controls="tab2"
                     role="tab"
                     data-toggle="tab"
                  >
                     Todo
                  </a>
               </li>
               <li className="nav-item" role="presentation">
                  <a
                     className="nav-link"
                     href="#tab3"
                     aria-controls="tab3"
                     role="tab"
                     data-toggle="tab"
                  >
                     Settings
                  </a>
               </li>
               </ul>
            </div>
            <div className="tab-panel">
               <div className="tab-content">
               <div className="tab-pane tab-chat active" id="tab1" role="tabpanel">
                  <div className="chat-contacts">
                     <div className="chat-sections">
                     <div className="be-scroller-chat">
                        <div className="content">
                           <h2>Recent</h2>
                           <div className="contact-list contact-list-recent">
                           <div className="user">
                              <a href="#">
                                 <img src="assets\img\avatar1.png" alt="Avatar" />
                                 <div className="user-data">
                                 <span className="status away" />
                                 <span className="name">Claire Sassu</span>
                                 <span className="message">Can you share the...</span>
                                 </div>
                              </a>
                           </div>
                           <div className="user">
                              <a href="#">
                                 <img src="assets\img\avatar2.png" alt="Avatar" />
                                 <div className="user-data">
                                 <span className="status" />
                                 <span className="name">Maggie jackson</span>
                                 <span className="message">I confirmed the info.</span>
                                 </div>
                              </a>
                           </div>
                           <div className="user">
                              <a href="#">
                                 <img src="assets\img\avatar3.png" alt="Avatar" />
                                 <div className="user-data">
                                 <span className="status offline" />
                                 <span className="name">Joel King </span>
                                 <span className="message">
                                    Ready for the meeti...
                                 </span>
                                 </div>
                              </a>
                           </div>
                           </div>
                           <h2>Contacts</h2>
                           <div className="contact-list">
                           <div className="user">
                              <a href="#">
                                 <img src="assets\img\avatar4.png" alt="Avatar" />
                                 <div className="user-data2">
                                 <span className="status" />
                                 <span className="name">Mike Bolthort</span>
                                 </div>
                              </a>
                           </div>
                           <div className="user">
                              <a href="#">
                                 <img src="assets\img\avatar5.png" alt="Avatar" />
                                 <div className="user-data2">
                                 <span className="status" />
                                 <span className="name">Maggie jackson</span>
                                 </div>
                              </a>
                           </div>
                           <div className="user">
                              <a href="#">
                                 <img src="assets\img\avatar6.png" alt="Avatar" />
                                 <div className="user-data2">
                                 <span className="status offline" />
                                 <span className="name">Jhon Voltemar</span>
                                 </div>
                              </a>
                           </div>
                           </div>
                        </div>
                     </div>
                     </div>
                     <div className="bottom-input">
                     <input type="text" placeholder="Search..." name="q" />
                     <span className="mdi mdi-search" />
                     </div>
                  </div>
                  <div className="chat-window">
                     <div className="title">
                     <div className="user">
                        <img src="assets\img\avatar2.png" alt="Avatar" />
                        <h2>Maggie jackson</h2>
                        <span>Active 1h ago</span>
                     </div>
                     <span className="icon return mdi mdi-chevron-left" />
                     </div>
                     <div className="chat-messages">
                     <div className="be-scroller-messages">
                        <div className="content">
                           <ul>
                           <li className="friend">
                              <div className="msg">Hello</div>
                           </li>
                           <li className="self">
                              <div className="msg">Hi, how are you?</div>
                           </li>
                           <li className="friend">
                              <div className="msg">
                                 Good, I'll need support with my pc
                              </div>
                           </li>
                           <li className="self">
                              <div className="msg">
                                 Sure, just tell me what is going on with your computer?
                              </div>
                           </li>
                           <li className="friend">
                              <div className="msg">
                                 I don't know it just turns off suddenly
                              </div>
                           </li>
                           </ul>
                        </div>
                     </div>
                     </div>
                     <div className="chat-input">
                     <div className="input-wrapper">
                        <span className="photo mdi mdi-camera" />
                        <input
                           type="text"
                           placeholder="Message..."
                           name="q"
                           autoComplete="off"
                        />
                        <span className="send-msg mdi mdi-mail-send" />
                     </div>
                     </div>
                  </div>
               </div>
               <div className="tab-pane tab-todo" id="tab2" role="tabpanel">
                  <div className="todo-container">
                     <div className="todo-wrapper">
                     <div className="be-scroller-todo">
                        <div className="todo-content">
                           <span className="category-title">Today</span>
                           <ul className="todo-list">
                           <li>
                              <div className="custom-checkbox custom-control custom-control-sm">
                                 <span className="delete mdi mdi-delete" />
                                 <input
                                 className="custom-control-input"
                                 type="checkbox"
                                 defaultChecked=""
                                 id="tck1"
                                 />
                                 <label className="custom-control-label" htmlFor="tck1">
                                 Initialize the project
                                 </label>
                              </div>
                           </li>
                           <li>
                              <div className="custom-checkbox custom-control custom-control-sm">
                                 <span className="delete mdi mdi-delete" />
                                 <input
                                 className="custom-control-input"
                                 type="checkbox"
                                 id="tck2"
                                 />
                                 <label className="custom-control-label" htmlFor="tck2">
                                 Create the main structure{" "}
                                 </label>
                              </div>
                           </li>
                           <li>
                              <div className="custom-checkbox custom-control custom-control-sm">
                                 <span className="delete mdi mdi-delete" />
                                 <input
                                 className="custom-control-input"
                                 type="checkbox"
                                 id="tck3"
                                 />
                                 <label className="custom-control-label" htmlFor="tck3">
                                 Updates changes to GitHub{" "}
                                 </label>
                              </div>
                           </li>
                           </ul>
                           <span className="category-title">Tomorrow</span>
                           <ul className="todo-list">
                           <li>
                              <div className="custom-checkbox custom-control custom-control-sm">
                                 <span className="delete mdi mdi-delete" />
                                 <input
                                 className="custom-control-input"
                                 type="checkbox"
                                 id="tck4"
                                 />
                                 <label className="custom-control-label" htmlFor="tck4">
                                 Initialize the project{" "}
                                 </label>
                              </div>
                           </li>
                           <li>
                              <div className="custom-checkbox custom-control custom-control-sm">
                                 <span className="delete mdi mdi-delete" />
                                 <input
                                 className="custom-control-input"
                                 type="checkbox"
                                 id="tck5"
                                 />
                                 <label className="custom-control-label" htmlFor="tck5">
                                 Create the main structure{" "}
                                 </label>
                              </div>
                           </li>
                           <li>
                              <div className="custom-checkbox custom-control custom-control-sm">
                                 <span className="delete mdi mdi-delete" />
                                 <input
                                 className="custom-control-input"
                                 type="checkbox"
                                 id="tck6"
                                 />
                                 <label className="custom-control-label" htmlFor="tck6">
                                 Updates changes to GitHub{" "}
                                 </label>
                              </div>
                           </li>
                           <li>
                              <div className="custom-checkbox custom-control custom-control-sm">
                                 <span className="delete mdi mdi-delete" />
                                 <input
                                 className="custom-control-input"
                                 type="checkbox"
                                 id="tck7"
                                 />
                                 <label
                                 className="custom-control-label"
                                 htmlFor="tck7"
                                 title="This task is too long to be displayed in a normal space!"
                                 >
                                 This task is too long to be displayed in a normal
                                 space!{" "}
                                 </label>
                              </div>
                           </li>
                           </ul>
                        </div>
                     </div>
                     </div>
                     <div className="bottom-input">
                     <input type="text" placeholder="Create new task..." name="q" />
                     <span className="mdi mdi-plus" />
                     </div>
                  </div>
               </div>
               <div className="tab-pane tab-settings" id="tab3" role="tabpanel">
                  <div className="settings-wrapper">
                     <div className="be-scroller-settings">
                     <span className="category-title">General</span>
                     <ul className="settings-list">
                        <li>
                           <div className="switch-button switch-button-sm">
                           <input
                              type="checkbox"
                              defaultChecked=""
                              name="st1"
                              id="st1"
                           />
                           <span>
                              <label htmlFor="st1" />
                           </span>
                           </div>
                           <span className="name">Available</span>
                        </li>
                        <li>
                           <div className="switch-button switch-button-sm">
                           <input
                              type="checkbox"
                              defaultChecked=""
                              name="st2"
                              id="st2"
                           />
                           <span>
                              <label htmlFor="st2" />
                           </span>
                           </div>
                           <span className="name">Enable notifications</span>
                        </li>
                        <li>
                           <div className="switch-button switch-button-sm">
                           <input
                              type="checkbox"
                              defaultChecked=""
                              name="st3"
                              id="st3"
                           />
                           <span>
                              <label htmlFor="st3" />
                           </span>
                           </div>
                           <span className="name">Login with Facebook</span>
                        </li>
                     </ul>
                     <span className="category-title">Notifications</span>
                     <ul className="settings-list">
                        <li>
                           <div className="switch-button switch-button-sm">
                           <input type="checkbox" name="st4" id="st4" />
                           <span>
                              <label htmlFor="st4" />
                           </span>
                           </div>
                           <span className="name">Email notifications</span>
                        </li>
                        <li>
                           <div className="switch-button switch-button-sm">
                           <input
                              type="checkbox"
                              defaultChecked=""
                              name="st5"
                              id="st5"
                           />
                           <span>
                              <label htmlFor="st5" />
                           </span>
                           </div>
                           <span className="name">Project updates</span>
                        </li>
                        <li>
                           <div className="switch-button switch-button-sm">
                           <input
                              type="checkbox"
                              defaultChecked=""
                              name="st6"
                              id="st6"
                           />
                           <span>
                              <label htmlFor="st6" />
                           </span>
                           </div>
                           <span className="name">New comments</span>
                        </li>
                        <li>
                           <div className="switch-button switch-button-sm">
                           <input type="checkbox" name="st7" id="st7" />
                           <span>
                              <label htmlFor="st7" />
                           </span>
                           </div>
                           <span className="name">Chat messages</span>
                        </li>
                     </ul>
                     <span className="category-title">Workflow</span>
                     <ul className="settings-list">
                        <li>
                           <div className="switch-button switch-button-sm">
                           <input type="checkbox" name="st8" id="st8" />
                           <span>
                              <label htmlFor="st8" />
                           </span>
                           </div>
                           <span className="name">Deploy on commit</span>
                        </li>
                     </ul>
                     </div>
                  </div>
               </div>
               </div>
            </div>
         </div>
      </nav>

   )
}
export default HeaderRight