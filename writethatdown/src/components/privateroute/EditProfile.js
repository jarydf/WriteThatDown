import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const EditProfile = () => {
  const [styleHeight, setStyleHeight] = useState({ width: "0vw" });
  const [state, setState] = useState({
    phone: "",
    bio: "",
  });

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
            setState({
              phone: response.data.phone,
              bio: response.data.bio,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleChange = (e) => {
    const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    const { name, value } = e.target;
    if (name === "phone") {
      if (rx_live.test(value)) {
        setState((prevState) => ({ ...prevState, [name]: value }));
      }
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const openNav = () => {
    setStyleHeight({ width: "100vw" });
    console.log("expand height");
  };

  const closeNav = () => {
    setStyleHeight({ width: "0vw" });
    console.log("shorten height");
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
            setState({
              phone: response.data.phone,
              bio: response.data.bio,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error.message);
    }
  };

  const editProfile = (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      const user = { userId: decode.id };

      const editedUser = {
        phone: state.phone,
        bio: state.bio,
        userId: user.userId,
      };

      axios
        .post(`${process.env.REACT_APP_MONGOURL}/users/editUser`, editedUser)
        .then((res) => {
          console.log("user info updated");
          console.log(res);
        })
        .catch((err) => {
          console.log("not working");
          console.log(err.response.data.message);
        });
      closeNav();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="editProfile">
      <button type="submit" className="btn btn-primary" onClick={openNav}>
        Edit Profile
      </button>
      <div className="overlay" style={styleHeight}>
        <button
          id="overlayCloseBtn"
          type="button"
          className="closebtn"
          onClick={closeNav}
        >
          ×
        </button>
        <div className="overlay-content">
          <form>
            <h1>Edit Profile</h1>
            <input
              name="phone"
              rules={{ required: true }}
              type="text"
              className="fadeIn second"
              placeholder="Please enter your phone number"
              value={state.phone}
              onChange={handleChange}
              id="phone"
              maxLength={10}
              pattern="[+-]?\d+(?:[.,]\d+)?"
            />
            <textarea
              className="form-control"
              placeholder="Write something about yourself! This is your bio."
              id="bio"
              rows="10"
              value={state.bio}
              onChange={handleChange}
              name="bio"
            ></textarea>
            <input
              type="submit"
              className="fadeIn fourth"
              value="Edit"
              onClick={editProfile}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
