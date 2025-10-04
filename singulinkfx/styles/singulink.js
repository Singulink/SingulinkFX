// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.

// Theme toggle functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateHighlightTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateHighlightTheme(newTheme);
}

function updateThemeIcon(theme) {
    const button = document.getElementById('theme-toggle');
    if (button) {
        if (theme === 'dark') {
            button.classList.remove('light-mode');
        } else {
            button.classList.add('light-mode');
        }
    }
}

function updateHighlightTheme(theme) {
    const darkTheme = document.getElementById('highlight-theme-dark');
    const lightTheme = document.getElementById('highlight-theme-light');
    
    if (darkTheme && lightTheme) {
        if (theme === 'dark') {
            darkTheme.disabled = false;
            lightTheme.disabled = true;
        } else {
            darkTheme.disabled = true;
            lightTheme.disabled = false;
        }
    }
}

// Initialize theme on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
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
            setTimeout(scrollToc, 500);
        }
    }

    setTimeout(scrollToc, 500);
});