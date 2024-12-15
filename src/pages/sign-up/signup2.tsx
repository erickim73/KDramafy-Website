import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";
import { useEffect } from "react";

export default function SignUpPage() {
    useEffect(() => {
        // Add class to disable scrolling
        document.body.style.overflow = "hidden";

        return () => {
            // Remove class on unmount to re-enable scrolling
            document.body.style.overflow = "auto";
        };
    }, []);
  
    return (
        <BackgroundBeamsWithCollision>
            <div className="flex items-center justify-center min-h-screen p-4 bg-[black] text-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold ">Create an account with KDramafy!</h1>
                    </div>
                    <form className="mt-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
                        <div>
                        <label htmlFor="firstName" className="font-semibold text-white">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="John"
                            required
                            className="w-full px-4 text-white rounded-lg bg-zinc-800 h-11"
                        />
                        </div>
                        <div>
                        <label htmlFor="lastName" className="font-semibold text-white">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                        placeholder="Doe"
                            required
                            className="w-full px-4 text-white rounded-lg bg-zinc-800 h-11"
                        />
                        </div>
                    </div>
                    <div>
                    <label htmlFor="email" className="font-semibold text-white">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="johndoe@kdramafy.com"
                        required
                        className="w-full px-4 text-white rounded-lg bg-zinc-800 h-11"
                    />
                    </div>
                    <div>
                        <label htmlFor="password" className="font-semibold text-white">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••••••"
                            required
                            className="w-full px-4 text-white rounded-lg bg-zinc-800 h-11"
                        />
                    </div>
                    <div>
                    <button
                            type="submit"
                            className="w-full text-base font-medium text-black transition-colors bg-white h-11 sm:text-lg hover:bg-gray-200 rounded-xl"
                        >
                            Create an Account
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </BackgroundBeamsWithCollision>
  )
}

