// All project data — used by project.html for rendering
const PROJECTS = {
  'intro': {
    title: 'INTRO',
    year: '2025',
    medium: 'Music Video',
    role: 'Producer, Assistant Director',
    description: 'Music video produced for Sophia Condon\'s "INTRO."',
    media: [
      { type: 'youtube', src: 'https://www.youtube.com/embed/oPn91V0FlvI?controls=0&rel=0&fs=0&iv_load_policy=3&disablekb=1&loop=1&playlist=oPn91V0FlvI' }
    ]
  },
  'interweb': {
    title: 'interweb',
    year: '2025',
    medium: 'Creative Code',
    role: '',
    description: '',
    media: [
      { type: 'image', src: 'images/interweb.jpg' }
    ]
  },
  'morphing-body': {
    title: 'the desire of a morphing body',
    year: '2025',
    medium: '3D Animation',
    role: '',
    description: '',
    media: [
      { type: 'youtube', src: 'https://www.youtube.com/embed/oZ40YRlV6ag?controls=0&rel=0&fs=0&iv_load_policy=3&disablekb=1&loop=1&playlist=oZ40YRlV6ag' },
      { type: 'image', src: 'images/the desire of a morphing body.png' }
    ]
  },
  'makewaste': {
    title: 'makewaste',
    year: '2024',
    medium: 'Stop Motion Animation',
    role: 'Art Director, Audio Designer',
    description: '',
    media: [
      { type: 'youtube', src: 'https://www.youtube.com/embed/3GNzh3k8VfY?controls=0&rel=0&fs=0&iv_load_policy=3&disablekb=1&loop=1&playlist=3GNzh3k8VfY' }
    ]
  },
  'hiftba': {
    title: 'How It Feels To Be Alone, And How It Feels To Grow',
    year: '2023',
    medium: 'Creative Code',
    role: '',
    description: '',
    media: [
      { type: 'video', src: 'images/How It Feels To Be Alone, And How It Feels To Grow.mp4' },
      { type: 'image', src: 'images/alone_growth.png' }
    ]
  },
  'you-havent-changed': {
    title: "You Haven't Changed",
    year: '2023',
    medium: 'Short Film',
    role: 'Director, Writer',
    description: '',
    media: [
      { type: 'youtube', src: 'https://www.youtube.com/embed/56ziSG3tbCI?controls=0&rel=0&fs=0&iv_load_policy=3&disablekb=1&loop=1&playlist=56ziSG3tbCI' }
    ]
  },
  'scents-of-home': {
    title: 'Scents of Home',
    year: '2023',
    medium: 'Installation',
    role: 'Designer',
    description: '',
    media: [
      { type: 'image', src: 'images/sense of home.JPG' }
    ]
  }
};

// ---- Project page renderer (project.html) ----

function renderProjectPage() {
  const container = document.getElementById('project-content');
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const project = PROJECTS[id];

  if (!project) {
    container.innerHTML = `
      <div style="text-align:center;padding:6rem 0;color:rgba(255,255,255,0.3);font-size:0.8rem;letter-spacing:0.1em;">
        Project not found.
      </div>`;
    return;
  }

  document.title = `Mason So — ${project.title}`;

  const metaParts = [project.year, project.medium, project.role].filter(Boolean);

  let mediaHTML = '';
  for (const m of project.media) {
    if (m.type === 'youtube') {
      mediaHTML += `
        <div class="project-media-wrap">
          <div class="video-embed">
            <iframe src="${m.src}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
          </div>
        </div>`;
    } else if (m.type === 'video') {
      mediaHTML += `
        <div class="project-media-wrap">
          <video controls playsinline preload="metadata">
            <source src="${m.src}" type="video/mp4" />
          </video>
        </div>`;
    } else if (m.type === 'image') {
      mediaHTML += `
        <div class="project-media-wrap">
          <img src="${m.src}" alt="${project.title}" loading="lazy" />
        </div>`;
    }
  }

  if (!mediaHTML) {
    mediaHTML = `
      <div class="project-media-wrap" style="
        min-height: 28vh;
        background: #080808;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;">
        <p style="color:rgba(255,255,255,0.18);font-size:0.72rem;letter-spacing:0.08em;">No media available</p>
      </div>`;
  }

  container.innerHTML = `
    <div class="project-header">
      <h1 class="project-title-text">${project.title}</h1>
      <div class="project-meta">
        ${metaParts.map((p) => `<span>${p}</span>`).join('<span class="meta-dot">·</span>')}
      </div>
    </div>
    ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
    ${mediaHTML}
  `;
}

// ---- Home page tooltip (home.html) ----

function initTooltip() {
  const tooltip = document.getElementById('projectTooltip');
  if (!tooltip) return;

  const tooltipMedia = document.getElementById('tooltipMediaContainer');
  const tooltipMedium = document.getElementById('tooltipMedium');
  const tooltipRole = document.getElementById('tooltipRole');
  let activeVideo = null;

  document.querySelectorAll('.project-link').forEach(link => {

    link.addEventListener('mouseenter', () => {
      const thumbType = link.dataset.thumbType;
      const thumb = link.dataset.thumb;

      tooltipMedia.innerHTML = '';
      if (activeVideo) { activeVideo.pause(); activeVideo = null; }

      if (thumbType === 'image' && thumb) {
        tooltipMedia.style.display = '';
        const img = document.createElement('img');
        img.src = thumb;
        tooltipMedia.appendChild(img);
      } else if (thumbType === 'video' && thumb) {
        tooltipMedia.style.display = '';
        const video = document.createElement('video');
        video.src = thumb;
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        tooltipMedia.appendChild(video);
        video.play().catch(() => {});
        activeVideo = video;
      } else {
        tooltipMedia.style.display = 'none';
      }

      tooltipMedium.textContent = link.dataset.medium || '';
      tooltipRole.textContent = link.dataset.role || '';
      tooltip.classList.add('visible');
    });

    link.addEventListener('mousemove', (e) => {
      const pad = 18;
      let x = e.clientX + pad;
      let y = e.clientY + pad;
      const rect = tooltip.getBoundingClientRect();
      if (x + rect.width > window.innerWidth - 8) x = e.clientX - rect.width - pad;
      if (y + rect.height > window.innerHeight - 8) y = e.clientY - rect.height - pad;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    });

    link.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
      if (activeVideo) { activeVideo.pause(); activeVideo = null; }
      tooltipMedia.innerHTML = '';
      tooltipMedia.style.display = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjectPage();
  initTooltip();
});
