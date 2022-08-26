import { createContext, useState } from 'react';

const AuthContext = createContext({
    id: '',
    name: ''
}
);

export const AuthContextProvider = (props) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const contextValue = {
        setId: setId,
        id: id,
        setName: setName,
        name: name
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;