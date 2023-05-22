import { useState } from 'react';
import { authentication } from '@firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

const useFirebaseAuthentication = () => {
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleAuth = () => {
    signInWithPopup(authentication, googleProvider)
      .then((res: any) => {
        const token = res.user?.accessToken;
        setGoogleToken(token);
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
