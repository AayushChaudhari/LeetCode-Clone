import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AuthModel from '@/components/Models/AuthModel'
import { authModelState } from '@/atoms/authmodelAtom';
import { useRecoilValue } from 'recoil';
import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

type AuthPageProps = {};



const AuthPage:React.FC<AuthPageProps> = () => {

    const authModel = useRecoilValue(authModelState);
    const [user,loading,error] = useAuthState(auth);
    const [pageLoading, setPageLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if(user) router.push("/");
        if(!loading && !user) setPageLoading(false);
    },[user,router,loading]);

    if(pageLoading) return null;

    return <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7x1 mx-auto'>
            <Navbar />
            <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
                <Image src="/hero.png" alt="hero img" height={700} width={700}/>
            </div>
            {authModel.isOpen && <AuthModel />}
        </div>
    </div>;
};
export default AuthPage;