import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from"../firebase.init";
const UseLoggedInUser = () => {
    const [ user ] = useAuthState(auth);
    const email = user?.email;
    //console.log(email);
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        fetch(`https://twitter-clone-backend-hyxq.onrender.com/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                //console.log('from useLoggedinuser', data)
                setLoggedInUser(data)
            })
    }, [email, loggedInUser])

    return [loggedInUser, setLoggedInUser];
}

export default UseLoggedInUser