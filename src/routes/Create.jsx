import { account, db } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Create = () => {
  const [user, setUser] = useState(null);
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const collectionRef = collection(db, "notes");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(account, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
    } else {
      createUser();
    }
  }

  function handleNoteSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
    } else {
      sendData();
    }
  }

  async function createUser() {
    try {
      const c = createUserWithEmailAndPassword(account, email, password);
      console.log(c);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendData() {
    try {
      const resp = await setDoc(doc(collectionRef, user), {
        note: note,
      });
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>

      <form action="" onSubmit={handleNoteSubmit}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleNoteSubmit}>Submit</button>
      </form>
    </>
  );
};

export default Create;
