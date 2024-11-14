import React from "react";

const HeaderTOP = () => {
  const user = JSON.parse(localStorage.getItem("auth"));

  const Logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "http://localhost:3001";
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center"
  };

  const logoStyle = {
    maxHeight: "50px",
    height: "auto",
    width: "auto"
  };

  return (
    <nav className="navbar navbar-expand fixed-top be-top-header">
      <div className="container-fluid">
        <div className="be-navbar-header" style={headerStyle}>
          <img
            src="https://webmedia.com.vn/images/2021/07/logo-gearvn.png"
            style={logoStyle}
            alt="Logo"
          />
        </div>
        <div className="page-title">
          <span>xin chào {user.name || "Bạn"} </span>
        </div>
        <div className="be-right-navbar">
          <ul className="nav navbar-nav float-right be-user-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <img src={user.hinh} alt="Avatar" />
                <span className="user-name">{user.name || "Bạn"}</span>
              </a>
              <div className="dropdown-menu" role="menu">
                <div className="user-info">
                  <div className="user-name">{user.name || "Bạn"}</div>
                  <div className="user-position online">Đang hoạt động</div>
                </div>
                <a className="dropdown-item" href="#" onClick={Logout}>
                  <span className="icon mdi mdi-power" />
                  Logout
                </a>
              </div>
            </li>
          </ul>
          <ul className="nav navbar-nav float-right be-icons-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link be-toggle-right-sidebar"
                href="#"
                role="button"
                aria-expanded="false"
              >
                <span className="icon mdi mdi-settings" />
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <span className="icon mdi mdi-notifications" />
                <span className="indicator" />
              </a>
              <ul className="dropdown-menu be-notifications">
                <li>
                  <div className="title">
                    Notifications<span className="badge badge-pill">3</span>
                  </div>
                  <div className="list">
                    <div className="be-scroller-notifications">
                      <div className="content">
                        <ul>
                          <li className="notification notification-unread">
                            <a href="#">
                              <div className="image">
                                <img src="assets/img/avatar2.png" alt="Avatar" />
                              </div>
                              <div className="notification-info">
                                <div className="text">
                                  <span className="user-name">Jessica Caruso</span>{" "}
                                  accepted your invitation to join the team.
                                </div>
                                <span className="date">2 min ago</span>
                              </div>
                            </a>
                          </li>
                          <li className="notification">
                            <a href="#">
                              <div className="image">
                                <img src="assets/img/avatar3.png" alt="Avatar" />
                              </div>
                              <div className="notification-info">
                                <div className="text">
                                  <span className="user-name">Joel King</span> is
                                  now following you
                                </div>
                                <span className="date">2 days ago</span>
                              </div>
                            </a>
                          </li>
                          <li className="notification">
                            <a href="#">
                              <div className="image">
                                <img src="assets/img/avatar4.png" alt="Avatar" />
                              </div>
                              <div className="notification-info">
                                <div className="text">
                                  <span className="user-name">John Doe</span> is
                                  watching your main repository
                                </div>
                                <span className="date">2 days ago</span>
                              </div>
                            </a>
                          </li>
                          <li className="notification">
                            <a href="#">
                              <div className="image">
                                <img src="assets/img/avatar5.png" alt="Avatar" />
                              </div>
                              <div className="notification-info">
                                <span className="text">
                                  <span className="user-name">Emily Carter</span> is
                                  now following you
                                </span>
                                <span className="date">5 days ago</span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="footer">
                    {" "}
                    <a href="#">View all notifications</a>
                  </div>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <span className="icon mdi mdi-apps" />
              </a>
              <ul className="dropdown-menu be-connections">
                <li>
                  <div className="list">
                    <div className="content">
                      <div className="row">
                        <div className="col">
                          <a className="connection-item" href="#">
                            <img src="assets/img/github.png" alt="Github" />
                            <span>GitHub</span>
                          </a>
                        </div>
                        <div className="col">
                          <a className="connection-item" href="#">
                            <img src="assets/img/bitbucket.png" alt="Bitbucket" />
                            <span>Bitbucket</span>
                          </a>
                        </div>
                        <div className="col">
                          <a className="connection-item" href="#">
                            <img src="assets/img/slack.png" alt="Slack" />
                            <span>Slack</span>
                          </a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <a className="connection-item" href="#">
                            <img src="assets/img/dribbble.png" alt="Dribbble" />
                            <span>Dribbble</span>
                          </a>
                        </div>
                        <div className="col">
                          <a className="connection-item" href="#">
                            <img src="assets/img/mail_chimp.png" alt="Mail Chimp" />
                            <span>Mail Chimp</span>
                          </a>
                        </div>
                        <div className="col">
                          <a className="connection-item" href="#">
                            <img src="assets/img/dropbox.png" alt="Dropbox" />
                            <span>Dropbox</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer">
                    {" "}
                    <a href="#">More</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderTOP;
