const _TABS = document.querySelector('.tabs'), 
			_LIST = [..._TABS.querySelectorAll('button[role=tab]')], // Fungsi untuk scroll halus ke bagian tertentu
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 60, // Mengurangi tinggi navbar
            behavior: 'smooth'
        });
    }
}

// Tambahkan event listener untuk link navigasi
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    const btnKembali = document.querySelectorAll('.btn-kembali');
    btnKembali.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('home');
        });
    });
});
			_PANE = [..._TABS.querySelectorAll('[role=tabpanel]')], 
			N = _LIST.length;

let k = _TABS.style.getPropertyValue('--k');

function switchAttr(e1, e2, attr) {
	[e1[attr], e2[attr]] = [e2[attr], e1[attr]]
}

function switchTabs(i) {
	switchAttr(_LIST[i], _LIST[k], 'ariaSelected');
	switchAttr(_PANE[i], _PANE[k], 'ariaHidden');
	
	/* for some reason, switching like above doesn't work */
	_LIST[i].tabIndex = 0;
	_LIST[k].tabIndex = -1;
	
	_LIST[i].focus();
	_TABS.style.setProperty('--k', k = i)
}

addEventListener('click', e => {
	let _t = e.target, i = _LIST.indexOf(_t);
	
	if(i > -1 && _t.tabIndex) switchTabs(i)
});

addEventListener('keyup', e => {
	let _t = e.target, i = _LIST.indexOf(_t);

	
	if(i !== -1) {
		switch(e.keyCode) {
			case 39: // ->
				switchTabs((k + 1)%N);
				break;
			case 37: // <-
				switchTabs((k + N - 1)%N);
				break;
			case 36: // HOME
				switchTabs(0);
				break;
			case 35: // END
				switchTabs(N - 1);
				break;
		}
	}
});