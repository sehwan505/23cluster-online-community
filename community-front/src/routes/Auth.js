import { authService, firebaseInstance } from "fbase";
import React from "react";

const Auth = () => {  
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "facebook") {
      provider = new firebaseInstance.auth.FacebookAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };    

  return (
    <div>
      <div>
        <button onClick={onSocialClick} name="google">
          구글로 계속하기
        </button>
        <button onClick={onSocialClick} name="facebook">
          페이스북으로 계속하기
        </button>
      </div>
    </div>
  );
};

export default Auth;
