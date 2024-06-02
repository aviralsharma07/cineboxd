import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDocs, onSnapshot, setDoc, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5MzWYW4nIf3nDjhFsdq-C19A1O-dYYR0",
  authDomain: "cineboxd-23f21.firebaseapp.com",
  projectId: "cineboxd-23f21",
  storageBucket: "cineboxd-23f21.appspot.com",
  messagingSenderId: "1018234720959",
  appId: "1:1018234720959:web:ad703bdf008f21f3442c0a",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => {
  const signUp = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      // console.log(user.email);

      // Update the user document with the username
      await updateUsername(user.uid, username);

      return user;
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUsername = async (userId, username) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      await setDoc(userDocRef, { username }, { merge: true }); // Merge the username with existing user data
    } catch (error) {
      console.log(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      user && console.log("Sign In Successfull", user.email);
      return user;
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createList = async (userId, listName, visibility) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      console.log("userdocref....", userDocRef);
      const listsCollectionRef = collection(userDocRef, "lists");
      await addDoc(listsCollectionRef, {
        listName,
        visibility,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const addMovieToList = async (userId, listId, movie) => {
    try {
      const userDocRef = doc(firestore, `users/${userId}`);
      const listDocRef = doc(userDocRef, `lists/${listId}`);
      const moviesCollectionRef = collection(listDocRef, "movies");
      await addDoc(moviesCollectionRef, movie);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMoviesFromList = (userId, listId, callback) => {
    try {
      const userDocRef = doc(firestore, `users/${userId}`);
      const listDocRef = doc(userDocRef, `lists/${listId}`);
      const moviesCollectionRef = collection(listDocRef, "movies");
      return onSnapshot(moviesCollectionRef, (querySnapshot) => {
        const movies = querySnapshot.docs.map((doc) => doc.data());
        callback(movies);
      });
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  // Function to get user lists with movie counts
  const getUserLists = (userId, callback) => {
    const listsRef = collection(firestore, "users", userId, "lists");

    const unsubscribe = onSnapshot(listsRef, async (snapshot) => {
      const lists = [];
      for (const doc of snapshot.docs) {
        const listData = doc.data();
        const listId = doc.id;

        // Fetch movie count
        const moviesRef = collection(firestore, "users", userId, "lists", listId, "movies");
        const moviesSnapshot = await getDocs(moviesRef);
        const movieCount = moviesSnapshot.size;

        lists.push({
          id: listId,
          ...listData,
          movieCount,
        });
      }
      callback(lists);
    });

    return unsubscribe;
  };

  // const getPublicLists = async () => {
  //   try {
  //     const usersRef = collection(firestore, "users");
  //     const querySnapshot = await getDocs(usersRef);
  //     const publicLists = [];

  //     querySnapshot.forEach((userDoc) => {
  //       const listsRef = collection(userDoc.ref, "lists");
  //       listsRef
  //         .where("visibility", "==", "public")
  //         .get()
  //         .then((querySnapshot) => {
  //           querySnapshot.forEach((listDoc) => {
  //             publicLists.push({
  //               userId: userDoc.id,
  //               listId: listDoc.id,
  //               ...listDoc.data(),
  //             });
  //           });
  //         });
  //     });

  //     return publicLists;
  //   } catch (error) {
  //     console.error("Error fetching public lists: ", error);
  //     return [];
  //   }
  // };

  const getPublicLists = async () => {
    try {
      const usersRef = collection(firestore, "users");
      const querySnapshot = await getDocs(usersRef);

      const publicLists = [];
      querySnapshot.forEach((userDoc) => {
        console.log("userDoc: ", userDoc.id);
        const listsRef = collection(userDoc.ref, "lists");
        const publicListsRef = query(listsRef, where("visibility", "==", "public"));

        // Fetch all public lists for this user in a single call
        getDocs(publicListsRef).then((querySnapshot) => {
          querySnapshot.forEach((listDoc) => {
            publicLists.push({
              userId: userDoc.id,
              listId: listDoc.id,
              username: userDoc.data().username,
              ...listDoc.data(),
            });
          });
        });
      });

      // Wait for all promises to resolve before returning
      await Promise.allSettled(publicLists.map((list) => list.then((list) => list)));

      return publicLists;
    } catch (error) {
      console.error("Error fetching public lists: ", error);
      return [];
    }
  };

  const contextValue = {
    signUp,
    signIn,
    firebaseAuth,
    logOut,
    createList,
    getUserLists,
    addMovieToList,
    getMoviesFromList,
    getPublicLists,
  };
  return <FirebaseContext.Provider value={contextValue}>{props.children}</FirebaseContext.Provider>;
};
