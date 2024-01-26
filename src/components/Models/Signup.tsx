import React, { useEffect, useState } from 'react';
import { authModelState } from '@/atoms/authmodelAtom';
import { useSetRecoilState } from 'recoil';
import { auth, firestore } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
    const setAuthModalState = useSetRecoilState(authModelState);
    const handleClick = () => {
        setAuthModalState((prev) => ({...prev,type:'login'}))
    };
    const router = useRouter();
    const [inputs , setInputs] = useState({email:'',displayName:'',password:''});
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputs.email || !inputs.password || !inputs.displayName) return alert("Please fill all the details")
        try {
            toast.loading("Creating your account",{position:"top-center",toastId:"loadingToast"})
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if(!newUser) return;
            const userData = {
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: inputs.displayName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems:[],
                dislikedProblems:[],
                solvedProblems:[],
                starredProblems:[],
            }
            await setDoc(doc(firestore,"users",newUser.user.uid),userData)
            router.push('/');
        } catch (error:any){
            toast.error(error.message,{position:"top-center"})
        }finally{
            toast.dismiss("loadingToast")
        }
    };

useEffect(()=> {
    if(error) alert(error.message)
},[error])

    return (
        <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
        <h3 className='text-x1 font-medium text-white'>Register</h3>
    <div>
        <label htmlFor="displayName" className='text-sm font-medium block mb-2 text-gray-300'>
            Email
        </label>
        <input onChange={handleChangeInput} type="email" name='email' id='email' className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray500 placeholder-gray-400 text-gray-300 text-white
        '
            placeholder='name@company.com'
        />
    </div> 
    <div>
        <label htmlFor="displayName" className='text-sm font-medium block mb-2 text-gray-300'>
            Display Name
        </label>
        <input onChange={handleChangeInput} type="displayName" name='displayName' id='displayName' className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray500 placeholder-gray-400 text-gray-300 text-white
        '
            placeholder='firstname lastname'
        />
    </div>   
    <div>
        <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>
            Password
        </label>
        <input onChange={handleChangeInput}  type="password" name='password' id='password' className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray500 placeholder-gray-400 text-gray-300 text-white
        '
            placeholder='********'
        />
    </div>  
    <button type='submit' className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
        '>
            {loading?"Registering..":"Register"}
    </button>
    <div className='text-sm font-medium text-gray-500'>
        Already have an account?{" "}
        <a href="#" className='text-blue-700 hover:underline' onClick={handleClick}>
            Log In
        </a>
    </div>
    </form>
    )
}
export default Signup;