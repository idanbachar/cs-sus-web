import { useEffect, useRef, useState } from "react";
import styles from "./search-user.module.css";
import { BsSearch } from "react-icons/bs";
import { ISearchUser } from "../../interfaces/ISearchUser";
import { GetUser } from "../../services/steamService";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

const SearchUser: React.FC<ISearchUser> = (props) => {
  const { placeholder, onSearch } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const steamUrlParam = queryParameters.get("steamUrl");
  const [inputValue, setInputValue] = useState(steamUrlParam);

  useEffect(() => {
    if (steamUrlParam) {
      setInputValue(steamUrlParam);
      if (inputRef.current) {
        inputRef.current.value = steamUrlParam;
      }
    }
  }, [location]);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type={"text"}
          ref={inputRef}
          className={styles.input}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          defaultValue={steamUrlParam || ""}
        />
        <BsSearch
          color="black"
          onClick={async () => {
            if (inputValue && inputValue !== steamUrlParam) {
              navigate(`?steamUrl=${inputValue}`);
              const userData = await GetUser(inputValue);
              onSearch(userData);
            }
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default SearchUser;
