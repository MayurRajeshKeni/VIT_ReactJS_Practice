import React, { useState } from 'react';

const WEB_LA4_Q3 = () => {
  // Array of dynamic image sources (using high-quality placeholders)
  const images = [
    { id: 1, url: 'https://picsum.photos/id/10/600/400', title: 'Forest' },
    { id: 2, url: 'https://picsum.photos/id/20/600/400', title: 'Desktop' },
    { id: 3, url: 'https://picsum.photos/id/28/600/400', title: 'Forest Road' },
    { id: 4, url: 'https://picsum.photos/id/48/600/400', title: 'Computer' },
  ];

  // useState Hook to track the currently selected/previewed image
  const [selectedImg, setSelectedImg] = useState(images[0].url);

  return (
    <div style={{ 
      border: '3px solid DarkSlateGrey', 
      padding: '30px', 
      borderRadius: '20px', 
      backgroundColor: 'GhostWhite',
      maxWidth: '650px',
      margin: '40px auto',
      fontFamily: 'Verdana',
      textAlign: 'center'
    }}>
      {/* Student Identification Header */}
      <div style={{ borderBottom: '2px solid Silver', marginBottom: '20px', paddingBottom: '10px' }}>
        <h3 style={{ margin: '0', color: 'MidnightBlue' }}>Lab Assessment 4</h3>
        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>NAME: MAYUR R KENI</p>
        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>REG NO: 24BCE0686</p>
      </div>

      <h2 style={{ color: 'Teal' }}>Interactive Image Gallery</h2>

      {/* Large Preview Display */}
      <div style={{ marginBottom: '20px', overflow: 'hidden', borderRadius: '10px' }}>
        <img 
          src={selectedImg} 
          alt="Preview" 
          style={{ 
            width: '100%', 
            height: '300px', 
            objectFit: 'cover', 
            transition: 'transform 0.5s ease',
            border: '5px solid White',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }} 
        />
      </div>

      {/* Thumbnail Gallery using Flexbox */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px', 
        flexWrap: 'wrap' 
      }}>
        {images.map((img) => (
          <img 
            key={img.id} 
            src={img.url} 
            alt={img.title}
            onClick={() => setSelectedImg(img.url)}
            style={{ 
              width: '100px', 
              height: '70px', 
              cursor: 'pointer', 
              borderRadius: '5px',
              border: selectedImg === img.url ? '3px solid Teal' : '2px solid Grey',
              transition: 'transform 0.3s ease',
              opacity: selectedImg === img.url ? 1 : 0.7
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        ))}
      </div>
    </div>
  );
};

export default WEB_LA4_Q3;