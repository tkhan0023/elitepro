import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Pause, Play } from 'lucide-react';

const HeroBanner = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      <div className="absolute inset-0">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
            style={{
              transform: 'scale(1.05)',
              objectPosition: 'center 30%'
            }}
          >
            <source 
              src="https://www.shutterstock.com/shutterstock/videos/3426520005/preview/stock-footage-women-walking-with-confidence-fashion-and-friends-outdoor-with-streetwear-and-sneakers-young.webm" 
              type="video/webm" 
            />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 transition-opacity duration-1000"></div>
      </div>
      
      <div className={`relative z-10 h-full flex items-center justify-center text-center text-white transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 transform transition-all duration-700 hover:scale-105">
            Fashion Forward
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 transform transition-all duration-700 hover:scale-105">
            Discover the latest trends in fashion, beauty, and lifestyle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/men/shirts" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Shop Men
            </Link>
            <Link 
              to="/women/sarees" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-white"
            >
              Shop Women
            </Link>
          </div>
        </div>
      </div>

      <button 
        onClick={togglePlay}
        className="absolute top-6 right-6 z-20 bg-black/30 hover:bg-black/50 text-white p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
    </section>
  );
};

export default HeroBanner;
