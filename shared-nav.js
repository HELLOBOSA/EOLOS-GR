(function(){
  var path=window.location.pathname;
  if(!/\/index\.html$/i.test(path))return;
  window.location.replace(path.slice(0,-10)+window.location.search+window.location.hash);
})();

(function(){
  var body=document.body;
  var toggle=document.getElementById("menu-toggle");
  var menu=document.getElementById("mobile-menu");
  if(!toggle||!menu)return;

  var menuLinks=Array.prototype.slice.call(menu.querySelectorAll("a[href]"));
  var allNavLinks=Array.prototype.slice.call(document.querySelectorAll("[data-nav-section]"));

  function menuLabel(open){
    var greek=document.documentElement.lang==="el";
    return open?(greek?"Κλείσιμο μενού":"Close menu"):(greek?"Άνοιγμα μενού":"Open menu");
  }

  function setOpen(open,restoreFocus){
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",menuLabel(open));
    menu.setAttribute("aria-hidden",String(!open));
    menu.inert=!open;
    body.classList.toggle("nav-open",open);
    if(!open&&restoreFocus)toggle.focus();
  }

  function currentSection(){
    var path=window.location.pathname;
    if(path.indexOf("/ypiresies/")===0)return "services";
    if(path.indexOf("/journal/")===0)return "journal";
    if(path.indexOf("/studio/")===0)return "studio";
    return "";
  }

  var active=currentSection();
  allNavLinks.forEach(function(link){
    if(active&&link.getAttribute("data-nav-section")===active)link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  });

  menu.inert=true;
  toggle.addEventListener("click",function(){setOpen(toggle.getAttribute("aria-expanded")!=="true",false);});
  menuLinks.forEach(function(link){link.addEventListener("click",function(){setOpen(false,false);});});
  document.addEventListener("keydown",function(event){if(event.key==="Escape"&&toggle.getAttribute("aria-expanded")==="true")setOpen(false,true);});

  var desktop=window.matchMedia("(min-width:981px)");
  function closeOnDesktop(event){if(event.matches)setOpen(false,false);}
  if(desktop.addEventListener)desktop.addEventListener("change",closeOnDesktop);
  else desktop.addListener(closeOnDesktop);
})();
