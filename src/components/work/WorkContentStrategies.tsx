"use client";

import Image from "next/image";

interface WorkContentStrategiesProps {
  strategies: {
    title: string;
    description: string;
    images: string[];
  }[];
  bestContent: {
    title: string;
    description: string;
    videos: {
      image: string;
      stats: {
        views: string;
        engagement: string;
        reach: string;
        comments: string;
        saves: string;
      };
    }[];
  };
}

export const WorkContentStrategies = ({ strategies, bestContent }: WorkContentStrategiesProps) => {
  const isVideo = (url: string) => {
    return url.includes('.webm') || url.includes('.mp4') || url.includes('.mov');
  };

  return (
    <section className="py-24 bg-surface-background">
      <div className="max-w-[95vw] mx-auto px-6">
        {/* Main Title - Centered */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary">
            Organic Strategies & Result Details
          </h2>
        </div>

        <hr className="border-border-primary mb-16" />

        {/* First Content Strategy Section */}
        {strategies[0] && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 mb-16">
            <div>
              <h3 className="text-4xl sm:text-5xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary leading-tight">
                {strategies[0].title}
              </h3>
            </div>
            
            <div className="space-y-8">
              <p className="flex items-start gap-3 text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                {strategies[0].description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {strategies[0].images.map((image, index) => (
                  <div key={`${image}-${index}`} className="aspect-square rounded-lg overflow-hidden">
                    {isVideo(image) ? (
                      <video
                        src={image}
                        className="w-full h-full object-contain"
                        controls
                        muted
                      />
                    ) : (
                      <Image
                        src={image}
                        alt={`${strategies[0].title} ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Best Organic Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 mb-16">
          <div>
            <h3 className="text-4xl sm:text-5xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary leading-tight">
              {bestContent.title}
            </h3>
          </div>
          
          <div className="space-y-8">
            <p className="flex items-start gap-3 text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
              {bestContent.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bestContent.videos.map((video, index) => (
                <div key={video.image} className="flex gap-4 items-center">
                  <div className="w-1/3 md:w-auto aspect-square rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={video.image}
                      alt={`${bestContent.title} ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-col justify-center space-y-1 flex items-start gap-3 text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                    <div><span className="font-bold">{video.stats.views}</span> Plays</div>
                    <div><span className="font-bold">{video.stats.engagement}</span> Likes</div>
                    <div><span className="font-bold">{video.stats.comments}</span> Comment</div>
                    <div><span className="font-bold">{video.stats.reach}</span> Shares</div>
                    <div><span className="font-bold">{video.stats.saves}</span> Saves</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Content Strategy Section */}
        {strategies[1] && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 mb-16">
            <div>
              <h3 className="text-4xl sm:text-5xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary leading-tight">
                {strategies[1].title}
              </h3>
            </div>
            
            <div className="space-y-8">
              <p className="flex items-start gap-3 text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                {strategies[1].description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-none">
                {strategies[1].images.map((image, index) => (
                  <div key={`${image}-${index}`} className="space-y-2">
                    <div className="aspect-[9/16] rounded-lg overflow-hidden">
                      {isVideo(image) ? (
                        <video
                          src={image}
                          className="w-full h-full object-contain"
                          controls
                          muted
                        />
                      ) : (
                        <Image
                          src={image}
                          alt={`${strategies[1].title} ${index + 1}`}
                          width={250}
                          height={444}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <p className="text-center text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                      {index === 0 ? "Before" : "After"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
