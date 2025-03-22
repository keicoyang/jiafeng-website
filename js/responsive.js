// 移动端菜单控制 - 更强力版本
document.addEventListener('DOMContentLoaded', function() {
  // 强制创建菜单图标和移动菜单
  const header = document.querySelector('.main-header') || document.querySelector('header');
  
  if(header) {
    // 创建菜单图标如果不存在
    if(!document.querySelector('.mobile-menu-icon')) {
      const menuIcon = document.createElement('div');
      menuIcon.className = 'mobile-menu-icon';
      menuIcon.innerHTML = '☰';
      menuIcon.style.cssText = 'display:block; position:absolute; right:15px; top:15px; z-index:1000; font-size:24px; cursor:pointer;';
      header.appendChild(menuIcon);
    }
    
    // 创建移动菜单如果不存在
    if(!document.querySelector('.mobile-menu')) {
      const mobileMenu = document.createElement('div');
      mobileMenu.className = 'mobile-menu';
      mobileMenu.style.cssText = 'display:none; position:absolute; top:70px; left:0; width:100%; background:#fff; z-index:999; box-shadow:0 2px 5px rgba(0,0,0,0.2);';
      
      // 复制主导航链接
      const navLinks = document.querySelectorAll('.main-header a') || document.querySelectorAll('header a');
      navLinks.forEach(function(link) {
        if(link.textContent && link.href && !link.closest('.logo')) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.style.cssText = 'display:block; padding:15px; text-decoration:none; color:#333; border-bottom:1px solid #eee;';
          mobileMenu.appendChild(newLink);
        }
      });
      
      header.appendChild(mobileMenu);
    }
    
    // 添加菜单切换事件
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if(menuIcon && mobileMenu) {
      menuIcon.addEventListener('click', function() {
        if(mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
          mobileMenu.style.display = 'block';
        } else {
          mobileMenu.style.display = 'none';
        }
      });
    }
  }
  
  // 为表格添加数据标签
  const tables = document.querySelectorAll('table');
  tables.forEach(function(table) {
    const headers = table.querySelectorAll('th');
    const headerTexts = [];
    
    headers.forEach(function(header) {
      headerTexts.push(header.textContent);
    });
    
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(function(row) {
      const cells = row.querySelectorAll('td');
      cells.forEach(function(cell, index) {
        if(headerTexts[index]) {
          cell.setAttribute('data-label', headerTexts[index]);
        }
      });
    });
  });
}); 