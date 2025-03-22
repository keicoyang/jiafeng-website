// 移动端菜单控制
document.addEventListener('DOMContentLoaded', function() {
  // 创建移动菜单图标
  const header = document.querySelector('.main-header');
  if(header && !document.querySelector('.mobile-menu-icon')) {
    const menuIcon = document.createElement('div');
    menuIcon.className = 'mobile-menu-icon';
    menuIcon.innerHTML = '☰';
    header.appendChild(menuIcon);
    
    // 创建移动菜单
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // 复制主导航链接到移动菜单
    const navLinks = document.querySelectorAll('.main-header .nav ul li a');
    navLinks.forEach(function(link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      mobileMenu.appendChild(newLink);
    });
    
    header.appendChild(mobileMenu);
    
    // 添加菜单切换事件
    menuIcon.addEventListener('click', function() {
      mobileMenu.classList.toggle('show');
    });
  }
  
  // 关闭菜单当点击其他区域
  document.addEventListener('click', function(event) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.mobile-menu-icon');
    
    if(mobileMenu && menuIcon && 
       !event.target.closest('.mobile-menu') && 
       !event.target.closest('.mobile-menu-icon')) {
      if(mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
      }
    }
  });
  
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