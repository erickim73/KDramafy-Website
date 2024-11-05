import { GetStartedButton } from "./home-getstartedbutton"
import { MainMessage } from "./home-mainmessage"
import { SecondaryMessage } from "./home-secondarymessage"
import {Slogan} from "./home-slogan"

export const Home = () => {
    return (
        <div className = "bg-[#081014] min-h-screen flex flex-col items-center justify-center text-white p-4 relative">
            {/* slogan */}
            <Slogan/>

            {/* main message */}
            <MainMessage/>

            {/* secondary message */}
            <SecondaryMessage/>

            {/* Get Started Button */}
            <GetStartedButton/>
        </div>


    )
}
