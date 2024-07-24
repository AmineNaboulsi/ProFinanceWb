import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const withValidationAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const authToken = Cookies.get('authToken');

      if (!authToken) {
        navigate('/');
      } else {
        const apiUrl = process.env.REACT_APP_API_URL;

        fetch(`${apiUrl}/user/valide_usertk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usertk: authToken })
        })
        .then(res => res.json())
        .then(data => {
          if (!data.isValid) {
            navigate('/');
          }
        })
        .catch(error => {
          console.error('Error validating token:', error);
          navigate('/');
        });
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withValidationAuth;
