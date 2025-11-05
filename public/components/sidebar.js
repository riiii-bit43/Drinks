class CustomSidebar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        aside {
          width: 220px;
          background: linear-gradient(to bottom, #f9a8d4, #93c5fd);
          padding: 1.2rem;
          height: calc(100vh - 140px);
          position: sticky;
          top: 80px;
          border-right: 1px solid #e5e7eb;
          font-family: 'Quicksand', sans-serif;
        }
.search-box {
          margin-bottom: 1.5rem;
        }
        .search-input {
          width: 100%;
          padding: 0.6rem;
          border-radius: 20px;
          border: none;
          background: rgba(255, 255, 255, 0.7);
          font-family: 'Quicksand', sans-serif;
          padding-left: 2rem;
          font-size: 0.9rem;
        }
        .search-icon {
          position: absolute;
          left: 0.8rem;
          top: 0.6rem;
          color: #7e22ce;
          width: 18px;
          height: 18px;
        }
.sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .sidebar-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: #4c1d95;
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .sidebar-link:hover, .sidebar-link.active {
          background: rgba(255, 255, 255, 0.5);
          color: #7e22ce;
        }
        
        .sidebar-link i {
          margin-right: 0.75rem;
          width: 20px;
          text-align: center;
        }
        
        h3 {
          font-family: 'Press Start 2P', cursive;
          font-size: 0.8rem;
          color: #4c1d95;
          margin: 1.5rem 0 0.5rem 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      </style>
      
      <aside>
        <div class="search-box relative">
          <i data-feather="search" class="search-icon"></i>
          <input type="text" placeholder="Search forum..." class="search-input">
        </div>
        
        <div class="sidebar-nav">
          <h3>Categories</h3>
          <a href="#" class="sidebar-link active">
            <i data-feather="message-square"></i>
            All Posts
          </a>
          <a href="#" class="sidebar-link">
            <i data-feather="users"></i>
            General Chat
          </a>
          <a href="#" class="sidebar-link">
            <i data-feather="lightbulb"></i>
            Suggestions
          </a>
          <a href="#" class="sidebar-link">
            <i data-feather="calendar"></i>
            Events
          </a>
          <a href="#" class="sidebar-link">
            <i data-feather="help-circle"></i>
            Questions
          </a>
        </div>
      </aside>
    `;
  }
}

customElements.define('custom-sidebar', CustomSidebar);