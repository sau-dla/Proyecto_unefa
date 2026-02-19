// Funcionalidades JavaScript para la Hemeroteca UNEFA

document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación suave
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de aparición gradual para las plazas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar efecto a las plazas
    const plazaItems = document.querySelectorAll('.plaza-item');
    plazaItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Funcionalidad de búsqueda simple
    function createSearchBox() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="searchInput" placeholder="Buscar plaza..." style="
                padding: 10px;
                border: 2px solid #2980b9;
                border-radius: 5px;
                width: 300px;
                margin: 20px 0;
                font-size: 16px;
            ">
        `;
        
        const plazasSection = document.querySelector('.plazas-bolivar');
        if (plazasSection) {
            plazasSection.insertBefore(searchContainer, plazasSection.querySelector('.plaza-grid'));
        }
    }

    createSearchBox();

    // Funcionalidad de búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const plazaItems = document.querySelectorAll('.plaza-item');
            
            plazaItems.forEach(item => {
                const title = item.querySelector('h4').textContent.toLowerCase();
                const content = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Contador de plazas
    function updatePlazaCounter() {
        const totalPlazas = document.querySelectorAll('.plaza-item').length;
        const counterElement = document.createElement('p');
        counterElement.innerHTML = `<strong>Total de Plazas Bolívar mostradas: ${totalPlazas}</strong>`;
        counterElement.style.color = '#2980b9';
        counterElement.style.fontSize = '1.1rem';
        counterElement.style.marginTop = '10px';
        
        const plazasSection = document.querySelector('.plazas-bolivar');
        if (plazasSection) {
            plazasSection.insertBefore(counterElement, plazasSection.querySelector('.plaza-grid'));
        }
    }

    updatePlazaCounter();

    // Efecto hover mejorado para la sección intro
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
        introSection.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        });
        
        introSection.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    }

    // Botón para volver arriba
    function createBackToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = ''; 
        button.className = 'back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 10px;
            background-image: url('images/simon.png');
            background-color: transparent;
            background-size: contain; 
            background-repeat: no-repeat;
            background-position: center;
            border: none;
            border-radius: 0;
            width: 320px;
            height: 320px;
            cursor: pointer;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Mostrar/acercar efecto
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        document.body.appendChild(button);

        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    }

    createBackToTopButton();

    // Animación para el código QR
    const qrImage = document.querySelector('.qr-section img');
    if (qrImage) {
        qrImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        qrImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    console.log('Hemeroteca UNEFA - JavaScript cargado correctamente');
});

// Mostrar solo la plaza correspondiente según el hash en la URL
function filterPlazaByHash() {
    // Obtener todas las secciones de plazas
    const plazaSections = document.querySelectorAll('.plaza-detail-section');

    // Verificar si hay un hash en la URL
    if (window.location.hash) {
        const hash = window.location.hash; // Ejemplo: #plaza-bolivar-caracas

        // Recorrer todas las secciones y mostrar/ocultar según el hash
        plazaSections.forEach(section => {
            if (section.id === hash.substring(1)) {
                section.style.display = 'block'; // Mostrar solo la coincidencia
            } else {
                section.style.display = 'none'; // Ocultar otras
            }
        });
    } else {
        // Si no hay hash, mostrar todas las plazas
        plazaSections.forEach(section => {
            section.style.display = 'block';
        });
    }
}

// Llamar a la función al cargar la página
window.addEventListener('load', filterPlazaByHash);

