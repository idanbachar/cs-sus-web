import { useState } from "react";
import styles from "./search-user.module.css";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

const SearchUser: React.FC = () => {
  const [input, setInput] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <BsSearch color="black" />
        <input
          className={styles.input}
          placeholder={"Enter suspicious steam url"}
          type={"search"}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button
        className={styles.button}
        onClick={() => {
          (async () => {
            const data = await axios(
              `http://localhost:4000/getUser?steamUrl=${input}`
            );

            console.log("data", data.data);
          })();
        }}
      >
        Search!
      </button>
    </div>
  );
};

export default SearchUser;
