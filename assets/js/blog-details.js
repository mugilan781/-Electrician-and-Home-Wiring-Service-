/**
 * ElectraPro — Dynamic Blog Details Handler
 * Loads and renders the clicked blog article based on the URL query parameter ?id=...
 */

(function () {
  'use strict';

  function getPostId() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id') || 'panel-upgrade';
  }

  function renderPost() {
    if (!window.BLOG_POSTS) return;

    var postId = getPostId();
    var post = window.BLOG_POSTS[postId] || window.BLOG_POSTS['panel-upgrade'];
    if (!post) return;

    // 1. Update Document Title and Meta
    document.title = post.title + ' — ElectraPro Blog';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt);

    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', post.title + ' — ElectraPro');

    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', post.excerpt);

    // 2. Hero Section
    var heroDesc = document.getElementById('hero-desc');
    if (heroDesc) {
      heroDesc.textContent = post.title + ' — Expert insights from our master electricians';
    }

    // 3. Badges
    var badgeCat = document.getElementById('badge-cat');
    var badgeSub = document.getElementById('badge-sub');
    if (badgeCat) badgeCat.textContent = post.category;
    if (badgeSub) badgeSub.textContent = post.subCategory || 'Technical Guide';

    // 4. Title
    var articleTitle = document.getElementById('article-title');
    if (articleTitle) articleTitle.textContent = post.title;

    // 5. Meta Details
    var metaAuthor = document.getElementById('meta-author-text');
    var metaDate = document.getElementById('meta-date-text');
    var metaRead = document.getElementById('meta-read-text');
    var metaViews = document.getElementById('meta-views-text');

    if (metaAuthor) metaAuthor.textContent = post.author.name + ' — ' + post.author.role.split(',')[0];
    if (metaDate) metaDate.textContent = post.date;
    if (metaRead) metaRead.textContent = post.readTime;
    if (metaViews) metaViews.textContent = post.views;

    // 6. Hero Image
    var heroImg = document.getElementById('article-hero-img');
    if (heroImg) {
      heroImg.src = post.image;
      heroImg.alt = post.imageAlt || post.title;
    }

    // 7. Article Body
    var articleBody = document.getElementById('article-body');
    if (articleBody) {
      articleBody.innerHTML = post.content;
    }

    // 8. Tags
    var tagsContainer = document.getElementById('article-tags-list');
    if (tagsContainer && Array.isArray(post.tags)) {
      tagsContainer.innerHTML = post.tags.map(function (tag) {
        return '<span class="tag">' + tag + '</span>';
      }).join('');
    }

    // 9. Share Links
    var copyBtn = document.querySelector('.share-copy');
    if (copyBtn) {
      copyBtn.setAttribute('data-copy', window.location.href);
    }
    var twBtn = document.querySelector('.share-tw');
    if (twBtn) {
      twBtn.onclick = function () {
        var url = encodeURIComponent(window.location.href);
        var text = encodeURIComponent(post.title);
        window.open('https://x.com/intent/post?text=' + text + '&url=' + url, '_blank', 'noopener,noreferrer,width=600,height=450');
      };
    }
    var fbBtn = document.querySelector('.share-fb');
    if (fbBtn) {
      fbBtn.onclick = function () {
        var url = encodeURIComponent(window.location.href);
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank', 'noopener,noreferrer,width=600,height=450');
      };
    }
    var liBtn = document.querySelector('.share-li');
    if (liBtn) {
      liBtn.onclick = function () {
        var url = encodeURIComponent(window.location.href);
        window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + url, '_blank', 'noopener,noreferrer,width=600,height=450');
      };
    }

    // 10. Author Card — now uses Unsplash image with correct gender
    var authorAvatar = document.getElementById('author-avatar');
    var authorName = document.getElementById('author-name');
    var authorRole = document.getElementById('author-role');
    var authorBio = document.getElementById('author-bio');

    if (authorAvatar) {
      var avatarUrl = post.author.avatarImg || '';
      var avatarAlt = post.author.name || 'Author';
      // Support both <img> and legacy <div> avatar elements
      if (authorAvatar.tagName.toLowerCase() === 'img') {
        if (avatarUrl) {
          authorAvatar.src = avatarUrl;
          authorAvatar.alt = avatarAlt;
        } else if (post.author.initials) {
          // Fallback: if no image, show initials inside a generated div (edge case)
          authorAvatar.alt = avatarAlt + ' — ' + post.author.initials;
        }
        // Ensure proper styling for image avatar
        authorAvatar.style.display = 'block';
      } else {
        authorAvatar.textContent = post.author.initials || 'EP';
        // If div but avatarImg exists, replace div content with image
        if (avatarUrl) {
          authorAvatar.innerHTML = '';
          authorAvatar.style.background = 'none';
          authorAvatar.style.padding = '0';
          var img = document.createElement('img');
          img.src = avatarUrl;
          img.alt = avatarAlt;
          img.loading = 'lazy';
          img.width = 72;
          img.height = 72;
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';
          img.style.borderRadius = '50%';
          img.style.display = 'block';
          authorAvatar.appendChild(img);
          authorAvatar.style.overflow = 'hidden';
        }
      }
    }
    if (authorName) authorName.textContent = post.author.name;
    if (authorRole) authorRole.textContent = post.author.role;
    if (authorBio) authorBio.textContent = post.author.bio;

    // 11. Table of Contents
    var tocList = document.getElementById('toc-list');
    if (tocList && Array.isArray(post.toc)) {
      tocList.innerHTML = post.toc.map(function (item) {
        return '<a href="#' + item.id + '" class="toc-link">' + item.text + '</a>';
      }).join('');
    }

    // 12. Related Articles Grid
    var relatedGrid = document.getElementById('related-posts-grid');
    if (relatedGrid && Array.isArray(post.relatedIds)) {
      relatedGrid.innerHTML = post.relatedIds.map(function (relId) {
        var relPost = window.BLOG_POSTS[relId];
        if (!relPost) return '';
        return (
          '<article class="blog-card">' +
            '<div class="blog-card__img-wrap">' +
              '<a href="blog-details.html?id=' + relPost.id + '" aria-label="Read ' + relPost.title + '">' +
                '<img src="' + relPost.image + '" alt="' + relPost.title + '" class="blog-card__img" loading="lazy">' +
              '</a>' +
            '</div>' +
            '<div class="blog-card__body">' +
              '<div class="blog-card__meta"><span class="blog-card__cat">' + relPost.category + '</span></div>' +
              '<h3 class="blog-card__title" style="font-size:1rem;">' +
                '<a href="blog-details.html?id=' + relPost.id + '">' + relPost.title + '</a>' +
              '</h3>' +
            '</div>' +
          '</article>'
        );
      }).join('');
    }

    // 13. Sidebar Recent Posts
    var sidebarRecent = document.getElementById('sidebar-recent-posts');
    if (sidebarRecent) {
      var allPostIds = Object.keys(window.BLOG_POSTS);
      var recentIds = allPostIds.filter(function (id) { return id !== post.id; }).slice(0, 3);
      sidebarRecent.innerHTML = recentIds.map(function (recId) {
        var recPost = window.BLOG_POSTS[recId];
        if (!recPost) return '';
        return (
          '<div class="recent-post-item">' +
            '<img src="' + recPost.image + '" alt="" class="recent-post-thumb" loading="lazy">' +
            '<div>' +
              '<div class="recent-post-title"><a href="blog-details.html?id=' + recPost.id + '">' + recPost.title + '</a></div>' +
              '<div class="recent-post-date">' + recPost.date + '</div>' +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    // 14. Ensure reveal elements are visible
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPost);
  } else {
    renderPost();
  }

  // Handle browser back/forward history navigation smoothly
  window.addEventListener('popstate', function () {
    renderPost();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
