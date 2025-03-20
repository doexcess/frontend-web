'use client';

import ConfirmSignInForm from '@/components/auth/ConfirmSignInForm';
import { isEncrypted } from '@/lib/utils';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ConfirmSignIn = () => {
  return (
    <section className='flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900'>
      <a
        href='#'
        className='flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white'
      >
        <Image
          src={'/logo.png'}
          width={150}
          height={150}
          alt='Logo'
          className='m-auto block dark:hidden'
          priority
        />
        <Image
          src={'/logo-white.png'}
          width={150}
          height={150}
          alt='Logo'
          className='m-auto hidden dark:block'
          priority
        />
      </a>
      {/* <!-- Card --> */}
      <div className='w-full max-w-md p-6 space-y-8 sm:p-8 rounded-lg shadow dark:bg-gray-800 bg-white'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Verify your Signin
        </h2>
        <p>Enter the verification code sent to your email address to login.</p>
        <ConfirmSignInForm />
      </div>
    </section>
  );
};

export default ConfirmSignIn;
