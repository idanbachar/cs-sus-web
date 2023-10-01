import { useEffect, useRef, useState } from "react";
import styles from "./search.module.css";
import { BsSearch } from "react-icons/bs";
import { ISearch } from "../../interfaces/ISearch";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { CheckIsSteamProfileValid } from "../../services/steamHelperService";

const Search: React.FC<ISearch> = (props) => {
  const { placeholder } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const steamUrlParam = queryParameters.get("steamUrl");
  const [inputValue, setInputValue] = useState(steamUrlParam);
  const [isValid, setIsValid] = useState<boolean>();

  useEffect(() => {
    if (steamUrlParam) {
      setInputValue(steamUrlParam);
      if (inputRef.current) {
        inputRef.current.value = steamUrlParam;
      }
    }
  }, [location]);

  return (
    <div className={styles.mainContainer}>
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
            onClick={() => {
              if (inputValue) {
                const isSteamProfileURLValid =
                  CheckIsSteamProfileValid(inputValue);
                setIsValid(isSteamProfileURLValid);
                if (isSteamProfileURLValid) {
                  navigate(`/search?steamUrl=${inputValue}`);
                }
              }
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <span className={styles.error}>
        {isValid !== undefined ? (!isValid ? "Not valid steam url." : "") : ""}
      </span>
    </div>
  );
};

export default Search;
