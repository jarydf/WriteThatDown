import "./../../css/Profile.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // console.log(userInfo._id);
  JSON.stringify(userInfo);
  console.log(userInfo);

  useEffect(() => {
    try {
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      const user = { userId: decode.id };
      axios
        .get(`${process.env.REACT_APP_MONGOURL}/users/getUserInfo`, {
          params: user,
        })
        .then(
          (response) => {
            setIsLoaded(true);
            setUserInfo(response.data);
            console.log(userInfo);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } catch (error) {
      console.log(error.message);
    }
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="container emp-profile">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src="https://www.jarydfisher.com/images/Portfolio.jpg"
                  alt=""
                />
                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input type="file" name="file" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userInfo.username}</h5>
                <h6>Web Developer and Designer</h6>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#profile-home"
                      role="tab"
                      aria-controls="profile-home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <EditProfile dataFromParent={userInfo} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href>Website Link</a>
                <br />
                <a href>Bootsnipp Profile</a>
                <br />
                <a href>Bootply Profile</a>
                <p>SKILLS</p>
                <a href>Web Designer</a>
                <br />
                <a href>Web Developer</a>
                <br />
                <a href>WordPress</a>
                <br />
                <a href>WooCommerce</a>
                <br />
                <a href>PHP, .Net</a>
                <br />
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="profile-home"
                  role="tabpanel"
                  aria-labelledby="home"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userInfo.username}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userInfo.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userInfo.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Your Bio</label>
                      <br />
                      <p>{userInfo.bio}</p>
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
};

export default Profile;
