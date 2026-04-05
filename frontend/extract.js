const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const outputDir = './public';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting frames from mp4...');

ffmpeg('../../Gavel_striking_base_202604051449.mp4')
  .outputOptions([
    '-start_number 0',
    '-vframes 56'
  ])
  .on('end', () => console.log('Extracted frames successfully'))
  .on('error', (err) => console.error('Error extracting frames:', err))
  .save(`${outputDir}/ezgif-frame-%d.png`);
