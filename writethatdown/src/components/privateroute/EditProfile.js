import React, { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const EditProfile = ({ dataFromParent }) => {
  const [styleHeight, setStyleHeight] = useState({ width: "0vw" });
  const [state, setState] = useState({
    userId: dataFromParent._id,
    phone: dataFromParent.phone,
    bio: dataFromParent.bio,
  });
  console.log("data from parent: " + dataFromParent._id);
  console.log("data from parent state: " + state.userId);
  console.log("state bio: " + state.bio);
  console.log("state phone: " + state.phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const openNav = () => {
    setStyleHeight({ width: "100vw" });
    console.log("expand height");
  };

  const closeNav = () => {
    setStyleHeight({ width: "0vw" });
    console.log("shorten height");
  };

  const editProfile = (e) => {
    e.preventDefault();
    try {
      closeNav();
      const token = localStorage.getItem("user");
      const decode = jwtDecode(token);
      const user = { userId: decode.id };

      const editedUserInfo = {
        phone: state.phone,
        bio: state.bio,
        userId: user.userId,
      };

      axios
        .post(
          `${process.env.REACT_APP_MONGOURL}/users/editUser`,
          editedUserInfo
        )

        .then((res) => {
          console.log("user info updated");
          console.log(res);
        })
        .catch((err) => {
          console.log("not working");
          console.log(err.response.data.message);
        });
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
            <h1>Create a New Note</h1>
            <input
              type="text"
              className="fadeIn second"
              placeholder="phone number"
              value={state.phone || ""}
              onChange={handleChange}
              name="phone"
            />
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="10"
              value={state.bio || ""}
              onChange={handleChange}
              name="bio"
            ></textarea>
          </form>
          <input
            type="submit"
            className="fadeIn fourth"
            value="Edit"
            onClick={editProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
