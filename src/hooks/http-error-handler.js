import { useState, useEffect } from "react";

//custom hook
const useHttpErrorHandler = httpClient => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(request => {
    setError(null);
    return request;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    res => res,
    error => {
      setError(error);
    }
  );

  useEffect(() => {
    //remove/cleanup interceptors
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.request.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor, httpClient.interceptors.request]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};

export default useHttpErrorHandler;
