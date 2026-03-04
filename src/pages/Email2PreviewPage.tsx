import { useState, useEffect } from 'react';
import { Download, Copy, ExternalLink, Check } from 'lucide-react';
import { downloadEmailZip } from '../utils/downloadEmailZip';

export default function Email2PreviewPage() {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('');
  const [emailHtml, setEmailHtml] = useState('');
  const emailPath = '/emails/email2.html';

  useEffect(() => {
    fetch(emailPath)
      .then((res) => res.text())
      .then((html) => {
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        setEmailHtml(bodyMatch ? bodyMatch[1] : html);
      });
  }, []);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadEmailZip(emailPath, 'email2-template.zip', setDownloadStatus);
    } catch (error) {
      console.error('Error downloading email:', error);
    } finally {
      setDownloading(false);
      setDownloadStatus('');
    }
  };

  const handleCopyCode = async () => {
    try {
      const response = await fetch(emailPath);
      const htmlContent = await response.text();
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying code:', error);
    }
  };

  const handleOpenInNewTab = () => {
    window.open(emailPath, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ backgroundColor: '#ffffff', borderBottom: '3px solid #2E6B8A', padding: '20px 32px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#2C4A6E', margin: 0, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>OWNER FEEDBACK GETAWAY</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '400', color: '#4A5568', letterSpacing: '1px', textTransform: 'uppercase' }}>CALL TO ACTIVATE</span>
              <a href="tel:3862621090" style={{ fontSize: '24px', fontWeight: '700', color: '#2C4A6E', textDecoration: 'none', fontFamily: 'Georgia, serif' }}>(386) 262-1090</a>
            </div>
            <div style={{ width: '1px', height: '28px', backgroundColor: '#CBD5E0' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleDownload}
                disabled={downloading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: downloading ? '#94a3b8' : '#2E6B8A',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: downloading ? 'wait' : 'pointer',
                  transition: 'background-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseOver={(e) => { if (!downloading) e.currentTarget.style.backgroundColor = '#1e5570'; }}
                onMouseOut={(e) => { if (!downloading) e.currentTarget.style.backgroundColor = '#2E6B8A'; }}
              >
                <Download size={15} />
                {downloading ? downloadStatus || 'Preparing...' : 'Download ZIP'}
              </button>

              <button
                onClick={handleCopyCode}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: copied ? '#10b981' : '#E8712B',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseOver={(e) => { if (!copied) e.currentTarget.style.backgroundColor = '#d4611f'; }}
                onMouseOut={(e) => { if (!copied) e.currentTarget.style.backgroundColor = '#E8712B'; }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>

              <button
                onClick={handleOpenInNewTab}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: '#4A5568',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2D3748'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4A5568'}
              >
                <ExternalLink size={15} />
                Open
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        <div
          style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}
          dangerouslySetInnerHTML={{ __html: emailHtml }}
        />
      </div>
    </div>
  );
}
