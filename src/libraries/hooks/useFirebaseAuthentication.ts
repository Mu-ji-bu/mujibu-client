import { useState } from 'react';
import { authentication } from '@firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const useFirebaseAuthentication = () => {
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleAuth = () => {
    signInWithPopup(authentication, googleProvider)
      .then((res) => {
        const { uid } = res.user;
        setGoogleToken(uid);
      })
      .catch((err) => {
        console.log('error :', err);
      });
  };

  return {
    handleGoogleAuth,
    googleToken,
  };
};

export default useFirebaseAuthentication;