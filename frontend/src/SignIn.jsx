import NavBar from "./components/NavBar";

function SignIn() {
    const blackCircle = "\u2981";
    return (
        <div>
            <div className="relative flex flex-col bg-alternative h-screen">
                <NavBar></NavBar>
                <div className="flex flex-1 h-full">
                    {/* border-r border-default */}
                    <div className="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8">
                        <div className="flex justify-center items-center">
                            <div className="w-[25em]">
                                <h1 className="font-normal text-5xl text-secondary-foreground mb-3">
                                    Start planning!
                                </h1>
                                <h3 className="font-light text-base text-primary mb-5">
                                    Sign in to your account
                                </h3>

                                <h3 className="font-light text-base text-primary mb-2">
                                    Email
                                </h3>
                                <input
                                    className="w-full bg-slate-50 border shadow-sm p-2 px-3 rounded-md mb-2 text-sm"
                                    placeholder="yourname@example.com"
                                ></input>

                                <h3 className="font-light text-base text-primary mb-2">
                                    Password
                                </h3>
                                <input
                                    className="w-full bg-slate-50 border shadow-sm p-2 px-3 rounded-md mb-2 text-sm"
                                    placeholder={`${blackCircle.repeat(6)}`}
                                ></input>
                                <button className="w-full bg-[#e8d3f8] border shadow-sm p-2 px-3 rounded-md mb-2 text-sm hover:bg-[#e1c1f9]">
                                    {" "}
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
