import React from 'react';

export const Pictures = () => {
    const pictures = [
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

  return (
    <div className="flex items-stretch justify-center py-6 space-x-4 font-montserrat">
        {pictures.map((picture) => (
        <PictureCard key={picture.title} {...picture} />
        ))}
    </div>
  );
}

interface PictureCardProps {
    title: string;
    src: string;
    alt: string;
}

function PictureCard({ title, src, alt }: PictureCardProps) {
    return (
        <div className="flex flex-col items-center w-1/4 max-w-xs mt-10">
            <label className="mt-2 text-sm font-medium text-center">{title}</label>
            <img src={src} alt={alt} className="object-cover w-full h-auto mb-2 shadow-md rounded-xl" />
        </div>
    );
}
