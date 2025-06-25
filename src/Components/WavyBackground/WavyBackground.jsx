import React from 'react';

const WavyBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      {/* Top Wave */}
      <div 
        className="absolute top-[20%] -left-1/4 w-[100%] h-48 bg-contain bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 60 Q 250 -20, 500 60 T 1000 60 T 1500 60 T 2000 60' stroke='%23FBBF24' fill='transparent' stroke-width='8'/%3e%3c/svg%3e")`,
        }}
      ></div>
      {/* Bottom Wave */}
      <div 
        className="absolute bottom-[20%] -right-1/4 w-[100%] h-48 bg-contain bg-no-repeat opacity-80"
         style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 60 Q 250 140, 500 60 T 1000 60 T 1500 60 T 2000 60' stroke='%23FBBF24' fill='transparent' stroke-width='8'/%3e%3c/svg%3e")`,
        }}
      ></div>
    </div>
  );
};

export default WavyBackground;