import React from 'react';

const SignupPage = () => {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className='col-span-1'></div>
      <div className="col-span-3   ">

        {/* <div className="absolute top-50 pink w-[20%] h-[20%]  z-0"></div>
        <div className="absolute top-50 yellow w-[20%] h-[20%]  z-10"></div> */}
      
        <img src="/images/juicy-girl-with-shopping-bags-calling-a-taxi-on-mobile-phone.gif" className="z-20 h-[40rem] bg-cover" alt="Juicy girl with shopping bags calling a taxi on mobile phone"></img>
    
      </div>
      
      <div className="col-span-2 h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <form className="w-2/3">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4 ">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
        </form>
        <p className="mt-4">Already have an account? <a href="#" className="text-indigo-600 hover:underline">Login here</a></p>
      </div>
    </div>
  );
};

export default SignupPage;
