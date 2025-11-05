class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: linear-gradient(135deg, #93c5fd 0%, #f9a8d4 100%);
          color: #4c1d95;
          padding: 2rem;
          text-align: center;
          font-family: 'Quicksand', sans-serif;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .footer-icon {
          width: 80px;
          height: 80px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .footer-icon img {
          width: 90%;
          height: 90%;
        }
        .footer-text {
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .copyright {
          margin-top: 2rem;
          font-size: 0.8rem;
          color: #5b21b6;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
        }
      </style>
      
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-icon">
              <img src="https://huggingface.co/spaces/meghaiiiiiiiiii/retro-sip-pixel-bliss-caf/resolve/main/images/7%202.png" alt="Our Digital Space">
            </div>
<div class="footer-text font-pixel">
              Our Digital Space<br>
              Since Forever Ago
            </div>
          </div>
          
          <div class="footer-section">
            <div class="footer-icon">
              <img src="https://huggingface.co/spaces/meghaiiiiiiiiii/retro-sip-pixel-bliss-caf/resolve/main/images/8%201.png" alt="Friends Memories">
            </div>
<div class="footer-text font-pixel">
              Friends Memories<br>
              Privacy Terms
            </div>
          </div>
          
          <div class="footer-section">
            <div class="footer-icon">
              <img src="https://huggingface.co/spaces/meghaiiiiiiiiii/retro-sip-pixel-bliss-caf/resolve/main/images/9%201.png" alt="Creator By Heart">
            </div>
<div class="footer-text font-pixel">
              Creator By Heart<br>
              A Gift For You!
            </div>
          </div>
        </div>
        
        <div class="copyright">
          &copy; 2024 Retro Sip Café. All pixels preserved.
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);