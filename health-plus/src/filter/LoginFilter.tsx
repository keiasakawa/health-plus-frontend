import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

const LoginFilter = (Component: any) => {
    const Authentication = (props: any) => {
        const [authenticated, setAuthenticated] = useState(false);
        const history = useHistory();

        useEffect(() => {
            console.log(localStorage.getItem('id'));
            const loginAuth = localStorage.getItem('id');
            if (!loginAuth && loginAuth !== '') {
                setAuthenticated(true);
            }
            else {
                history.push('/login');
            }
        }, []);
        return authenticated ? <Component {...props} /> : null;
    }

    return Authentication;
}

export default LoginFilter;