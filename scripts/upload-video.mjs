// scripts/upload-video.js
import { put } from '@vercel/blob';
import { readFileSync } from 'fs';

const token = '';
const videoPath = '../Desktop/whale-creek-drone-footy.mov';

try {
  const file = readFileSync(videoPath);
  
  const blob = await put('whale-creek-drone-footy.mov', file, {
    access: 'public',
    token: token,
  });

  console.log('Video uploaded successfully!');
  console.log('URL:', blob.url);
} catch (error) {
  console.error('Upload failed:', error);
}