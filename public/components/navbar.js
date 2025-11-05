class CustomNavbar extends HTMLElement {
  async connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: linear-gradient(135deg, #f9a8d4 0%, #93c5fd 100%);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-family: 'Quicksand', sans-serif;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          border-radius: 8px;
        }

        .tagline {
          font-size: 0.8rem;
          color: #4c1d95;
          font-style: italic;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        a {
          color: #4c1d95;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
          position: relative;
        }

        a:hover {
          color: #7e22ce;
        }

        a:hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #7e22ce;
          animation: underline 0.3s ease-out;
        }

        @keyframes underline {
          from { width: 0; }
          to { width: 100%; }
        }

        .sign-in, .logout-btn {
          background-color: #f0abfc;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          color: #4c1d95;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          font-weight: 600;
        }

        .sign-in:hover, .logout-btn:hover {
          background-color: #e879f9;
        }

        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          .brand {
            flex-direction: column;
            text-align: center;
          }

          .nav-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      </style>

      <nav>
        <div class="brand">
          <img src="https://huggingface.co/spaces/meghaiiiiiiiiii/retro-sip-pixel-bliss-caf/resolve/main/images/Creator%20By%20Heart%201.png" alt="Retro Sip Logo" class="logo-img">
          <div>
            <div class="font-pixel text-lg">RETRO SIP</div>
            <div class="tagline">Serving flavours and friendships since 2008</div>
          </div>
        </div>

        <div class="nav-links">
          <a href="/">HOME</a>
          <a href="gallery.html">GALLERY</a>
          <a href="forum.html">FORUM</a>
          <a id="auth-link" href="../auth.html" class="sign-in">SIGN IN</a>
        </div>
      </nav>
    `;

    //Load Supabase SDK dynamically for Shadow DOM
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.onload = () => this.initSupabase();
    this.shadowRoot.appendChild(script);
  }

  async initSupabase() {
    //Initialize with the correct Supabase project credentials
    const { createClient } = supabase;
    this.client = createClient(
      'https://ubqwiuybjgffeszclegc.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicXdpdXliamdmZmVzemNsZWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMDk3MDYsImV4cCI6MjA3Njg4NTcwNn0.Z6RXO47KVmD3cIZuJgXAnME1xIVZ8Dj8iy3CqPJEVg0'
    );
    
    const authLink = this.shadowRoot.getElementById('auth-link');

    //Helper to update navbar state
    const updateNavbar = (user) => {
      if (user) {
        // User is logged in → show Logout
        authLink.textContent = 'LOGOUT';
        authLink.removeAttribute('href');
        authLink.classList.remove('sign-in');
        authLink.classList.add('logout-btn');

        if (!authLink.dataset.logoutListener) {
          authLink.addEventListener('click', () => this.logout());
          authLink.dataset.logoutListener = 'true';
        }
      } else {
        //User not logged in → show Sign In
        authLink.textContent = 'SIGN IN';
        authLink.setAttribute('href', '../auth.html');
        authLink.classList.remove('logout-btn');
        authLink.classList.add('sign-in');
        authLink.removeEventListener('click', () => this.logout());
        delete authLink.dataset.logoutListener;
      }
    };

    //Check current session immediately (so the correct button shows on page load)
    const { data } = await this.client.auth.getSession();
    updateNavbar(data?.session?.user);

    //Listen for login/logout events dynamically
    this.client.auth.onAuthStateChange((_event, session) => {
      updateNavbar(session?.user);
    });
  }

  //Logout handler
  async logout() {
    if (!this.client) return;
    await this.client.auth.signOut();
    window.location.href = 'auth.html';
  }
}

customElements.define('custom-navbar', CustomNavbar);
