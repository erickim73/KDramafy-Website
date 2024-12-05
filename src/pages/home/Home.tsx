import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Type definitions
type Picture = {
    title: string;
    src: string;
    alt: string;
};

// Variants for animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
    },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
  },
};

const pictureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
    },
    },
};

function useScrollAnimation () {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, amount: 0.3 })
    
    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return {ref, controls}
}

export const Home = () => {
    const pictures: Picture[] = [
        {
        title: "Crash Landing On You",
        src: "https://m.media-amazon.com/images/M/MV5BZjM3ZGQ4ZTMtOTNjMS00NmJlLTljMWUtNWExMzJhMGJlMWNiXkEyXkFqcGc@._V1_FMjpg_UY720_.jpg",
        alt: "Crash Landing On You",
        },
        {
        title: "Queen of Tears",
        src: "https://m.media-amazon.com/images/M/MV5BNWNmYmQ2NzctNTA1NS00NGU2LThjOTQtYTgxNmUyYmNjODYyXkEyXkFqcGc@._V1_FMjpg_UY720_.jpg",
        alt: "Queen of Tears",
        },
        {
        title: "Squid Game",
        src: "https://m.media-amazon.com/images/M/MV5BNTEyNWMzYWItNWY0OS00MjBkLWExMzctZTViNjVhMjA1MWM2XkEyXkFqcGc@._V1_FMjpg_UY720_.jpg",
        alt: "Squid Game",
        },
        {
        title: "Reply 1988",
        src: "https://m.media-amazon.com/images/M/MV5BYjhjYjg1MTYtYjNhYy00YjU2LTliZmEtMWRmZDhjODdkOTE0XkEyXkFqcGc@._V1_FMjpg_UX426_.jpg",
        alt: "Reply 1988",
        },
    ];

    const controls = useAnimation();

    useEffect(() => {
        window.scrollTo(0, 0);
        controls.start("visible");
    }, [controls]);

    return (
        <div className="min-h-screen overflow-hidden">
            <div className="bg-[#081014] min-h-screen flex flex-col text-white relative">
                <main className="relative z-10 flex flex-col items-center justify-center flex-grow p-4">
                    <BackgroundElements />
                    <Slogan />
                    <MainMessage />
                    <SecondaryMessage />
                    <GetStartedButton />
                    <PictureGrid pictures={pictures}  />
                </main>                
            </div>
        </div>
    );
};

// Background elements with animated blobs
export const BackgroundElements = () => (
    <>
        <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-[#6a5acd] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
            className="absolute top-40 right-10 w-72 h-72 bg-[#b293d3] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
            className="absolute bottom-20 left-1/4 w-72 h-72 bg-[#836ab6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
    </>
);

// Slogan with animated gradient text
const Slogan = () => (
    <motion.div
        className="relative p-[2px] rounded-full bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3] mb-10 mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        >
            <span className="block bg-[#081014] rounded-full px-6 py-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3] font-semibold">
                Discover Your Perfect K-Drama Today
                </span>
            </span>
    </motion.div>
);

// Main message with title
const MainMessage = () => (
    <motion.div
        className="w-11/12 mb-8 space-y-6 text-5xl font-bold text-center md:text-6xl font-montserrat"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        >
        <motion.div className="text-gray-200" variants={itemVariants}>
            KDramafy, a new destination
        </motion.div>
        <motion.div
            className="bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3] inline-block text-transparent bg-clip-text py-2"
            variants={itemVariants}
        >
            for all K-Drama lovers
        </motion.div>
    </motion.div>
);

// Secondary message under the main message
const SecondaryMessage = () => (
    <motion.div
        className="mb-6 space-y-1 text-lg text-center text-gray-400 font-montserrat"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        >
        <div>Discover Your Perfect K-Drama Match: Unlimited K-Drama</div>
        <div>Recommendations, Custom Watchlists, and More</div>
    </motion.div>
);

const GetStartedButton = () => (
    <Link to="/signup">
        <motion.div
            className="relative flex items-center justify-center w-max p-[2px] rounded-xl overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Rotating background */}
            <motion.div
                className="absolute inset-0 h-full w-full bg-[conic-gradient(#6a5acd_160deg,transparent_120deg)] animate-rotate rounded-full"
            />
        
            {/* Button container */}
            <div className="relative z-10 flex items-center justify-center w-max rounded-xl bg-slate-900 p-[2px]">
                <button
                    className="font-montserrat rounded-xl font-medium px-7 py-4 transition duration-300 ease-in-out bg-gradient-to-r from-[#6a5acd] via-[#836ab6] to-[#b293d3] text-white shadow-lg"
                >
                    Get Started
                </button>
            </div>
        </motion.div>
    </Link>
);


const PictureGrid: React.FC<{ pictures: Picture[] }> = ({ pictures }) => {
    const { ref, controls } = useScrollAnimation();
  
    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2
          className="mt-16 mb-2 text-3xl font-medium text-center font-montserrat"
          variants={itemVariants}
        >
          Popular Dramas
        </motion.h2>
        <motion.div
          className="grid w-full max-w-6xl grid-cols-2 gap-4 py-2 md:grid-cols-4"
          variants={containerVariants}
        >
          {pictures.map((picture) => (
            <motion.div
              key={picture.title}
              className="flex flex-col items-center"
              variants={pictureVariants}
            >
            {picture.title}
              <motion.div
                className="relative w-full overflow-hidden text-center shadow-lg rounded-xl"
              >
                <img
                  src={picture.src}
                  alt={picture.alt}
                  className="object-cover w-full h-full rounded-xl"
                />
              </motion.div>
              <motion.p
                className="mt-2 text-sm font-medium text-center text-gray-300"
                variants={itemVariants}
              >
                
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  };
      