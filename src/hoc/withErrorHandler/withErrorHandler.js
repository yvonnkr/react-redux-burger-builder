import React from "react";
import Modal from "./../../components/UI/Modal/Modal";
import useHttpErrorHandler from "./../../hooks/http-error-handler"; //custom hook

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal show={error ? true : false} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;

// ******** before hooks ******************************************************************************************
// const withErrorHandler = (WrappedComponent, axios) => {
//   return class extends React.Component {
//     state = {
//       error: null
//     };

//     UNSAFE_componentWillMount() {
//       this.reqInterceptor = axios.interceptors.request.use(request => {
//         this.setState({ error: null });
//         return request;
//       });

//       this.resInterceptor = axios.interceptors.response.use(
//         res => res,
//         error => {
//           this.setState({ error: error });
//         }
//       );
//     }

//     componentWillUnmount() {
//       //remove / cleanup interceptors

//       axios.interceptors.request.eject(this.reqInterceptor);
//       axios.interceptors.request.eject(this.resInterceptor);
//     }

//     errorConfirmedHandler = () => {
//       this.setState({ error: null });
//     };

//     render() {
//       const { error } = this.state;
//       return (
//         <>
//           <Modal
//             show={error ? true : false}
//             modalClosed={this.errorConfirmedHandler}
//           >
//             {error ? error.message : null}
//           </Modal>
//           <WrappedComponent {...this.props} />
//         </>
//       );
//     }
//   };
// };

// export default withErrorHandler;
