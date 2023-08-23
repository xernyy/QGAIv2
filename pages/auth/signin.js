import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Transition } from "@headlessui/react";

const SignInModal = ({buttonContent}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset(); // Reset the form fields when the modal is closed
  };

  const handleSignIn = async (data) => {
    const { email, password } = data;

    // Call the signIn function from NextAuth.js
    const result = await signIn("credentials", {
      redirect: false, // Avoid automatic redirection
      email,
      password,
    });

    if (result.error) {
      // Handle authentication error
      console.error("Authentication failed:", result.error);
    } else {
      // Authentication successful
      console.log("Authentication successful:", result);
      closeModal();
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="px-8 py-4 text-lg font-medium text-center text-white bg-customBlue rounded-md">
        {buttonContent}
      </button>

      <Transition
        show={isModalOpen}
        enter="transition duration-200 transform ease"
        enterFrom="opacity-0 scale-75"
        leave="transition duration-200 transform ease"
        leaveTo="opacity-0 scale-75"
        className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-8 rounded-md w-[400px] h-[400px] shadow-lg">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 hover:text-gray-900">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <h2 className="text-2xl font-bold mb-4 text-black">Sign In</h2>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 bg-gray-100 bg-opacity-80 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
              />
              {errors.email && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </div>
              )}

              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-3 py-2 bg-gray-100 bg-opacity-80 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
              />
              {errors.password && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </div>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Sign In
              </button>
            </form>
            </div>
        </div>
      </Transition>
    </div>
  );
};

export default SignInModal;
