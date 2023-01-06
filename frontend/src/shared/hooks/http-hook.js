import { AuthContext, Paths } from "LojaUniversal";
import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

export default function useHttp() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [isLoading, setIsloading] = useState(false);

  const sendRequest = useCallback(
    async (url, isPublic = true, method = "GET", body = null, headers = {}) => {
      setIsloading(true);

      if (!isPublic) {
        headers = { ...headers, Authorization: "Bearer " + auth.token };
      }

      if (body) {
        headers = { ...headers, "Content-Type": "application/json" };
      }

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();

        setIsloading(false);

        if (response.status < 200 || response.status > 299) {
          throw new Error(responseData.message);
        }

        return responseData;
      } catch (err) {
        console.log(err);
        history.push(Paths.ErrorModal);
      }
    },
    [history, auth.token]
  );

  return { isLoading, sendRequest };
}
