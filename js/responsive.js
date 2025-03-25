/**
 * 强化版响应式脚本 - 解决常见移动端显示问题
 */
console.log('响应式脚本已加载 v2.1');

document.addEventListener('DOMContentLoaded', function() {
  // ===== 1. 创建移动菜单 =====
  function setupMobileMenu() {
    // 确保只在移动设备上创建移动菜单
    if(window.innerWidth >= 768) return;
    
    // 查找页面头部
    const header = document.querySelector('.header') || 
                  document.querySelector('.main-header') || 
                  document.querySelector('header');
    
    if(!header) return;
    
    // 移除可能存在的旧元素
    const oldMenuIcon = document.querySelector('.mobile-menu-icon');
    if(oldMenuIcon) oldMenuIcon.remove();
    
    const oldMobileMenu = document.querySelector('.mobile-menu');
    if(oldMobileMenu) oldMobileMenu.remove();
    
    // 创建汉堡菜单图标
    const menuIcon = document.createElement('div');
    menuIcon.className = 'mobile-menu-icon';
    menuIcon.innerHTML = '☰';
    menuIcon.style.cssText = `
      display: block;
      position: fixed;
      top: 15px;
      right: 15px;
      width: 40px;
      height: 40px;
      background-color: rgba(0, 51, 102, 0.8);
      color: white;
      z-index: 9999;
      font-size: 24px;
      text-align: center;
      line-height: 40px;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(menuIcon);
    
    // 创建移动菜单
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.style.cssText = `
      display: none;
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      z-index: 9998;
      background-color: #003366;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      max-height: calc(100vh - 70px);
      overflow-y: auto;
    `;
    
    // 尝试多种选择器找到导航链接
    const navSelectors = [
      '.nav ul li a', 
      'nav ul li a', 
      '.nav-menu li a', 
      '.main-header .nav a',
      'header ul li a',
      '#nav a',
      '.navigation a'
    ];
    
    let navLinks = [];
    for(let selector of navSelectors) {
      const links = document.querySelectorAll(selector);
      if(links.length > 0) {
        navLinks = Array.from(links);
        break;
      }
    }
    
    // 如果找不到链接，使用默认菜单
    if(navLinks.length === 0) {
      const defaultLinks = [
        {text: '首页', href: 'index.html'},
        {text: '关于我们', href: 'about.html'},
        {text: '解决方案', href: 'services.html'},
        {text: '成功案例', href: 'projects.html'},
        {text: '新闻动态', href: 'news.html'},
        {text: '联系我们', href: 'contact.html'}
      ];
      
      defaultLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        a.style.cssText = `
          display: block;
          padding: 15px;
          color: white;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          font-size: 16px;
        `;
        a.addEventListener('mouseenter', function() {
          this.style.backgroundColor = '#004d99';
        });
        a.addEventListener('mouseleave', function() {
          this.style.backgroundColor = 'transparent';
        });
        mobileMenu.appendChild(a);
      });
    } else {
      // 使用找到的导航链接
      navLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        a.className = link.className;
        if(link.classList.contains('active')) {
          a.classList.add('active');
        }
        a.style.cssText = `
          display: block;
          padding: 15px;
          color: white;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          font-size: 16px;
        `;
        
        // 判断当前链接是否是活动页面
        if(window.location.href.indexOf(link.href) > -1) {
          a.style.backgroundColor = '#004d99';
        }
        
        a.addEventListener('mouseenter', function() {
          this.style.backgroundColor = '#004d99';
        });
        a.addEventListener('mouseleave', function() {
          if(window.location.href.indexOf(this.href) === -1) {
            this.style.backgroundColor = 'transparent';
          }
        });
        mobileMenu.appendChild(a);
      });
    }
    
    document.body.appendChild(mobileMenu);
    
    // 汉堡菜单点击事件
    menuIcon.addEventListener('click', function() {
      if(mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'block';
        menuIcon.innerHTML = '✕';
      } else {
        mobileMenu.style.display = 'none';
        menuIcon.innerHTML = '☰';
      }
    });
    
    // 点击菜单外区域关闭菜单
    document.addEventListener('click', function(event) {
      if(mobileMenu.style.display === 'block' && 
         !mobileMenu.contains(event.target) && 
         event.target !== menuIcon) {
        mobileMenu.style.display = 'none';
        menuIcon.innerHTML = '☰';
      }
    });
    
    // 窗口大小变化时处理
    window.addEventListener('resize', function() {
      if(window.innerWidth > 767) {
        mobileMenu.style.display = 'none';
        menuIcon.innerHTML = '☰';
      }
    });
  }
  
  // ===== 2. 修复搜索表单 =====
  function fixSearchForms() {
    // 查找所有可能的搜索表单
    const searchSelectors = [
      'form[role="search"]', 
      '.search-form', 
      '.projects-search',
      '.search-box',
      'form input[type="search"]',
      '.search-container form'
    ];
    
    // 收集所有找到的表单
    let searchForms = [];
    for(let selector of searchSelectors) {
      const forms = document.querySelectorAll(selector);
      if(forms.length > 0) {
        forms.forEach(form => searchForms.push(form));
      }
    }
    
    // 处理搜索表单样式
    searchForms.forEach(form => {
      // 基本表单样式
      form.style.width = '100%';
      form.style.maxWidth = '100%';
      form.style.boxSizing = 'border-box';
      form.style.padding = '10px 0';
      form.style.margin = '0';
      form.style.overflow = 'hidden';
      
      // 查找表单中的输入框
      const inputs = form.querySelectorAll('input[type="text"], input[type="search"]');
      inputs.forEach(input => {
        input.style.width = '100%';
        input.style.boxSizing = 'border-box';
        input.style.padding = '10px';
        input.style.fontSize = '16px'; // 防止iOS自动缩放
        input.style.borderRadius = '4px';
        input.style.border = '1px solid #ccc';
        input.style.marginBottom = '10px';
      });
      
      // 查找表单中的按钮
      const buttons = form.querySelectorAll('button, input[type="submit"]');
      buttons.forEach(button => {
        button.style.width = '100%';
        button.style.padding = '10px';
        button.style.fontSize = '16px';
        button.style.backgroundColor = '#003366';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
      });
      
      // 特殊处理projects.html中的搜索表单
      if(form.id === 'projectSearch' || form.closest('.search-section')) {
        // 将一行布局转为单列布局
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        form.style.gap = '10px';
        
        // 处理搜索组
        const searchGroups = form.querySelectorAll('.search-group');
        searchGroups.forEach(group => {
          group.style.width = '100%';
          group.style.marginBottom = '10px';
          
          // 标签样式
          const label = group.querySelector('label');
          if(label) {
            label.style.display = 'block';
            label.style.marginBottom = '5px';
          }
          
          // 下拉菜单样式
          const select = group.querySelector('select');
          if(select) {
            select.style.width = '100%';
            select.style.padding = '10px';
            select.style.fontSize = '16px';
            select.style.borderRadius = '4px';
            select.style.border = '1px solid #ccc';
          }
        });
        
        // 搜索按钮样式
        const searchButton = form.querySelector('.search-button');
        if(searchButton) {
          searchButton.style.width = '100%';
          searchButton.style.marginTop = '5px';
        }
      }
    });
  }
  
  // ===== 3. 处理表格响应式 =====
  function fixTables() {
    // 获取所有表格
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
      // 为表格添加响应式容器
      const wrapper = document.createElement('div');
      wrapper.style.width = '100%';
      wrapper.style.overflowX = 'auto';
      wrapper.style.marginBottom = '20px';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      
      // 设置表格样式
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      
      // 获取表头
      const thead = table.querySelector('thead');
      if(thead) {
        const headerCells = thead.querySelectorAll('th');
        
        // 为移动设备添加数据标签
        const tbody = table.querySelector('tbody');
        if(tbody && headerCells.length > 0) {
          const rows = tbody.querySelectorAll('tr');
          
          rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
              if(index < headerCells.length) {
                const headerText = headerCells[index].textContent.trim();
                cell.setAttribute('data-label', headerText);
              }
            });
          });
        }
      }
    });
  }
  
  // ===== 4. 修复内容溢出 =====
  function fixContentOverflow() {
    // 修复body溢出
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100vw';
    document.body.style.position = 'relative';
    
    // 修复所有容器
    const containers = document.querySelectorAll('.container, div[class*="container"], section, .content');
    containers.forEach(container => {
      container.style.width = '100%';
      container.style.maxWidth = '100%';
      container.style.boxSizing = 'border-box';
      container.style.paddingLeft = '15px';
      container.style.paddingRight = '15px';
      container.style.overflow = 'hidden';
    });
    
    // 修复所有可能导致溢出的元素
    const overflowElements = document.querySelectorAll('img, video, iframe, embed, object, pre, code');
    overflowElements.forEach(element => {
      element.style.maxWidth = '100%';
      element.style.height = 'auto';
    });
    
    // 防止水平滚动
    const horizontallyScrollableElements = document.querySelectorAll('div[style*="overflow-x:auto"], div[style*="overflow-x: auto"]');
    horizontallyScrollableElements.forEach(element => {
      // 对于需要水平滚动的元素，我们保留其功能
      element.style.maxWidth = '100%';
    });
    
    // 修复联系页面的布局
    const contactContent = document.querySelector('.contact-content');
    if(contactContent && window.innerWidth <= 767) {
      contactContent.style.display = 'block';
      
      const contactInfo = document.querySelector('.contact-info');
      if(contactInfo) {
        contactInfo.style.width = '100%';
        contactInfo.style.marginBottom = '20px';
      }
      
      const contactForm = document.querySelector('.contact-form');
      if(contactForm) {
        contactForm.style.width = '100%';
      }
    }
    
    // 特别检查projects.html的搜索部分
    const searchSection = document.querySelector('.search-section');
    if(searchSection && window.innerWidth <= 767) {
      searchSection.style.width = '100%';
      searchSection.style.padding = '10px 0';
      searchSection.style.overflow = 'hidden';
      
      const searchForm = searchSection.querySelector('.search-form');
      if(searchForm) {
        searchForm.style.display = 'flex';
        searchForm.style.flexDirection = 'column';
      }
    }
  }
  
  // ===== 5. 应用所有修复 =====
  function applyResponsiveFixes() {
    if(window.innerWidth < 768) {
      // 只在移动设备上应用这些修复
      setupMobileMenu();
      fixSearchForms();
      fixTables();
    }
    
    // 这些修复对所有设备都适用
    fixContentOverflow();
  }
  
  // 初始化应用
  applyResponsiveFixes();
  
  // 当窗口调整大小时重新应用修复
  window.addEventListener('resize', function() {
    // 移除旧的移动菜单元素
    const oldMenuIcon = document.querySelector('.mobile-menu-icon');
    if(oldMenuIcon) oldMenuIcon.remove();
    
    const oldMobileMenu = document.querySelector('.mobile-menu');
    if(oldMobileMenu) oldMobileMenu.remove();
    
    // 重新应用响应式修复
    applyResponsiveFixes();
  });
}); 