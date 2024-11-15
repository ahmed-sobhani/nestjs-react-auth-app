import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import { IUser } from "../../common/interfaces/user.interface";
import { useAuth } from "../../contexts/AuthContext";

function SignUp() {
  const { setTokens } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<string[]>([]);

  const signUp = async (event: any) => {
    event.preventDefault();
    if (loading) return;

    try {
      if (validate()) {
        setLoading(true);
        const newUser: IUser = { email, fullName, password };
        const savedNewUser = await axios.post(
          "http://localhost:3003/auth/sign-up",
          newUser
        );
        const { accessToken, refreshToken } = savedNewUser?.data?.data;
        setTokens(accessToken, refreshToken);

        setLoading(false);
        if (savedNewUser?.status === 201) navigate("/");
      }
    } catch (error: any) {
      setErrors([
        error?.response?.status !== 500
          ? error?.response?.data?.message
          : "Internal server error! Please try later.",
      ]);

      setLoading(false);
    }
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const validate = () => {
    clearErrors();
    let isValid = true;
    if (!validator.isEmail(email)) {
      setErrors((e: string[]) => [...e, "email is not valid"]);
      isValid = false;
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrors((e: string[]) => [...e, "password is not strong"]);
      isValid = false;
    }
    return isValid;
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="https://assets.easygenerator.com/fragment/auth-page/2023.10.10.master-ef0df05217/fe2d0604cd7c37cb56fba71cae72c2e6.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={signUp}>
          <div>
            {errors ? (
              errors.map((error) => (
                <>
                  <span key={error} className="text-red-500">
                    {error}
                  </span>
                  <br />
                </>
              ))
            ) : (
              <></>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="mt-2">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="fullName"
                required
                className="block w-full rounded-md border-b-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-b-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-b-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>Sign up</>
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            to="/sign-in"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
