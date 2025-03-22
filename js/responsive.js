/**
 * 强化版响应式脚本 - 解决常见移动端显示问题
 */
console.log('响应式脚本已加载 v2.0');

document.addEventListener('DOMContentLoaded', function() {
  // ===== 1. 创建移动菜单 =====
  function setupMobileMenu() {
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
      top: 20px;
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
        mobileMenu.appendChild(a);
      });
    } else {
      // 使用找到的导航链接
      navLinks.forEach(link => {
        if(link.textContent.trim()) {
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = link.textContent;
          a.style.cssText = `
            display: block;
            padding: 15px;
            color: white;
            text-decoration: none;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            text-align: center;
            font-size: 16px;
          `;
          mobileMenu.appendChild(a);
        }
      });
    }
    
    document.body.appendChild(mobileMenu);
    
    // 添加点击事件
    menuIcon.addEventListener('click', function() {
      if(mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'block';
      } else {
        mobileMenu.style.display = 'none';
      }
    });
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(event) {
      if(!event.target.closest('.mobile-menu') && 
         !event.target.closest('.mobile-menu-icon') && 
         mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
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
    
    let searchForms = [];
    for(let selector of searchSelectors) {
      const forms = document.querySelectorAll(selector);
      if(forms.length > 0) {
        forms.forEach(form => searchForms.push(form));
      }
    }
    
    // 应用样式修复
    searchForms.forEach(form => {
      form.style.width = '100%';
      form.style.maxWidth = '100%';
      form.style.boxSizing = 'border-box';
      form.style.padding = '10px 0';
      form.style.margin = '0';
      form.style.overflow = 'hidden';
      
      // 修复输入框
      const inputs = form.querySelectorAll('input[type="text"], input[type="search"]');
      inputs.forEach(input => {
        input.style.width = '100%';
        input.style.maxWidth = '100%';
        input.style.boxSizing = 'border-box';
        input.style.padding = '12px';
        input.style.marginBottom = '10px';
        input.style.fontSize = '16px';
      });
      
      // 修复按钮
      const buttons = form.querySelectorAll('button, input[type="submit"]');
      buttons.forEach(button => {
        button.style.width = '100%';
        button.style.padding = '12px';
        button.style.backgroundColor = '#003366';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';
      });
    });
  }
  
  // ===== 3. 表格响应式处理 =====
  function fixTables() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
      // 设置表格样式
      table.style.width = '100%';
      table.style.maxWidth = '100%';
      table.style.overflowX = 'auto';
      table.style.display = 'block';
      table.style.marginBottom = '20px';
      
      // 获取表头文本
      const headers = table.querySelectorAll('th');
      const headerTexts = [];
      
      headers.forEach(header => {
        headerTexts.push(header.textContent);
      });
      
      // 为单元格添加数据标签
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
          if(headerTexts[index]) {
            cell.setAttribute('data-label', headerTexts[index]);
          }
        });
      });
    });
  }
  
  // ===== 4. 修复内容溢出 =====
  function fixOverflow() {
    // 强制修复body溢出
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100vw';
    
    // 修复所有容器
    const containers = document.querySelectorAll('.container, .content, .section, div[class*="container"]');
    containers.forEach(container => {
      container.style.width = '100%';
      container.style.maxWidth = '100%';
      container.style.boxSizing = 'border-box';
      container.style.paddingLeft = '15px';
      container.style.paddingRight = '15px';
      container.style.overflowX = 'hidden';
    });
    
    // 修复所有图片
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    });
  }
  
  // ===== 5. 执行所有修复 =====
  // 检测屏幕宽度
  function applyMobileFixes() {
    if(window.innerWidth <= 767) {
      fixOverflow();
      setupMobileMenu();
      fixSearchForms();
      fixTables();
    }
  }
  
  // 初始执行
  applyMobileFixes();
  
  // 窗口大小改变时重新执行
  window.addEventListener('resize', applyMobileFixes);
}); 