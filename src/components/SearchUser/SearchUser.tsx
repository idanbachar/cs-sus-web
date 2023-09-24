import { useState } from "react";
import styles from "./search-user.module.css";
import { BsSearch } from "react-icons/bs";
import { ISearchUser } from "../../interfaces/ISearchUser";
import { GetUser } from "../../services/steamService";

const SearchUser: React.FC<ISearchUser> = (props) => {
  const { placeholder, onSearch } = props;

  const [inputValue, setInputValue] = useState(
    "https://steamcommunity.com/id/greenturtleshell"
  );
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <BsSearch color="black" />
        <input
          type={"search"}
          className={styles.input}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <button
        className={styles.button}
        onClick={async () => {
          const userData = await GetUser(inputValue);
          onSearch(userData);
        }}
      >
        Search!
      </button>
    </div>
  );
};

export default SearchUser;
