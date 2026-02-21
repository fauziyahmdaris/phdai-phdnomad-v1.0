#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdToPdf } from 'md-to-pdf';
import { AlignmentType, Document, Footer, Header, Media, Packer, Paragraph, TextRun } from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.resolve(__dirname, '../templates');
const outDir = path.resolve(__dirname, '../public/downloads');

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
}

function mdToDocxParagraphs(markdown) {
  const lines = markdown.split(/\r?\n/);
  const paras = [];
  for (const line of lines) {
    const text = line.replace(/^\s*#+\s*/, '') // strip headings
                     .replace(/^\s*-\s*/, '• ') // bullets
                     .replace(/^\s*\d+\.\s*/, (m) => m); // keep ordered prefix
    paras.push(new Paragraph({ children: [new TextRun(text)] }));
  }
  return paras;
}

async function writeDocx(markdown, outPath, title, subTitle) {
  const children = [];
  // Title
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: 'Welcome to DrPhDAI', bold: true, size: 32 }),
    ],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: "The world's first AI-Powered Thesis Writing Coach and AI-Empowered Research Supervisor by Fauziyah Md Aris (Qash Aris)", italics: true, size: 22 }),
    ],
  }));
  if (subTitle) {
    children.push(new Paragraph({
      spacing: { after: 200 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: subTitle, bold: true, size: 24 })],
    }));
  }
  // Body
  children.push(...mdToDocxParagraphs(markdown));

  const footer = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: 'Copyright © 2025 Fauziyah Md Aris (Qash Aris), Global International Technology Sdn Bhd (1239026-H). All rights reserved.',
            size: 18,
          }),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 680, right: 680 }, // ~1 inch top/bottom, ~0.95 inch sides
          },
        },
        footers: { default: footer },
        children,
      },
    ],
  });
  const buffer = await Packer.toBuffer(doc);
  await fs.promises.writeFile(outPath, buffer);
}

async function generateFromMarkdown(mdFile) {
  const baseName = path.basename(mdFile, '.md');
  const mdPath = path.join(templatesDir, mdFile);
  const content = await fs.promises.readFile(mdPath, 'utf8');
  const logoSvgPath = path.resolve(__dirname, '../public/logo-owl.svg');
  const logoPngPath = path.resolve(__dirname, '../public/logo-owl.png');
  const logoPath = fs.existsSync(logoSvgPath) ? logoSvgPath : (fs.existsSync(logoPngPath) ? logoPngPath : null);
  const css = `
    @page { margin: 20mm 18mm; }
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
    h1, h2, h3 { color: #111827; }
    .doc-header { text-align: center; margin-bottom: 8mm; }
    .doc-title { font-size: 20pt; font-weight: 700; }
    .doc-subtitle { font-size: 13pt; font-style: italic; color: #374151; }
    .doc-section { text-align: center; font-size: 14pt; font-weight: 700; margin-top: 6mm; }
    .footer { position: fixed; bottom: 10mm; left: 0; right: 0; text-align: center; font-size: 9pt; color: #4b5563; }
    img.logo { display:block; margin: 0 auto 8px auto; height: 40px; }
  `;
  const subtitleMap = {
    'annotation-rubric': 'Annotation Rubric (Module 1)',
    'critical-appraisal-checklist': 'Critical Appraisal Checklist (Module 1)',
    'module1-offline': 'Module 1 Offline Pack (MVP)',
    'synthesis-matrix': 'Synthesis Matrix (Module 1)',
    'bias-appraisal': 'Bias Appraisal Checklist (Module 1)'
  };
  const subTitle = subtitleMap[baseName] || '';
  const headerHtml = `
    <div class="doc-header">
      ${logoPath ? `<img class="logo" src="${path.relative(process.cwd(), logoPath)}" />` : ''}
      <div class="doc-title">Welcome to DrPhDAI</div>
      <div class="doc-subtitle">The world's first AI-Powered Thesis Writing Coach and AI-Empowered Research Supervisor by Fauziyah Md Aris (Qash Aris)</div>
      ${subTitle ? `<div class="doc-section">${subTitle}</div>` : ''}
    </div>
  `;
  const footerHtml = `
    <div class="footer">Copyright © 2025 Fauziyah Md Aris (Qash Aris), Global International Technology Sdn Bhd (1239026-H). All rights reserved.</div>
  `;

  // PDF
  const pdfOut = path.join(outDir, `${baseName}.pdf`);
  await mdToPdf(
    { content: `${headerHtml}\n${content}\n${footerHtml}` },
    {
      dest: pdfOut,
      css,
      pdf_options: {
        margin: { top: '20mm', bottom: '20mm', left: '18mm', right: '18mm' },
        printBackground: true,
      },
    }
  );

  // DOCX (basic conversion)
  const docxOut = path.join(outDir, `${baseName}.docx`);
  await writeDocx(content, docxOut, 'Welcome to DrPhDAI', subTitle);

  console.log(`Generated: ${baseName}.pdf, ${baseName}.docx`);
}

async function main() {
  await ensureDir(outDir);

  const entries = await fs.promises.readdir(templatesDir);
  const mdFiles = entries.filter((f) => f.endsWith('.md'));

  for (const mdFile of mdFiles) {
    await generateFromMarkdown(mdFile);
  }

  // Also convert existing offline pack markdown in downloads
  const offlineMd = path.resolve(outDir, 'module1-offline.md');
  if (fs.existsSync(offlineMd)) {
    const content = await fs.promises.readFile(offlineMd, 'utf8');
    const subTitle = 'Module 1 Offline Pack (MVP)';
    await mdToPdf(
      { content: `${content}` },
      { dest: path.resolve(outDir, 'module1-offline.pdf'), css: 'body{font-family: system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;}', pdf_options: { margin: { top: '20mm', bottom: '20mm', left: '18mm', right: '18mm' }, printBackground: true } }
    );
    await writeDocx(content, path.resolve(outDir, 'module1-offline.docx'), 'Welcome to DrPhDAI', subTitle);
    console.log('Generated: module1-offline.pdf, module1-offline.docx');
  }

  // Convert PRISMA flow SVG to PDF
  const prismaSvg = path.resolve(outDir, 'prisma-flow.svg');
  if (fs.existsSync(prismaSvg)) {
    const svgContent = await fs.promises.readFile(prismaSvg, 'utf8');
    const css = 'body{margin:0;padding:0}';
    await mdToPdf({ content: `${svgContent}` }, { dest: path.resolve(outDir, 'prisma-flow.pdf'), css, pdf_options: { printBackground: true } });
    console.log('Generated: prisma-flow.pdf');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
