import { motion } from 'framer-motion';

export interface KDrama{
    Name: string;
    "Korean Name"?: string;
    "Release Year": number;
    "Age Rating"?: string;
    Duration?: string;
    Episodes: number;
    Seasons: number;
    Rating: number;
    "Number of Ratings": string;
    "Poster Link": string;
    Genres: string;
    Description: string;
    Stars?: string;
    "Streaming Services"?: string;
}

const streamingPlatformData: Record<string, { logo: string }> = {
    Netflix: {
      logo: "https://m.media-amazon.com/images/M/9516b142-0c88-4475-a39b-97c06546cdc5._V1_UX1000_CR0,0,1000,563_.png",
    },
    "Tubi": {
      logo: "https://m.media-amazon.com/images/M/827c565d-983a-4f0e-8927-d107d1f30a56._V1_UX1000_CR0,0,1000,563_.png",
    },
    "The Roku Channel": {
      logo: "https://m.media-amazon.com/images/M/c85bfc80-aca5-440e-948b-e76bbe0eae50._V1_UX1000_CR0,0,1000,563_.png",
    },
    "Prime Video": {
        logo: "https://m.media-amazon.com/images/M/75f35a85-7a6e-4f1f-bf8b-e4c8556bc4e4._V1_UX1000_CR0,0,1000,563_.png",
    },
    Hulu: {
        logo: "https://m.media-amazon.com/images/M/67022a68-fde3-4078-8bd0-0ebc72efe8ad._V1_UX1000_CR0,0,1000,563_.png",
    },
    Freevee: {
        logo: "https://m.media-amazon.com/images/M/65662a3b-47eb-4271-9830-773014309b44._V1_UX1000_CR0,0,1000,563_.png",
    }
  };


export function KDramaCard({ kdrama }: { kdrama: KDrama }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105"
    >
      <img
        src={kdrama["Poster Link"]}
        alt={`${kdrama.Name} Poster`}
        className="w-full h-98 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{kdrama.Name} ({kdrama["Korean Name"]})</h3>
        
        <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">
          <span className="font-medium">Year:</span> {kdrama["Release Year"]}
        </p>
        <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">
          <span className="font-medium">Rating:</span> {kdrama.Rating} ⭐ ({kdrama["Number of Ratings"]})
        </p>
        <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">
          <span className="font-medium">Episodes:</span> {kdrama.Episodes}
        </p>
        <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
          <span className="font-medium">Genres:</span> {kdrama.Genres}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{kdrama.Description}</p>
        
        {/* Streaming Services */}
        {kdrama["Streaming Services"] && (
          <div className="mt-4">
            <span className="text-sm font-semibold mb-2 text-gray-800 dark:text-white">Watch on:</span>
            <div className="flex flex-wrap justify-left gap-4 mt-2">
                {kdrama["Streaming Services"].split(", ").map((service, index) => {
                const match = service.match(/Watch on (.+?) \((https?:\/\/.+?)\)/);
                if (match) {
                    const platform = match[1]; // Extract platform name
                    const url = match[2]; // Extract URL
                    const platformData = streamingPlatformData[platform];

                    return (
                    <a
                        key={`${platform}-${index}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block ml-2"
                    >
                        {platformData ? (
                            <div className = "relative w-16 h-9 mt-2 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                                <img
                                src={platformData.logo}
                                alt={`${platform} logo`}
                                className="h-10 w-auto hover:scale-110 transition-transform duration-200"
                            />
                            </div>
                        ) : (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                            {platform}
                        </span>
                        )}
                    </a>
                    );
                }
                return null;
                })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

