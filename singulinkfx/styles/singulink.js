// Theme toggle functionality.
//
// The initial data-theme attribute and highlight.js stylesheet state are set synchronously by an inline script in <head> (see head.tmpl.partial), which also
// exposes window.SingulinkTheme with resolve()/apply() helpers used here. The toggle button's icon/label are driven purely by CSS from [data-theme].

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    SingulinkTheme.apply(next);
}

// Follow the OS/browser preference until the user explicitly picks a theme.
if (window.matchMedia) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
        if (localStorage.getItem('theme')) return;
        SingulinkTheme.apply(SingulinkTheme.resolve(null));
    };
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else if (mql.addListener) mql.addListener(onChange);
}

function toggleMenu() {
               
    var sidebar = document.getElementById("sidebar");
    var blackout = document.getElementById("blackout");

    if (sidebar.style.left === "0px") 
    {
        sidebar.style.left = "-" + sidebar.getBoundingClientRect().width + "px";
        blackout.classList.remove("showThat");
        blackout.classList.add("hideThat");
    } 
    else 
    {
        sidebar.style.left = "0px";
        blackout.classList.remove("hideThat");
        blackout.classList.add("showThat");
    }
}

// jQuery .deepest(): https://gist.github.com/geraldfullam/3a151078b55599277da4

(function ($) {
    $.fn.deepest = function (selector) {
        var deepestLevel  = 0,
            $deepestChild,
            $deepestChildSet;
     
        this.each(function () {
            $parent = $(this);
            $parent
                .find((selector || '*'))
                .each(function () {
                    if (!this.firstChild || this.firstChild.nodeType !== 1) {
                        var levelsToParent = $(this).parentsUntil($parent).length;
                        if (levelsToParent > deepestLevel) {
                            deepestLevel = levelsToParent;
                            $deepestChild = $(this);
                        } else if (levelsToParent === deepestLevel) {
                            $deepestChild = !$deepestChild ? $(this) : $deepestChild.add(this);
                        }
                    }
                });
            $deepestChildSet = !$deepestChildSet ? $deepestChild : $deepestChildSet.add($deepestChild);
        });
            
        return this.pushStack($deepestChildSet || [], 'deepest', selector || '');
    };
}(jQuery));

$(function() {
    // Setup theme toggle button
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    $('table').each(function(a, tbl) {
        var currentTableRows = $(tbl).find('tbody tr').length;
        $(tbl).find('th').each(function(i) {
            var remove = 0;
            var currentTable = $(this).parents('table');

            var tds = currentTable.find('tr td:nth-child(' + (i + 1) + ')');
            tds.each(function(j) { if ($(this).text().trim() === '') remove++; });

            if (remove == currentTableRows) {
                $(this).hide();
                tds.hide();
            }
        });
    });

    function scrollToc() {
        var activeTocItem = $('.sidebar').deepest('.sidebar-item.active')[0]
    
        if (activeTocItem) {
            activeTocItem.scrollIntoView({ block: "center" });
        }
        else{
            setTimeout(scrollToc, 200);
        }
    }

    setTimeout(scrollToc, 200);
});