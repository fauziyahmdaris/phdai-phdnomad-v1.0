#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadsDir = path.resolve(__dirname, '../public/downloads');
const outZip = path.resolve(downloadsDir, 'module1-templates.zip');

// Minimal zip-like archive using tar.gz is more standard, but Windows prefers zip.
// To avoid native deps, we'll generate a simple zip using JS (store method) to keep MVP simple.

async function buildZip(files, outPath) {
  // Simple store-only ZIP writer
  const write = fs.createWriteStream(outPath);
  const encoder = new TextEncoder();

  function dosDate(ts = new Date()) {
    const year = ts.getFullYear();
    const dosYear = Math.max(0, year - 1980);
    return {
      time: ((ts.getHours() << 11) | (ts.getMinutes() << 5) | (Math.floor(ts.getSeconds() / 2))) & 0xffff,
      date: ((dosYear << 9) | ((ts.getMonth() + 1) << 5) | ts.getDate()) & 0xffff,
    };
  }

  const central = [];
  let offset = 0;

  for (const rel of files) {
    const filePath = path.resolve(downloadsDir, rel);
    const data = await fs.promises.readFile(filePath);
    const nameBytes = encoder.encode(rel.replace(/\\/g, '/'));
    const { time, date } = dosDate();

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0); // Local file header signature
    localHeader.writeUInt16LE(20, 4); // version needed to extract
    localHeader.writeUInt16LE(0, 6); // general purpose bit flag
    localHeader.writeUInt16LE(0, 8); // compression method: 0 = store
    localHeader.writeUInt16LE(time, 10);
    localHeader.writeUInt16LE(date, 12);
    localHeader.writeUInt32LE(0, 14); // CRC (ignored for MVP)
    localHeader.writeUInt32LE(data.length, 18); // compressed size
    localHeader.writeUInt32LE(data.length, 22); // uncompressed size
    localHeader.writeUInt16LE(nameBytes.length, 26);
    localHeader.writeUInt16LE(0, 28); // extra length

    write.write(localHeader);
    write.write(Buffer.from(nameBytes));
    write.write(data);

    central.push({ nameBytes, data, time, date, offset, size: data.length });
    offset += localHeader.length + nameBytes.length + data.length;
  }

  const centralStart = offset;
  for (const entry of central) {
    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0); // Central file header signature
    centralHeader.writeUInt16LE(20, 4); // version made by
    centralHeader.writeUInt16LE(20, 6); // version needed
    centralHeader.writeUInt16LE(0, 8); // flags
    centralHeader.writeUInt16LE(0, 10); // method store
    centralHeader.writeUInt16LE(entry.time, 12);
    centralHeader.writeUInt16LE(entry.date, 14);
    centralHeader.writeUInt32LE(0, 16); // CRC (ignored)
    centralHeader.writeUInt32LE(entry.size, 20); // comp size
    centralHeader.writeUInt32LE(entry.size, 24); // uncomp size
    centralHeader.writeUInt16LE(entry.nameBytes.length, 28);
    centralHeader.writeUInt16LE(0, 30); // extra len
    centralHeader.writeUInt16LE(0, 32); // comment len
    centralHeader.writeUInt16LE(0, 34); // disk number
    centralHeader.writeUInt16LE(0, 36); // internal attr
    centralHeader.writeUInt32LE(0, 38); // external attr
    centralHeader.writeUInt32LE(entry.offset, 42);

    write.write(centralHeader);
    write.write(Buffer.from(entry.nameBytes));
  }

  const centralEnd = offset + (central.reduce((acc, e) => acc + 46 + e.nameBytes.length, 0));
  const endRec = Buffer.alloc(22);
  endRec.writeUInt32LE(0x06054b50, 0); // End of central dir signature
  endRec.writeUInt16LE(0, 4); // disk number
  endRec.writeUInt16LE(0, 6); // disk with start of central dir
  endRec.writeUInt16LE(central.length, 8); // number of entries on this disk
  endRec.writeUInt16LE(central.length, 10); // total entries
  endRec.writeUInt32LE(centralEnd - centralStart, 12); // size of central directory
  endRec.writeUInt32LE(centralStart, 16); // offset of start of central dir
  endRec.writeUInt16LE(0, 20); // comment length

  write.write(endRec);
  await new Promise((res) => write.end(res));
}

async function main() {
  const files = [
    'annotation-rubric.pdf',
    'annotation-rubric.docx',
    'critical-appraisal-checklist.pdf',
    'critical-appraisal-checklist.docx',
    'module1-offline.pdf',
    'module1-offline.docx',
    'lr-matrix-template.csv',
    'lr-screening-sheet.csv',
    'search-strategy-log.csv',
    'synthesis-matrix.csv',
    'data-extraction.csv',
    'prisma-flow.pdf',
    'prisma-flow.svg'
  ].filter((f) => fs.existsSync(path.resolve(downloadsDir, f)));

  await buildZip(files, outZip);
  console.log(`Created: ${outZip}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
